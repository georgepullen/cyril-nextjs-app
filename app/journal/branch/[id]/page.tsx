"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { Branch, Memory, getBranchById, getMemoriesForBranch } from '../../../utils/supabaseUtils';
import MemoryList from '../../components/MemoryList';
import { useRouter } from 'next/navigation';

export default function BranchPage({ params }: { params: { id: string } }) {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const { session } = useAuth();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const [branchData, memoriesData] = await Promise.all([
          getBranchById(params.id),
          getMemoriesForBranch(params.id)
        ]);
        setBranch(branchData);
        setMemories(memoriesData);
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
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading session...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-[#0D0D15] text-white font-mono">
      {/* Top Navigation Bar */}
      <div className="h-12 bg-[#1E1E2E] border-b border-purple-500/20 
                    flex items-center px-4 justify-between">
        <div className="flex items-center space-x-4 overflow-hidden">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="relative w-6 h-6">
              <Image
                src="/logo.svg"
                alt="Cyrillectual Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm font-medium text-white hidden sm:inline">
              cyril.guru
            </span>
          </Link>
          <div className="h-4 w-px bg-purple-500/20 hidden sm:block" />
          <div className="flex items-baseline space-x-2 overflow-hidden">
            <h1 className="text-sm font-medium text-white truncate">
              {branch?.title || 'Loading...'}
            </h1>
          </div>
        </div>
        <div className="flex items-center ml-2">
          <button
            onClick={() => window.history.back()}
            className="px-3 py-1.5 text-sm text-purple-400 hover:bg-purple-500/10 
                      rounded-md transition-colors duration-200 whitespace-nowrap"
          >
            Back
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {branch ? (
          <MemoryList 
            memories={memories} 
            branchId={params.id}
            onMemoryAdded={handleMemoryAdded}
            onMemoryUpdated={handleMemoryUpdated}
            onMemoryDeleted={handleMemoryDeleted}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400">Loading branch...</p>
          </div>
        )}
      </div>
    </main>
  );
} 