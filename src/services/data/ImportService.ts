import { MigrationService } from "./MigrationService";
import { DataValidator } from "./DataValidator";
import { SettingsService } from "../settings";
import { CheckpointStorage } from "../checkpoint";

export class ImportService {
  /**
   * Parses, migrates, validates, and persists a JSON payload.
   * Overwrites local storage only if all checks pass.
   */
  static async importData(jsonString: string): Promise<void> {
    let rawPayload;
    try {
      rawPayload = JSON.parse(jsonString);
    } catch (e) {
      throw new Error("Import failed: Invalid JSON format.", { cause: e });
    }

    // 1. Migrate
    const migrated = MigrationService.migrate(rawPayload);

    // 2. Validate
    const validData = DataValidator.validateSchema(migrated);

    // 3. Persist (only if validation entirely succeeds)

    // Wipe existing checkpoints
    await CheckpointStorage.clear();

    // Save new settings
    await SettingsService.saveSettings(validData.settings);

    // Save all imported checkpoints one by one to ensure CheckpointStorage internal integrity
    for (const cp of validData.checkpoints) {
      await CheckpointStorage.save(cp);
    }
  }
}
