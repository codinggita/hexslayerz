import type {
  Conversation,
  ConversationMessage,
  SerializationResult,
} from "./ConversationTypes";
import { ConversationRole } from "./ConversationTypes";

export class ConversationSerializer {
  /**
   * Validates cleaned messages and packages them into a deterministic Conversation object.
   * Does NOT modify message text.
   */
  static serialize(
    messages: ConversationMessage[],
    url: string,
  ): SerializationResult {
    if (!messages || messages.length === 0) {
      return {
        success: false,
        error: "Cannot serialize an empty conversation.",
      };
    }

    // Validation Pass
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]!;
      if (!msg.id) {
        return {
          success: false,
          error: `Message at index ${i} is missing an ID.`,
        };
      }
      if (msg.index !== i) {
        return {
          success: false,
          error: `Message index mismatch at ${i} (found ${msg.index}).`,
        };
      }
      if (!Object.values(ConversationRole).includes(msg.role)) {
        return {
          success: false,
          error: `Invalid role '${msg.role}' at index ${i}.`,
        };
      }
      if (typeof msg.content !== "string") {
        return {
          success: false,
          error: `Message content is not a string at index ${i}.`,
        };
      }
    }

    const conversation: Conversation = {
      id: crypto.randomUUID ? crypto.randomUUID() : `lscs-${Date.now()}`,
      source: "chatgpt",
      url,
      extractedAt: Date.now(),
      messageCount: messages.length,
      messages: [...messages], // Shallow copy to ensure immutability of the input array
    };

    return { success: true, data: conversation };
  }
}
