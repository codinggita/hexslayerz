# Architecture

LSCS v2 is built using an extremely rigid, strictly unidirectional architectural pattern. This pattern guarantees that **React components contain zero business logic**, and all heavy lifting is isolated in single-responsibility modules.

## The Global Pipeline

The extension strictly enforces the following layer flow:
`Popup UI` ➞ `Zustand Stores` ➞ `ApplicationService` ➞ `Domain Service` ➞ `StorageService` ➞ `chrome.storage.local`

**Never bypass ApplicationService.** React must never interact with a domain service directly.

## Subsystems

1. **Conversation**: `Detect` → `Extract` → `Clean` → `Serialize`
2. **AI**: `Prompt` → `Provider` → `Engine` → `Validate`
3. **Checkpoint**: `Model` → `Build` → `Validate` → `Store`
4. **Recall**: `Retrieve` → `Filter` → `Sort` → `Search`
5. **Settings**: `Model` → `Defaults` → `Validate` → `Store` → `Service`
6. **Data Management**: `Model` → `Validate` → `Migrate` → `Import/Export` → `Backup/Restore`

## SOLID Principles

- **Single Responsibility**: Every file and class has one job (e.g., `SettingsValidator` only validates settings).
- **Open-Closed**: The `AIProvider` system uses a unified `AIProviderType` to easily attach new AI APIs without altering core logic.
- **Liskov Substitution**: Shared interfaces across data structures.
- **Dependency Inversion**: `ApplicationService` abstracts storage access away from React.

Adhering to these patterns is strictly enforced.
