import type { iconMap } from "./generated/icon-map";

type GeneratedIconName = keyof typeof iconMap;

/**
 * 아이콘 의미명(semantic alias) → 실제 생성 아이콘명 매핑.
 *
 * 생성된 아이콘명은 Figma 원본 이름을 따르므로 도메인 의미와 직접 이어지지 않는다.
 * 이 맵은 사용처가 원본 이름(`coloredCircleCheck` 등) 대신
 * 안정적인 의미명(`success` 등)으로 아이콘을 참조하도록 한다.
 *
 * 값은 반드시 `iconMap`에 실존하는 키여야 한다(타입으로 강제).
 * 아이콘을 재생성해 원본 이름이 바뀌어도, 이 맵만 갱신하면 사용처는 영향받지 않는다.
 */
export const iconAliasMap = {
  // 상태 표시
  success: "coloredCircleCheck",
  warning: "coloredCircleCaution",
  danger: "stopCircle",
  error: "stopCircle",

  // 공통 액션
  close: "x",
  add: "plus",
  remove: "minus",
  edit: "pencil",
  delete: "trash",
  refresh: "arrowClockwise",
  undo: "arrowCounterClockwise",
  redo: "arrowClockwise",
  save: "download",
  share: "export",
  more: "dotsThreeVertical",

  // 네비게이션 방향
  chevronUp: "chevronUpThickFalse",
  chevronDown: "chevronDownThickFalse",
  chevronLeft: "chevronLeftThickFalse",
  chevronRight: "chevronRightThickFalse",
  arrowUp: "arrowUpThickFalse",
  arrowDown: "arrowDownThickFalse",
  arrowLeft: "arrowLeftThickFalse",
  arrowRight: "arrowRightThickFalse",

  // 표시 토글
  visible: "eye",
  hidden: "eyeSlash",
  check: "checkThickTrue",
  favorite: "starFilledTrue",
  like: "thumbsUpFilledTrue",
  dislike: "thumbsDownFilledTrue",

  // 도메인 개념
  settings: "gear",
  profile: "user",
  notification: "bell",
  attachment: "paperclip",
  message: "chat",
  history: "clockCounterClockwise",
} as const satisfies Record<string, GeneratedIconName>;

/** 의미명 alias 이름 union. */
export type IconAlias = keyof typeof iconAliasMap;
