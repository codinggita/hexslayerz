# Developer Guide

Welcome to LSCS v2! Please review the `ARCHITECTURE.md` before making any contributions.

## Core Rules

1. **No React Business Logic**: Do not write `.map()` filters or validation checks inside `.tsx` files. Route them to a domain service and expose them through `ApplicationService`.
2. **No Unsafe Chrome APIs**: Only `StorageService` and `RuntimeService` should invoke `chrome.*` methods directly.
3. **Always Validate Data**: Every payload retrieved from `chrome.storage` must pass through a strict validator (e.g., `SettingsValidator`, `CheckpointValidator`). Storage disks get corrupted, JSON gets tampered with. Never trust disk data implicitly.
4. **Immutable State**: Zustand stores and domain models must treat data as immutable.
5. **No Any Types**: Use strictly typed interfaces. `unknown` may be used for runtime validation entry points, but never `any`.

## Adding a New Subsystem

If you need a new domain (e.g., `Analytics`):

1. Create `src/services/analytics/`.
2. Define models (`AnalyticsTypes.ts`).
3. Define validators (`AnalyticsValidator.ts`).
4. Define the persistence layer (`AnalyticsStorage.ts`).
5. Create a facade (`AnalyticsService.ts`).
6. Export the module in `src/services/analytics/index.ts` and `src/services/index.ts`.
7. Wire it to `ApplicationService.ts`.
8. Wire it to a Zustand store (`analyticsStore.ts`).
9. Build your UI components.
