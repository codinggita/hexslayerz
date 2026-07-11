import { useCheckpointStore } from "../stores";
import { AIProviderType } from "../services";
import { Search, Filter, ArrowDownWideNarrow } from "lucide-react";

export function Controls() {
  const {
    searchQuery,
    setSearchQuery,
    providerFilter,
    setProviderFilter,
    sortDirection,
    setSortDirection,
  } = useCheckpointStore();

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-[#161B22]/80 backdrop-blur-md p-4 shadow-xl">
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center justify-center text-neutral-500">
          <Search size={16} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Search checkpoints..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search checkpoints"
          className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 pl-9 pr-4 text-[13px] font-medium text-neutral-200 placeholder-neutral-500 shadow-inner outline-none transition-all duration-300 focus:border-violet-500/50 focus:bg-black/80 focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
            <Filter size={14} strokeWidth={2.5} />
          </div>
          <select
            value={providerFilter}
            onChange={(e) =>
              setProviderFilter(e.target.value as AIProviderType | "ALL")
            }
            aria-label="Filter by provider"
            className="w-full appearance-none rounded-xl border border-white/10 bg-black/50 py-2 pl-8 pr-8 text-xs font-medium text-neutral-300 outline-none transition-all duration-300 focus:border-violet-500/50 focus:bg-black/80 focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="ALL">All Providers</option>
            {Object.values(AIProviderType).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="relative w-32">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
            <ArrowDownWideNarrow size={14} strokeWidth={2.5} />
          </div>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value as "desc" | "asc")}
            aria-label="Sort direction"
            className="w-full appearance-none rounded-xl border border-white/10 bg-black/50 py-2 pl-8 pr-8 text-xs font-medium text-neutral-300 outline-none transition-all duration-300 focus:border-violet-500/50 focus:bg-black/80 focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
