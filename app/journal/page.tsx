"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Branch, getBranches, createBranch, deleteBranch } from '../utils/supabaseUtils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { format, isToday, isYesterday, isSameWeek, isSameMonth, isSameYear } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import { BookText, Plus } from 'lucide-react';

interface GroupedBranches {
  [key: string]: {
    title: string;
    branches: Branch[];
  };
}

export default function JournalPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const user = session?.user;
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [newBranchTitle, setNewBranchTitle] = useState('');
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<{ [key: string]: boolean }>({});
  const MAX_BRANCH_TITLE_LENGTH = 25;

  const loadBranches = useCallback(async () => {
    if (!user) return;
    try {
      const fetchedBranches = await getBranches(user.id);
      setBranches(fetchedBranches);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!session) {
        router.push('/auth');
      } else if (user) {
        loadBranches();
      }
    }
  }, [session, user, router, isAuthLoading, loadBranches]);

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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {orderedKeys.map((key) => (
          <div key={key} className="bg-[#1A1A2E]/50 backdrop-blur-sm rounded-xl border border-[#b35cff]/10
                                  shadow-[0_0_50px_rgba(179,92,255,0.03)]">
            <button
              onClick={() => toggleGroup(key)}
              className="flex items-center justify-between w-full p-6 text-left 
                        hover:bg-[#b35cff]/5 transition-colors duration-300 rounded-t-xl"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: collapsedGroups[key] ? -90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 
                            flex items-center justify-center"
                >
                  <svg 
                    className="w-4 h-4 text-[#b35cff]"
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
                </motion.div>
                <h2 className="text-base font-medium text-white">
                  {groups[key].title}
                </h2>
              </div>
              <span className="text-sm text-gray-400">
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
                height: { duration: 0.3 },
                opacity: { duration: 0.3 }
              }}
              className="overflow-hidden"
            >
              <div className="max-h-[400px] overflow-y-auto">
                <div className="space-y-2 p-6 pt-0">
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
                        <div className="relative pl-8 py-4 pr-4 rounded-xl 
                                      bg-gradient-to-r from-transparent to-transparent
                                      hover:from-[#b35cff]/5 hover:to-[#ffad4a]/5
                                      border border-transparent hover:border-[#b35cff]/10
                                      transition-all duration-300">
                          {/* Branch Line */}
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#b35cff]/20 to-[#ffad4a]/20" />
                          
                          {/* Branch Node */}
                          <div className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] 
                                        rounded-full bg-gradient-to-r from-[#b35cff] to-[#ffad4a]" />

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-white mb-1">
                                {branch.title}
                              </h3>
                              <p className="text-sm text-gray-400">
                                Created {formatDistanceToNow(new Date(branch.created_at), { addSuffix: true })}
                              </p>
                            </div>
                            
                            {/* Actions */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={(e) => handleDeleteClick(e, branch.id)}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 
                                          rounded-lg transition-colors duration-300"
                              >
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
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
      </motion.div>
    );
  };

  const getCharacterCountColor = (length: number) => {
    const remaining = MAX_BRANCH_TITLE_LENGTH - length;
    if (remaining <= 10) return 'text-red-400';
    if (remaining <= 20) return 'text-yellow-400';
    return 'text-gray-400';
  };

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-[#0D0D15] text-white font-mono flex items-center justify-center">
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
    <main className="min-h-screen bg-[#0D0D15] text-white font-mono overflow-y-scroll">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(179,92,255,0.05)_50%,rgba(255,173,74,0.05)_100%)] animate-[gradientShift_10s_ease-in-out_infinite]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#b35cff] opacity-[0.07] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ffad4a] opacity-[0.07] rounded-full blur-[100px]" />
      </div>

      <Navbar scrolled={true} />

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full 
                         bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 border border-[#b35cff]/20">
            <BookText className="w-8 h-8 text-[#b35cff]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#b35cff] via-white to-[#ffad4a] bg-clip-text text-transparent mb-6">
            Your Memory Journal
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Take your lecture/meeting notes using the Cyril Journal. When Cyril awakens in Q3 2025, he will have access to all of your memories.
          </p> 
        </motion.div>

        {/* New Branch Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setIsAddingBranch(true)}
          className="w-full mb-16 p-8 flex items-center justify-center gap-4
                    bg-gradient-to-r from-[#b35cff]/5 to-[#ffad4a]/5
                    hover:from-[#b35cff]/10 hover:to-[#ffad4a]/10 
                    border border-[#b35cff]/10 hover:border-[#b35cff]/20
                    rounded-2xl transition-all duration-300 group"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full 
                         bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 
                         group-hover:from-[#b35cff]/20 group-hover:to-[#ffad4a]/20
                         border border-[#b35cff]/20 transition-all duration-300">
            <Plus className="w-6 h-6 text-[#b35cff]" />
          </div>
          <span className="text-lg font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
            Create New Branch
          </span>
        </motion.button>

        {/* Branch List with Loading State */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-16 h-16 mb-6 rounded-full border-2 border-[#b35cff] border-t-transparent animate-spin" />
            <p className="text-lg text-gray-400">Loading your branches...</p>
          </motion.div>
        ) : branches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-gradient-to-r from-[#b35cff]/5 to-[#ffad4a]/5 
                      rounded-2xl border border-[#b35cff]/10"
          >
            <p className="text-lg text-gray-400">Your memory tree is empty. Create a new branch to get started.</p>
          </motion.div>
        ) : (
          renderBranchGroups()
        )}
      </div>

      {/* Modal styles updated to match homepage aesthetic */}
      {isAddingBranch && (
        <div className="fixed inset-0 bg-[#0D0D15]/90 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A2E]/90 backdrop-blur-xl w-full max-w-md p-8 rounded-2xl 
                      border border-[#b35cff]/20 shadow-[0_0_50px_rgba(179,92,255,0.1)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent">
                Create New Branch
              </h3>
              <span className={`text-sm ${getCharacterCountColor(newBranchTitle.length)} 
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
              className="w-full p-4 rounded-xl bg-[#2A2A3F] border border-[#b35cff]/20 
                        text-white placeholder-gray-400 focus:outline-none focus:border-[#b35cff]/50 
                        transition-colors duration-300 mb-8"
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
                className="px-6 py-3 text-sm text-gray-400 hover:text-gray-300 
                         hover:bg-white/5 rounded-xl transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBranch}
                disabled={!newBranchTitle.trim() || newBranchTitle.length > MAX_BRANCH_TITLE_LENGTH}
                className={`px-6 py-3 text-sm rounded-xl transition-all duration-300
                          ${!newBranchTitle.trim() || newBranchTitle.length > MAX_BRANCH_TITLE_LENGTH
                            ? 'bg-[#b35cff]/10 text-[#b35cff]/50 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-[#b35cff]/10 to-[#ffad4a]/10 text-white hover:from-[#b35cff]/20 hover:to-[#ffad4a]/20'}`}
              >
                Create Branch
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete confirmation modal with matching style */}
      {branchToDelete && (
        <div className="fixed inset-0 bg-[#0D0D15]/90 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A2E]/90 backdrop-blur-xl w-full max-w-md p-8 rounded-2xl 
                      border border-[#b35cff]/20 shadow-[0_0_50px_rgba(179,92,255,0.1)]"
          >
            <h3 className="text-xl font-medium bg-gradient-to-r from-[#b35cff] to-[#ffad4a] bg-clip-text text-transparent mb-6">
              Delete Branch?
            </h3>
            <p className="text-gray-400 mb-8 text-base leading-relaxed">
              Are you sure you want to delete this branch? This will also delete all memories associated with it. 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setBranchToDelete(null)}
                className="px-6 py-3 text-sm text-gray-400 hover:text-gray-300 
                         hover:bg-white/5 rounded-xl transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-3 text-sm text-red-400 hover:text-red-300 
                         hover:bg-red-400/10 rounded-xl transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Always show scrollbar to prevent layout shift */
        html {
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        /* Hide all scrollbars */
        html::-webkit-scrollbar,
        .overflow-y-scroll::-webkit-scrollbar,
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }

        ::selection {
          background: rgba(179,92,255,0.3);
          color: #ffffff;
        }
      `}</style>
    </main>
  );
} 