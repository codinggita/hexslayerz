import type { LscssExportPayload } from "./DataTypes";
import { SettingsValidator } from "../settings";
import { CheckpointValidator, type Checkpoint } from "../checkpoint";
import { CURRENT_DATA_VERSION } from "./DataTypes";

export class DataValidator {
  /**
   * Validates the schema of an import/restore payload.
   * Runs SettingsValidator on settings and CheckpointValidator on every checkpoint.
   */
  static validateSchema(payload: unknown): LscssExportPayload {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid payload: Must be a JSON object.");
    }

    const data = payload as Record<string, unknown>;

    if (typeof data.version !== "number") {
      throw new Error("Invalid payload: Missing or invalid version.");
    }
    if (data.version > CURRENT_DATA_VERSION) {
      throw new Error(
        `Unsupported version: ${data.version}. Extension needs an update.`,
      );
    }
    if (typeof data.timestamp !== "number") {
      throw new Error("Invalid payload: Missing or invalid timestamp.");
    }

    // Settings Validation (auto-corrects corrupted settings)
    const validSettings = SettingsValidator.validate(
      data.settings as Record<string, unknown>,
    );

    // Checkpoints Validation (throws if corrupt, ensuring we don't import bad data)
    if (!Array.isArray(data.checkpoints)) {
      throw new Error("Invalid payload: checkpoints must be an array.");
    }

    const validCheckpoints = data.checkpoints.map((cp, idx) => {
      try {
        CheckpointValidator.validate(cp as unknown as Checkpoint);
        return cp;
      } catch (e) {
        throw new Error(
          `Invalid payload: Corrupt checkpoint at index ${idx}. ${e instanceof Error ? e.message : "Unknown error"}`,
          { cause: e },
        );
      }
    });

    return {
      version: data.version,
      timestamp: data.timestamp,
      settings: validSettings,
      checkpoints:
        validCheckpoints as unknown as LscssExportPayload["checkpoints"],
    };
  }
}
