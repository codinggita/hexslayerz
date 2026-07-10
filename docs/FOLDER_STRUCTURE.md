# Folder Structure

```text
src/
├── background/         # Chrome background workers & routing
├── components/         # React presentation components
├── constants/          # App-wide constants
├── content/            # Chrome content scripts (DOM extraction)
├── hooks/              # Custom React hooks (if any)
├── lib/                # Shared utilities
├── popup/              # Chrome popup entry point (App.tsx, main.tsx)
├── services/           # The Domain Layer (Core Business Logic)
│   ├── ai/             # Summarization Engine
│   ├── application/    # Facade Orchestrator
│   ├── checkpoint/     # Checkpoint Domain
│   ├── chrome/         # Chrome API abstractions (Storage/Tabs)
│   ├── conversation/   # Extraction Domain
│   ├── data/           # Export/Import/Backup/Restore
│   ├── runtime/        # Service Worker Messaging
│   └── settings/       # App Settings Domain
├── stores/             # Zustand global state (UI layer)
├── types/              # Global TS Definitions
└── utils/              # Helper functions
```
