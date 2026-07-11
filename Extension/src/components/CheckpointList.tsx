import type { Checkpoint } from "../services";
import { CheckpointCard } from "./CheckpointCard";
import { useCheckpointStore } from "../stores";
import { motion } from "framer-motion";
import { Inbox, Sparkles, Loader2, Search } from "lucide-react";

interface Props {
  checkpoints: Checkpoint[];
}

export function CheckpointList({ checkpoints }: Props) {
  const { isLoading, searchQuery, providerFilter, createCheckpoint } = useCheckpointStore();

  if (isLoading && checkpoints.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-3 text-neutral-500">
        <Loader2 size={24} className="animate-spin text-violet-500/50" />
        <span className="text-sm font-medium">Loading your checkpoints...</span>
      </div>
    );
  }

  if (checkpoints.length === 0) {
    const isFiltering = searchQuery !== "" || providerFilter !== "ALL";
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#161B22]/50 px-6 py-8 text-center shadow-inner"
      >
        {isFiltering ? (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900/80 shadow-md">
              <Search size={20} className="text-neutral-500" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-neutral-200">No results found</h3>
              <p className="text-xs text-neutral-500">No checkpoints match your current filters.</p>
            </div>
          </>
        ) : (
          <>
            <div className="relative mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 shadow-lg shadow-violet-900/10">
              <Inbox size={24} className="text-violet-400" />
              <div className="absolute -top-1 -right-1 text-amber-400">
                <Sparkles size={12} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold text-white tracking-tight">No Checkpoints Yet</h3>
              <p className="max-w-[200px] text-xs leading-relaxed text-neutral-400 mx-auto">
                Extract important conversations from ChatGPT and access them anytime.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => createCheckpoint()}
              disabled={isLoading}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors border border-white/5"
            >
              Extract Checkpoint
            </motion.button>
            <p className="mt-2 text-[10px] text-neutral-600 font-medium">
              Your saved checkpoints will appear here.
            </p>
          </>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {}
      }}
      className="flex flex-col gap-3 pb-4"
    >
      {checkpoints.map((cp) => (
        <CheckpointCard key={cp.id} checkpoint={cp} />
      ))}
    </motion.div>
  );
}
