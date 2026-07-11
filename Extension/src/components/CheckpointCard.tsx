import React, { useState } from "react";
import type { Checkpoint } from "../services";
import { useCheckpointStore } from "../stores";
import { TabService } from "../services/chrome/TabService";
import { motion } from "framer-motion";
import { Trash2, BookOpen, ExternalLink, Copy, Cpu, Calendar, MessageSquare } from "lucide-react";

interface Props {
  checkpoint: Checkpoint;
}

export const CheckpointCard = React.memo(function CheckpointCard({
  checkpoint,
}: Props) {
  const { deleteCheckpoint, isLoading } = useCheckpointStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(checkpoint.createdAt).toLocaleString(
    undefined,
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    },
  );

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      className="group relative flex flex-col gap-3 rounded-2xl border border-white/5 bg-[#161B22]/80 backdrop-blur-md p-4 transition-all duration-300 hover:border-violet-500/30 hover:bg-[#1C2128] hover:shadow-lg hover:shadow-violet-900/10"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 
          className="text-[15px] font-bold tracking-tight text-neutral-100 cursor-pointer hover:text-violet-400 transition-colors leading-snug"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {checkpoint.summary.title}
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            deleteCheckpoint(checkpoint.id);
          }}
          disabled={isLoading}
          className="text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-400/10"
          title="Delete Checkpoint"
          aria-label="Delete Checkpoint"
        >
          <Trash2 size={16} strokeWidth={2} />
        </motion.button>
      </div>

      <p 
        className={`text-[13px] text-neutral-400/90 cursor-pointer leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {checkpoint.summary.content}
      </p>

      <div className="mt-1 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-neutral-400">
          <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 border border-white/5">
            <Cpu size={12} className="text-violet-400" />
            <span>{checkpoint.summary.provider}</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 border border-white/5">
            <Calendar size={12} className="text-neutral-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 border border-white/5">
            <MessageSquare size={12} className="text-neutral-500" />
            <span>{checkpoint.conversation.messageCount} msgs</span>
          </div>
        </div>
      </div>

      <div className="mt-1 flex gap-1 pt-3 border-t border-white/5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={async (e) => {
            e.stopPropagation();
            const tab = await TabService.getActiveTab();
            if (tab?.id) {
              await TabService.injectReaderModal(
                tab.id,
                checkpoint.summary.title,
                checkpoint.summary.content
              );
              window.close();
            }
          }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 text-xs font-semibold text-violet-400 transition-colors"
        >
          <BookOpen size={14} />
          <span>Read Full</span>
        </motion.button>
        
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={checkpoint.conversation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} />
          <span>Link</span>
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(JSON.stringify(checkpoint.conversation, null, 2));
            alert("Conversation context (JSON) copied to clipboard!");
          }}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors"
        >
          <Copy size={14} />
          <span>JSON</span>
        </motion.button>
      </div>
    </motion.div>
  );
});
