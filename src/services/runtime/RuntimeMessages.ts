export const RuntimeMessageTypes = {
  PING: "PING",
  CHECK_CONVERSATION: "CHECK_CONVERSATION",
  EXTRACT_CONVERSATION: "EXTRACT_CONVERSATION",
  EXTRACT_PAGE_CONTENT: "EXTRACT_PAGE_CONTENT",
  EXTRACT_RAW_PAGE_TEXT: "EXTRACT_RAW_PAGE_TEXT",
} as const;

export type RuntimeMessageType =
  (typeof RuntimeMessageTypes)[keyof typeof RuntimeMessageTypes];
