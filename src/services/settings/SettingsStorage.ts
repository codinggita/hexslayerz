import { StorageService } from "../chrome";
import type { LscssSettings } from "./SettingsTypes";

const SETTINGS_KEY = "lscs_settings";

export class SettingsStorage {
  /**
   * Loads raw settings from chrome storage.
   */
  static async load(): Promise<Partial<LscssSettings> | null> {
    return await StorageService.get<Partial<LscssSettings>>(SETTINGS_KEY);
  }

  /**
   * Saves settings to chrome storage.
   */
  static async save(settings: LscssSettings): Promise<void> {
    await StorageService.set(SETTINGS_KEY, settings);
  }

  /**
   * Clears the settings from chrome storage.
   */
  static async clear(): Promise<void> {
    await StorageService.remove(SETTINGS_KEY);
  }
}
