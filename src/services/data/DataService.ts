import { ExportService } from "./ExportService";
import { ImportService } from "./ImportService";
import { BackupService } from "./BackupService";

export class DataService {
  static async exportData(): Promise<string> {
    return await ExportService.exportData();
  }

  static async importData(jsonString: string): Promise<void> {
    await ImportService.importData(jsonString);
  }

  static async createBackup(): Promise<void> {
    await BackupService.createBackup();
  }

  static async restoreBackup(): Promise<void> {
    await BackupService.restoreBackup();
  }
}
