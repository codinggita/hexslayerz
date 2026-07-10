import type { LscssSettings } from "../settings";
import type { Checkpoint } from "../checkpoint";

export const CURRENT_DATA_VERSION = 1;

export interface LscssExportPayload {
  version: number;
  timestamp: number;
  settings: LscssSettings;
  checkpoints: Checkpoint[];
}
