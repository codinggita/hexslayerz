import { TabService } from "../chrome/TabService";
import type { ConversationDetectionResult } from "./ConversationTypes";

export class ConversationDetector {
  /**
   * Detects whether the current page is a supported ChatGPT page
   * and if a conversation container is present.
   */
  static detect(): ConversationDetectionResult {
    const url = window.location.href;
    const supported = TabService.isChatGPT(url);

    if (!supported) {
      return {
        supported,
        conversationFound: false,
        url,
        conversationRoot: null,
      };
    }

    // Heuristic: ChatGPT usually contains its main conversation in a <main> tag.
    const root = document.querySelector("main");

    return {
      supported,
      conversationFound: !!root,
      url,
      conversationRoot: root,
    };
  }
}
