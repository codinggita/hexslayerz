import { useCheckpointStore } from "../stores";
import type { ViewType } from "../popup/App";

interface Props {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export function Header({ activeView, setActiveView }: Props) {
  const { createCheckpoint, loadCheckpoints, isLoading } = useCheckpointStore();

  const subtitleMap: Record<ViewType, string> = {
    home: "Dashboard",
    checkpoints: "Checkpoint Manager",
    content: "Content Extractor",
    settings: "Settings",
  };

  return (
    <div className="flex items-center justify-between pb-5">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tighter">LSCS v2</h1>
        <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">{subtitleMap[activeView]}</p>
      </div>

      <div className="flex items-center gap-2">
        {/* Back to Home Button (Visible everywhere except home) */}
        {activeView !== "home" && (
          <button
            onClick={() => setActiveView("home")}
            className="flex items-center gap-1 rounded-xl bg-neutral-900 px-3 py-1.5 text-xs font-bold text-neutral-300 transition-all hover:bg-neutral-800 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* Help / Guide Button (Visible only on home) */}
        {activeView === "home" && (
          <button
            onClick={() => window.dispatchEvent(new Event("open-onboarding"))}
            className="rounded p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            title="How to use"
            aria-label="How to use"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}

        {/* Checkpoints View Only Actions */}
        {activeView === "checkpoints" && (
          <>
            <button
              onClick={loadCheckpoints}
              disabled={isLoading}
              title="Refresh Checkpoints"
              aria-label="Refresh Checkpoints"
              className="rounded p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-50 transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button
              onClick={() => createCheckpoint()}
              disabled={isLoading}
              aria-label="Extract Checkpoint"
              className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-violet-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-violet-600 disabled:hover:scale-100 shadow-lg shadow-violet-900/20"
            >
              {isLoading ? "Extracting..." : "Extract Checkpoint"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
