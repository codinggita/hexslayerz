import { CURRENT_DATA_VERSION, type LscssExportPayload } from "./DataTypes";
import { SettingsService } from "../settings";
import { CheckpointRecall } from "../checkpoint";

export class ExportService {
  /**
   * Constructs the export payload by retrieving settings and checkpoints.
   */
  static async exportData(): Promise<string> {
    const settings = await SettingsService.loadSettings();
    const checkpoints = await CheckpointRecall.getAll();

    const payload: LscssExportPayload = {
      version: CURRENT_DATA_VERSION,
      timestamp: Date.now(),
      settings,
      checkpoints,
    };

    return JSON.stringify(payload, null, 2);
  }
}
