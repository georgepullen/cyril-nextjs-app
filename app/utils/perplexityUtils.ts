import { FeedbackSettings } from '../cyrillectual/components/FeedbackConfig';
import { QuestionConfig } from '../cyrillectual/components/QuestionConfig';

interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface ApiRequestConfig {
  model: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
  stream: boolean;
}

const DEFAULT_API_CONFIG: ApiRequestConfig = {
  model: 'sonar',
  temperature: 0.7,
  max_tokens: 4096,
  top_p: 0.9,
  stream: false
};

const createContextString = (settings: FeedbackSettings): string => {
  return `Context:
- Exam Board: ${settings.examBoard}
- Grade Level: ${settings.gradeLevel}
- Subject Area: ${settings.subjectArea || 'Not specified'}
${settings.additionalNotes ? `- Additional Notes: ${settings.additionalNotes}` : ''}`;
};

const QUESTION_TYPE_PROMPTS = {
  'single-long': (contextStr: string, questionCount: number, marks: number[]) => `
Based on the following context and memory content, generate 1 in-depth essay-style question worth ${marks[0]} marks that deeply explores the concepts, ideas, or events described in the memory. Remember, your output needs to mirror the style of an exam question. Follow the format below strictly, and do not deviate from it. Do not answer in a chatbot style, solely output the question and requirements.
${contextStr}

Format:
1. Follow the exam board style and requirements
2. Be appropriate for the specified level
3. Outline the mark scheme bands in a markdown table
4. Provide guidance for the candidate
5. Do not write out the answer under the question

Format the response in markdown.`,

  'medium': (contextStr: string, questionCount: number, marks: number[]) => `
Based on the following context and memory content, generate ${questionCount} medium-length questions that explore different aspects of the memory. Remember, your output needs to mirror the style of an exam question. Follow the format below strictly, and do not deviate from it. Do not answer in a chatbot style, solely output the question and requirements.
${contextStr}

The questions should:
1. Follow the exam board style and requirements
2. Be appropriate for the specified level
3. Be worth ${marks.join(', ')} marks respectively
4. Each question should focus on a different aspect or concept from the memory
5. Do not write out the answers under the questions

Format the response in markdown with each question clearly numbered and showing its mark allocation.`,

  'short': (contextStr: string, questionCount: number, marks: number[]) => `
Based on the following context and memory content, generate ${questionCount} short-answer questions that test understanding of specific details, concepts, or facts from the memory. Remember, your output needs to mirror the style of an exam question. Follow the format below strictly, and do not deviate from it. Do not answer in a chatbot style, solely output the question and requirements.
${contextStr}

The questions should:
1. Follow the exam board style and requirements
2. Be appropriate for the specified level
3. Be worth ${marks.join(', ')} marks respectively
4. Focus on key facts, definitions, and concepts from the memory
5. Cover different aspects of the memory content
6. Do not write out the answers under the questions

Format the response in markdown with each question clearly numbered and showing its mark allocation.`
};

const makePerplexityRequest = async (messages: any[], apiConfig: Partial<ApiRequestConfig> = {}): Promise<string> => {
  const config = { ...DEFAULT_API_CONFIG, ...apiConfig };
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...config,
      messages
    })
  };

  try {
    console.log('Sending request to Perplexity API with options:', JSON.stringify(options, null, 2));
    const response = await fetch('https://api.perplexity.ai/chat/completions', options);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to generate content: ${response.status} ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();
    console.log('API Response data:', JSON.stringify(data, null, 2));
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in Perplexity request:', error);
    throw error;
  }
};

export const generateQuestionsFromMemories = async (
  memoryContent: string,
  questionConfig: QuestionConfig,
  feedbackSettings: FeedbackSettings
): Promise<string> => {
  const contextStr = createContextString(feedbackSettings);
  const getPrompt = QUESTION_TYPE_PROMPTS[questionConfig.type];
  
  if (!getPrompt) {
    throw new Error(`Unsupported question type: ${questionConfig.type}`);
  }

  const promptContent = questionConfig.type === 'single-long'
    ? getPrompt(contextStr, questionConfig.questionCount, questionConfig.marks.perQuestion)
    : getPrompt(
        contextStr,
        questionConfig.questionCount,
        questionConfig.marks.perQuestion
      );

  const messages = [
    {
      role: 'system',
      content: `You are an expert examiner for ${feedbackSettings.examBoard}, specializing in creating exam questions that effectively test student knowledge and understanding. You are particularly skilled at crafting questions that align with exam board requirements and grade level expectations. Your task is to create questions that deeply explore and test understanding of the provided memory content.`
    },
    {
      role: 'user',
      content: `${promptContent}\n\nMemory Content:\n${memoryContent}`
    }
  ];

  return makePerplexityRequest(messages);
};

export const generateFeedbackForAnswers = async (
  questions: string,
  answers: string[],
  settings: FeedbackSettings
): Promise<string> => {
  if (!settings || !settings.examBoard || !settings.gradeLevel) {
    throw new Error('Invalid feedback settings provided');
  }

  const contextStr = createContextString(settings);
  const messages = [
    {
      role: 'system',
      content: `You are an expert examiner and educator specializing in providing detailed feedback. 
You should tailor your feedback according to the specified exam board, grade level, and subject area.
Focus on both strengths and areas for improvement, providing specific suggestions for enhancement.
Format your response in markdown, with clear sections for each answer's feedback.`
    },
    {
      role: 'user',
      content: `Please provide detailed feedback on these answers, considering the following context:

${contextStr}

Original Questions:
${questions}

Student's Answers:
${answers.map((answer, index) => `${index + 1}. ${answer}`).join('\n\n')}

Candidate Feedback Paragraph Format:
* Provide a concise 'Candidate Feedback' paragraph
* Specifically quote areas of the response that are strong or weak
* At the end summarise key strengths and areas for development

Format the response in markdown, make sure to only write one paragraph.`
    }
  ];

  return makePerplexityRequest(messages);
}; 