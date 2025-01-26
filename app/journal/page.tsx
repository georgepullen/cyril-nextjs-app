"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Branch, getBranches, createBranch, deleteBranch } from '../utils/supabaseUtils';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { format, isToday, isYesterday, isSameWeek, isSameMonth, isSameYear } from 'date-fns';
import { useRouter } from 'next/navigation';

interface GroupedBranches {
  [key: string]: {
    title: string;
    branches: Branch[];
  };
}

export default function Journal() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const { session } = useAuth();
  const router = useRouter();
  const user = session?.user;
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [newBranchTitle, setNewBranchTitle] = useState('');
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<{ [key: string]: boolean }>({});
  const MAX_BRANCH_TITLE_LENGTH = 25;

  const loadBranches = useCallback(async () => {
    const fetchedBranches = await getBranches(user!.id);
    setBranches(fetchedBranches);
  }, [user]);

  useEffect(() => {
    if (user) {
      loadBranches();
    }
  }, [user, loadBranches]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!session) {
        router.push('/auth');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [session, router]);

  const handleBranchAdded = (newBranch: Branch) => {
    setBranches([newBranch, ...branches]);
  };

  const handleBranchDeleted = (branchId: string) => {
    setBranches(branches.filter(branch => branch.id !== branchId));
  };

  const handleCreateBranch = async () => {
    if (!newBranchTitle.trim() || !user) return;
    if (newBranchTitle.length > MAX_BRANCH_TITLE_LENGTH) return;
    
    const newBranch = await createBranch(newBranchTitle.trim(), user.id);
    if (newBranch) {
      handleBranchAdded(newBranch);
      setNewBranchTitle('');
      setIsAddingBranch(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, branchId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBranchToDelete(branchId);
  };

  const handleConfirmDelete = async () => {
    if (branchToDelete) {
      const success = await deleteBranch(branchToDelete);
      if (success) {
        handleBranchDeleted(branchToDelete);
      }
      setBranchToDelete(null);
    }
  };

  const groupBranches = (branches: Branch[]): GroupedBranches => {
    return branches.reduce((groups: GroupedBranches, branch) => {
      const date = new Date(branch.created_at);
      let key: string;
      let title: string;

      if (isToday(date)) {
        key = 'today';
        title = 'Today';
      } else if (isYesterday(date)) {
        key = 'yesterday';
        title = 'Yesterday';
      } else if (isSameWeek(date, new Date(), { weekStartsOn: 1 })) {
        key = 'this-week';
        title = 'This Week';
      } else if (isSameMonth(date, new Date())) {
        key = 'this-month';
        title = 'This Month';
      } else if (isSameYear(date, new Date())) {
        key = format(date, 'MMMM');
        title = format(date, 'MMMM');
      } else {
        key = format(date, 'yyyy');
        title = format(date, 'yyyy');
      }

      if (!groups[key]) {
        groups[key] = { title, branches: [] };
      }
      groups[key].branches.push(branch);
      return groups;
    }, {});
  };

  const toggleGroup = (key: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderBranchGroups = () => {
    const groups = groupBranches(branches);
    const orderedKeys = [
      'today',
      'yesterday',
      'this-week',
      'this-month',
      ...Object.keys(groups).filter(key => 
        !['today', 'yesterday', 'this-week', 'this-month'].includes(key)
      )
    ].filter(key => groups[key]);

    return (
      <div className="space-y-6">
        {orderedKeys.map((key) => (
          <div key={key} className="bg-[#1E1E2E]/50 rounded-lg border border-purple-500/20">
            <button
              onClick={() => toggleGroup(key)}
              className="flex items-center justify-between w-full p-3 text-left 
                        hover:bg-purple-500/10 transition-colors duration-200 rounded-t-lg"
            >
              <div className="flex items-center space-x-2">
                <svg 
                  className={`w-4 h-4 text-purple-300/70 transition-transform duration-200
                            ${collapsedGroups[key] ? '-rotate-90' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
                <h2 className="text-sm font-medium text-purple-300/70 uppercase tracking-wider
                             group-hover:text-purple-300 transition-colors duration-200">
                  {groups[key].title}
                </h2>
              </div>
              <span className="text-xs text-purple-300/50">
                {groups[key].branches.length} {groups[key].branches.length === 1 ? 'branch' : 'branches'}
              </span>
            </button>
            
            <motion.div
              initial={false}
              animate={{
                height: collapsedGroups[key] ? 0 : 'auto',
                opacity: collapsedGroups[key] ? 0 : 1
              }}
              transition={{
                height: { duration: 0.2 },
                opacity: { duration: 0.2 }
              }}
              className="overflow-hidden"
            >
              <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 
                            scrollbar-track-transparent hover:scrollbar-thumb-purple-500/30">
                <div className="space-y-1 p-3">
                  {groups[key].branches.map((branch, index) => (
                    <motion.div
                      key={branch.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      <Link
                        href={`/journal/branch/${branch.id}`}
                        className="block"
                      >
                        <div className="relative pl-6 py-2 pr-4 rounded-lg 
                                      hover:bg-purple-500/10 transition-all duration-200">
                          {/* Branch Line */}
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-purple-500/20 
                                        group-hover:bg-purple-500/40 transition-colors duration-200" />
                          
                          {/* Branch Node */}
                          <div className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] 
                                        rounded-full bg-purple-500/40 group-hover:bg-purple-500 
                                        transition-colors duration-200" />

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-200 group-hover:text-white 
                                           transition-colors duration-200">
                                {branch.title}
                              </h3>
                              <p className="text-xs text-gray-400 mt-0.5">
                                Created {formatDistanceToNow(new Date(branch.created_at), { addSuffix: true })}
                              </p>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 
                                          transition-opacity duration-200">
                              <button
                                onClick={(e) => handleDeleteClick(e, branch.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 
                                          rounded transition-colors duration-200"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    );
  };

  const getCharacterCountColor = (length: number) => {
    const remaining = MAX_BRANCH_TITLE_LENGTH - length;
    if (remaining <= 10) return 'text-red-400';
    if (remaining <= 20) return 'text-yellow-400';
    return 'text-gray-400';
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
    <main className="min-h-screen bg-[#0D0D15] text-white font-mono">
      {/* Minimal Top Bar */}
      <div className="h-12 bg-[#1E1E2E]/80 backdrop-blur-sm border-b border-purple-500/20 
                    fixed top-0 left-0 right-0 z-50 flex items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-5 h-5">
            <Image
              src="/logo.svg"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-sm font-medium">cyril.guru</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Tree Structure */}
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-medium text-purple-300">Your Journal</h1>
            <button
              onClick={() => setIsAddingBranch(true)}
              className="px-3 py-1.5 text-sm bg-purple-500/20 hover:bg-purple-500/30 
                        rounded-md transition-colors duration-200"
            >
              New Branch +
            </button>
          </div>

          {/* Branch List */}
          {branches.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">Your memory tree is empty. Create a new branch to get started.</p>
            </motion.div>
          ) : (
            renderBranchGroups()
          )}
        </div>
      </div>

      {/* New Branch Modal */}
      {isAddingBranch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1E1E2E] w-full max-w-md p-6 rounded-lg border border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Create New Branch</h3>
              <span className={`text-xs ${getCharacterCountColor(newBranchTitle.length)} 
                            transition-colors duration-200`}>
                {newBranchTitle.length}/{MAX_BRANCH_TITLE_LENGTH}
              </span>
            </div>
            <input
              type="text"
              value={newBranchTitle}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= MAX_BRANCH_TITLE_LENGTH) {
                  setNewBranchTitle(value);
                }
              }}
              placeholder="Enter branch title..."
              className="w-full p-3 rounded-lg bg-[#2A2A3F] border border-purple-500/20 
                        text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 
                        transition-colors duration-300 mb-6"
              maxLength={MAX_BRANCH_TITLE_LENGTH}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCreateBranch();
                }
              }}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsAddingBranch(false);
                  setNewBranchTitle('');
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 
                         hover:bg-gray-500/10 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBranch}
                disabled={!newBranchTitle.trim() || newBranchTitle.length > MAX_BRANCH_TITLE_LENGTH}
                className={`px-4 py-2 text-sm rounded-md transition-colors duration-200
                          ${!newBranchTitle.trim() || newBranchTitle.length > MAX_BRANCH_TITLE_LENGTH
                            ? 'bg-purple-500/20 text-purple-300/50 cursor-not-allowed' 
                            : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'}`}
              >
                Create Branch
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {branchToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1E1E2E] w-full max-w-md p-6 rounded-lg border border-purple-500/20"
          >
            <h3 className="text-lg font-medium mb-4">Delete Branch?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this branch? This will also delete all memories associated with it. 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setBranchToDelete(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 
                         hover:bg-gray-500/10 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm text-red-400 hover:text-red-300 
                         hover:bg-red-400/10 rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
} 