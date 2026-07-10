import { CURRENT_DATA_VERSION } from "./DataTypes";

export class MigrationService {
  /**
   * Runs migrations on older payload versions to bring them up to CURRENT_DATA_VERSION.
   * Assumes payload has a valid version number and is an object.
   */
  static migrate(payload: unknown): Record<string, unknown> {
    const data = payload as Record<string, unknown>;
    const currentVersion = data.version as number;
    const migratedPayload = { ...data };

    // Migration pipeline. In the future:
    // if (currentVersion === 1) {
    //   migratedPayload = this.migrateV1toV2(migratedPayload);
    //   currentVersion = 2;
    // }

    if (currentVersion < CURRENT_DATA_VERSION) {
      // In the current state (V1), we don't have legacy versions to migrate from yet.
      // We will add `if (currentVersion === x)` blocks here in future phases.
      migratedPayload.version = CURRENT_DATA_VERSION;
    }

    return migratedPayload;
  }
}
