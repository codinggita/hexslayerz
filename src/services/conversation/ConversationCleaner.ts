import type { ConversationMessage } from "./ConversationTypes";

export class ConversationCleaner {
  /**
   * Cleans an array of raw conversation messages.
   * Normalizes whitespace and newlines while preserving markdown structure.
   */
  static clean(messages: ConversationMessage[]): ConversationMessage[] {
    return messages.map((msg) => ({
      ...msg,
      content: this.cleanContent(msg.content),
    }));
  }

  /**
   * Applies specific cleaning rules to a raw string of content.
   */
  private static cleanContent(raw: string): string {
    if (!raw) return "";

    let cleaned = raw;

    // Rule 1: Normalize all CRLF to LF
    cleaned = cleaned.replace(/\r\n/g, "\n");

    // Rule 2: Remove duplicate consecutive blank lines (3+ newlines become exactly 2)
    // This preserves paragraph breaks while collapsing excessive whitespace.
    cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

    // Rule 3: Trim leading and trailing whitespace
    cleaned = cleaned.trim();

    return cleaned;
  }
}
