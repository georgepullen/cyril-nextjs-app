"use client"
import React, { useEffect, useState } from 'react';
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
  const { session } = useAuth();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const [branchData, memoriesData] = await Promise.all([
            getBranchById(params.id),
            getMemoriesForBranch(params.id)
          ]);
          setBranch(branchData);
          setMemories(memoriesData);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadData();
  }, [params.id, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!session) {
        router.push('/auth');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [session, router]);

  const handleMemoryAdded = (newMemory: Memory) => {
    setMemories([newMemory, ...memories]);
  };

  const handleMemoryUpdated = (updatedMemory: Memory) => {
    setMemories(memories.map(memory => 
      memory.id === updatedMemory.id ? updatedMemory : memory
    ));
  };

  const handleMemoryDeleted = (deletedMemoryId: string) => {
    setMemories(memories.filter(memory => memory.id !== deletedMemoryId));
  };

  if (!session) {
    return (
      <main className="min-h-screen bg-[#0D0D15] text-white font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#b35cff] mx-auto mb-4" />
          <p className="text-gray-400">Loading session...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-[#0D0D15] text-white font-mono overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(45deg,transparent_0%,rgba(179,92,255,0.05)_50%,rgba(255,173,74,0.05)_100%)] animate-[gradientShift_10s_ease-in-out_infinite] z-0" />

      {/* Condensed Header Section */}
      <div className="flex-shrink-0 z-50 bg-[#0D0D15]/80 backdrop-blur-md border-b border-[#b35cff]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <button
            onClick={() => router.push('/journal')}
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
              onMemoryUpdated={handleMemoryUpdated}
              onMemoryDeleted={handleMemoryDeleted}
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

        ::-webkit-scrollbar {
          width: 8px;
          background: #0D0D15;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #b35cff, #ffad4a);
          border-radius: 4px;
        }

        ::selection {
          background: #b35cff;
          color: #0D0D15;
        }
      `}</style>
    </main>
  );
} 