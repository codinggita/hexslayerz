import { useCheckpointStore } from "../stores";
import { Settings, FileText, HelpCircle, RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type ViewType = "checkpoints" | "content" | "settings" | "shopping";

interface Props {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export function Header({ activeView, setActiveView }: Props) {
  const { createCheckpoint, loadCheckpoints, isLoading } = useCheckpointStore();

  const subtitleMap: Record<ViewType, string> = {
    checkpoints: "Checkpoint Manager",
    content: "Content Extractor",
    settings: "Settings",
    shopping: "Shopping Assistant",
  };

  const NavButton = ({ 
    isActive, 
    onClick, 
    icon: Icon, 
    title
  }: any) => {
    const baseClasses = "relative flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 outline-none";
    const activeClasses = isActive 
      ? `bg-white/10 text-white shadow-sm ring-1 ring-white/20` 
      : `text-neutral-400 hover:bg-white/5 hover:text-neutral-200`;

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${baseClasses} ${activeClasses}`}
        title={title}
        aria-label={title}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
      </motion.button>
    );
  };

  return (
    <div className="flex flex-col gap-5 px-2 pt-4 pb-6">
      {/* Top Row: Logo & Subtitle */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Sparkles size={14} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white/95 leading-none">Context(AI)</h1>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 leading-tight">{subtitleMap[activeView]}</p>
      </div>

      {/* Bottom Row: Icons & Action Button */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <NavButton
            icon={HelpCircle}
            onClick={() => window.dispatchEvent(new Event("open-onboarding"))}
            title="How to use"
          />
          
          <NavButton
            isActive={activeView === "content"}
            icon={FileText}
            onClick={() => setActiveView(activeView === "content" ? "checkpoints" : "content")}
            title="Content Extractor"
          />

          <NavButton
            isActive={activeView === "settings"}
            icon={Settings}
            onClick={() => setActiveView(activeView === "settings" ? "checkpoints" : "settings")}
            title="Settings"
          />

          {activeView === "checkpoints" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadCheckpoints}
              disabled={isLoading}
              title="Refresh Checkpoints"
              aria-label="Refresh Checkpoints"
              className="flex items-center justify-center p-2.5 rounded-xl text-neutral-400 hover:bg-white/5 hover:text-neutral-200 disabled:opacity-50 transition-all duration-300 outline-none"
            >
              <motion.div animate={isLoading ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <RefreshCw size={18} strokeWidth={2} />
              </motion.div>
            </motion.button>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createCheckpoint()}
          disabled={isLoading}
          aria-label="Extract Checkpoint"
          className="relative flex shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 outline-none border border-white/10"
        >
          <span className="relative z-10">{isLoading ? "Extracting..." : "Extract"}</span>
          {!isLoading && (
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
