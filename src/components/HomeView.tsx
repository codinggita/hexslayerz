import { FileSearch, Settings, History } from "lucide-react";
import type { ViewType } from "../popup/App";

interface Props {
  setActiveView: (view: ViewType) => void;
}

export function HomeView({ setActiveView }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Content Extractor Card */}
      <button
        onClick={() => setActiveView("content")}
        className="flex flex-col items-start text-left gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-5 transition-all hover:border-violet-500/50 hover:bg-neutral-900 shadow-sm group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
          <FileSearch className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white mb-1">Content Extractor</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Extract, summarize, and chat with any webpage using AI voice assistance. Understand complex articles instantly.
          </p>
        </div>
      </button>

      {/* Checkpoints Card */}
      <button
        onClick={() => setActiveView("checkpoints")}
        className="flex flex-col items-start text-left gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-5 transition-all hover:border-violet-500/50 hover:bg-neutral-900 shadow-sm group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          <History className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white mb-1">Checkpoint Manager</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            View and manage your saved AI conversations and extracted webpage contexts. Revisit your past research.
          </p>
        </div>
      </button>

      {/* Settings Card */}
      <button
        onClick={() => setActiveView("settings")}
        className="flex flex-col items-start text-left gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-5 transition-all hover:border-violet-500/50 hover:bg-neutral-900 shadow-sm group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white mb-1">Settings</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Configure AI providers, TTS voices, API keys, and data backups to customize your experience.
          </p>
        </div>
      </button>
    </div>
  );
}
