import { FeedbackSettings } from '../journal/components/FeedbackConfig';

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

export const generateQuestionsFromMemories = async (memoriesText: string): Promise<string> => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in writing questions that challenge the user to recall their notes. You specifically target areas that the user is likely to forget.'
        },
        {
          role: 'user',
          content: `Based on the user's notes, generate 5 questions to test their understanding. Format the response in markdown as a numbered list from 1-5.\n\nUser's notes:\n${memoriesText}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
      stream: false
    })
  };

  try {
    console.log('Sending request to Perplexity API with options:', JSON.stringify(options, null, 2));
    const response = await fetch('https://api.perplexity.ai/chat/completions', options);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to generate questions: ${response.status} ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();
    console.log('API Response data:', JSON.stringify(data, null, 2));
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

export const generateFeedbackForAnswers = async (
  questions: string,
  answers: string[],
  settings: FeedbackSettings
): Promise<string> => {
  // Validate settings
  if (!settings || !settings.examBoard || !settings.gradeLevel) {
    throw new Error('Invalid feedback settings provided');
  }

  // Create a context string from the settings
  const contextStr = `Context:
- Exam Board: ${settings.examBoard}
- Grade Level: ${settings.gradeLevel}
- Subject Area: ${settings.subjectArea || 'Not specified'}
${settings.additionalNotes ? `- Additional Notes: ${settings.additionalNotes}` : ''}`;

  console.log('Generating feedback with context:', contextStr); // Add logging

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
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

Please provide:
1. Specific feedback for each answer
2. Suggestions for improvement
3. An overall score out of 100
4. A summary of key strengths and areas for development
5. Next steps for improvement

Format the response in markdown with clear headings and bullet points.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
      stream: false
    })
  };

  try {
    console.log('Sending feedback request to Perplexity API with options:', JSON.stringify(options, null, 2));
    const response = await fetch('https://api.perplexity.ai/chat/completions', options);
    console.log('Feedback response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response for feedback:', errorText);
      throw new Error(`Failed to generate feedback: ${response.status} ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();
    console.log('API Response data for feedback:', JSON.stringify(data, null, 2));
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format for feedback:', data);
      throw new Error('Invalid API response format for feedback');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
}; 