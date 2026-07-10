export const ConversationRole = {
  USER: "user",
  ASSISTANT: "assistant",
} as const;

export type ConversationRole =
  (typeof ConversationRole)[keyof typeof ConversationRole];

export interface ConversationMessage {
  id: string;
  index: number;
  role: ConversationRole;
  content: string;
}

export interface Conversation {
  id: string;
  source: "chatgpt";
  url: string;
  extractedAt: number;
  messageCount: number;
  messages: ConversationMessage[];
}

export type SerializationResult =
  { success: true; data: Conversation } | { success: false; error: string };

export interface ConversationDetectionResult {
  supported: boolean;
  conversationFound: boolean;
  url: string;
  conversationRoot: Element | null;
}

export type SerializableDetectionResult = Omit<
  ConversationDetectionResult,
  "conversationRoot"
>;
