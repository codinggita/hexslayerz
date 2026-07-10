import { ConversationRole } from "./ConversationTypes";
import type { ConversationMessage } from "./ConversationTypes";

export class ConversationExtractor {
  /**
   * Extracts raw messages from the ChatGPT DOM.
   * Preserves exact ordering and raw text content without cleaning.
   */
  static extract(): ConversationMessage[] {
    const messages: ConversationMessage[] = [];

    // ChatGPT utilizes the 'data-message-author-role' attribute to distinguish turns.
    const messageElements = document.querySelectorAll<HTMLElement>(
      "[data-message-author-role]",
    );

    messageElements.forEach((el, index) => {
      const rawRole = el.getAttribute("data-message-author-role");
      const role =
        rawRole === "user" ? ConversationRole.USER : ConversationRole.ASSISTANT;

      // We extract raw text. We use innerText to respect visual line breaks
      // or textContent as a fallback. No markdown stripping is applied here.
      const content = el.innerText || el.textContent || "";

      // Preserve DOM IDs if present, otherwise fallback to an ordered index
      const id = el.id || `msg-${index}`;

      messages.push({
        id,
        index,
        role,
        content,
      });
    });

    return messages;
  }
}
