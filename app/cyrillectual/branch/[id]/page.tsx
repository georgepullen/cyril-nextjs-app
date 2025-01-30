"use client"
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { Branch, Memory, getBranchById, getMemoriesForBranch } from '../../../utils/supabaseUtils';
import MemoryList from '../../components/MemoryList';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function ViewBranchPage({ params }: { params: { id: string } }) {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const { session, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const user = session?.user;
  const loadedRef = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user || loadedRef.current) return;
      
      setIsLoading(true);
      try {
        const [branchData, memoriesData] = await Promise.all([
          getBranchById(params.id),
          getMemoriesForBranch(params.id)
        ]);
        setBranch(branchData);
        setMemories(memoriesData);
        loadedRef.current = true;
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params.id, user]);

  useEffect(() => {
    if (!isAuthLoading && !session) {
      router.push('/auth');
    }
  }, [session, router, isAuthLoading]);

  const handleMemoryAdded = useCallback((newMemory: Memory) => {
    setMemories(prev => [newMemory, ...prev]);
  }, []);

  const handleMemoryDeleted = useCallback((deletedMemoryId: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== deletedMemoryId));
    if (editingMemoryId === deletedMemoryId) {
      setEditingMemoryId(null);
      setEditContent('');
    }
  }, [editingMemoryId]);

  const handleStartEditing = useCallback((memory: Memory) => {
    setEditingMemoryId(memory.id);
    setEditContent(memory.content);
  }, []);

  const handleCancelEditing = useCallback(() => {
    setEditingMemoryId(null);
    setEditContent('');
  }, []);

  const handleEditChange = useCallback((content: string) => {
    setEditContent(content);
  }, []);

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-[#0D0D15] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#b35cff] mx-auto mb-4" />
          <p className="text-gray-400">Loading session...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null; // Let the useEffect redirect handle this
  }

  return (
    <main className="h-screen flex flex-col bg-[#0D0D15] text-white overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(45deg,transparent_0%,rgba(179,92,255,0.05)_50%,rgba(255,173,74,0.05)_100%)] animate-[gradientShift_10s_ease-in-out_infinite] z-0" />

      {/* Condensed Header Section */}
      <div className="flex-shrink-0 z-50 bg-[#0D0D15]/80 backdrop-blur-md border-b border-[#b35cff]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <button
            onClick={() => router.push('/cyrillectual')}
            className="group flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 text-[#b35cff]" />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Back</span>
          </button>

          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
              {branch?.title || 'Loading...'}
            </h1>
            <span className="text-sm text-gray-400">
              {memories.length} {memories.length === 1 ? 'memory' : 'memories'}
            </span>
          </div>

          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-sm font-medium hidden sm:inline">cyril.guru</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#b35cff] mb-4" />
            <p className="text-gray-400">Loading branch...</p>
          </motion.div>
        ) : branch ? (
          <div className="h-full relative">
            <MemoryList 
              memories={memories} 
              branchId={params.id}
              onMemoryAdded={handleMemoryAdded}
              onMemoryDeleted={handleMemoryDeleted}
              editingMemoryId={editingMemoryId}
              editContent={editContent}
              onStartEditing={handleStartEditing}
              onCancelEditing={handleCancelEditing}
              onEditChange={handleEditChange}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400">Branch not found</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #b35cff #0D0D15;
        }

        /* Chrome, Edge, and Safari */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
          background: #0D0D15;
        }

        ::-webkit-scrollbar-track {
          background: #0D0D15;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #b35cff, #ffad4a);
          border: 2px solid #0D0D15;
          border-radius: 100vh;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #c77fff, #ffbe6b);
        }

        ::-webkit-scrollbar-corner {
          background: #0D0D15;
        }

        ::selection {
          background: rgba(179,92,255,0.3);
          color: #ffffff;
        }
      `}</style>
    </main>
  );
} 