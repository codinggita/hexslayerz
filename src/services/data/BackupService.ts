import { StorageService } from "../chrome";
import { ExportService } from "./ExportService";
import { ImportService } from "./ImportService";

const BACKUP_KEY = "lscs_backup";

export class BackupService {
  /**
   * Creates a snapshot in local storage by utilizing the Export/Import payload standard.
   */
  static async createBackup(): Promise<void> {
    const jsonString = await ExportService.exportData();
    await StorageService.set(BACKUP_KEY, jsonString);
  }

  /**
   * Restores a snapshot from local storage.
   */
  static async restoreBackup(): Promise<void> {
    const jsonString = await StorageService.get<string>(BACKUP_KEY);
    if (!jsonString) {
      throw new Error("No backup found to restore.");
    }

    await ImportService.importData(jsonString);
  }
}
