import type { AIProviderType } from "../ai";

export interface LscssSettings {
  defaultProvider: AIProviderType;
  theme: "dark" | "light" | "system";
  maxSummaryLength: number;
  autoCreateCheckpoints: boolean;
  requireConfirmation: boolean;
  autoReadResponses?: boolean;
  speechSpeed?: number;
  speechPitch?: number;
  speechVolume?: number;
  voiceURI?: string;
  handsFreeMode?: boolean;
  apiKeys: {
    gemini?: string;
    groq?: string;
  };
}
