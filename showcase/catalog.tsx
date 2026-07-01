import type { ReactNode } from "react";
import { examples } from "./examples";

/**
 * Atomic 단계 — 사이드바 최상위 그룹.
 */
export type AtomicStage = "Foundations" | "Atoms" | "Molecules" | "Organisms" | "Templates";

export interface CatalogEntry {
  /** URL ?item= 값. kebab-case 고유 식별자. */
  name: string;
  /** 사이드바·뷰 제목. */
  title: string;
  /** Atomic 단계. */
  stage: AtomicStage;
  /** 단계 내 서브그룹 (예: Actions, Inputs). */
  group: string;
  /** 한 줄 설명. */
  description?: string;
  /** 라이브 예제 렌더러. 없으면 "준비 중" 표시. */
  example?: () => ReactNode;
}

/**
 * 컴포넌트 카탈로그.
 * example 이 등록된 항목만 라이브 렌더, 나머지는 "예제 준비 중".
 */
export const catalog: CatalogEntry[] = [
  // ── Foundations ────────────────────────────────────────────────
  {
    name: "design-tokens",
    title: "Design Tokens",
    stage: "Foundations",
    group: "Core",
    description: "색·타이포·간격 시맨틱 토큰 미리보기.",
    example: examples["design-tokens"],
  },
  {
    name: "text",
    title: "Text",
    stage: "Foundations",
    group: "Typography",
    description: "타이포그래피 스케일을 적용하는 다형(as) 텍스트.",
    example: examples.text,
  },
  {
    name: "icon",
    title: "Icon",
    stage: "Foundations",
    group: "Media",
    description: "이름 기반 아이콘 렌더러.",
  },

  // ── Atoms ──────────────────────────────────────────────────────
  {
    name: "button",
    title: "Button",
    stage: "Atoms",
    group: "Actions",
    description: "primary·secondary·ghost·destructive 변형 버튼.",
    example: examples.button,
  },
  {
    name: "icon-button",
    title: "Icon Button",
    stage: "Atoms",
    group: "Actions",
    description: "아이콘 전용 정사각 버튼.",
  },
  {
    name: "link-button",
    title: "Link Button",
    stage: "Atoms",
    group: "Actions",
    description: "링크 스타일 버튼.",
  },
  {
    name: "badge",
    title: "Badge",
    stage: "Atoms",
    group: "Data Display",
    description: "상태·범주 표시 배지.",
    example: examples.badge,
  },
  {
    name: "tag",
    title: "Tag",
    stage: "Atoms",
    group: "Data Display",
    description: "제거 가능한 태그 칩.",
    example: examples.tag,
  },
  {
    name: "avatar",
    title: "Avatar",
    stage: "Atoms",
    group: "Data Display",
    description: "사용자 아바타 (이미지·이니셜 폴백).",
    example: examples.avatar,
  },
  {
    name: "spinner",
    title: "Spinner",
    stage: "Atoms",
    group: "Feedback",
    description: "로딩 스피너.",
    example: examples.spinner,
  },
  {
    name: "progress",
    title: "Progress",
    stage: "Atoms",
    group: "Feedback",
    description: "진행률 바 (determinate·indeterminate).",
    example: examples.progress,
  },
  {
    name: "skeleton",
    title: "Skeleton",
    stage: "Atoms",
    group: "Feedback",
    description: "콘텐츠 로딩 자리표시자.",
    example: examples.skeleton,
  },
  {
    name: "separator",
    title: "Separator",
    stage: "Atoms",
    group: "Layout",
    description: "가로·세로 구분선.",
  },
  {
    name: "input",
    title: "Input",
    stage: "Atoms",
    group: "Inputs",
    description: "텍스트 입력 필드.",
    example: examples.input,
  },
  {
    name: "textarea",
    title: "Textarea",
    stage: "Atoms",
    group: "Inputs",
    description: "여러 줄 텍스트 입력.",
    example: examples.textarea,
  },
  {
    name: "checkbox",
    title: "Checkbox",
    stage: "Atoms",
    group: "Inputs",
    description: "체크박스 (라벨·헬퍼).",
    example: examples.checkbox,
  },
  {
    name: "switch",
    title: "Switch",
    stage: "Atoms",
    group: "Inputs",
    description: "on/off 토글 스위치.",
    example: examples.switch,
  },
  {
    name: "radio-group",
    title: "Radio Group",
    stage: "Atoms",
    group: "Inputs",
    description: "단일 선택 라디오 그룹.",
  },
  {
    name: "slider",
    title: "Slider",
    stage: "Atoms",
    group: "Inputs",
    description: "범위 슬라이더.",
  },

  // ── Molecules ──────────────────────────────────────────────────
  {
    name: "card",
    title: "Card",
    stage: "Molecules",
    group: "Layout",
    description: "헤더·본문·푸터 슬롯 카드.",
    example: examples.card,
  },
  {
    name: "alert",
    title: "Alert",
    stage: "Molecules",
    group: "Feedback",
    description: "인라인 경고 배너.",
    example: examples.alert,
  },
  {
    name: "toast",
    title: "Toast",
    stage: "Molecules",
    group: "Feedback",
    description: "일시 알림 토스트.",
  },
  {
    name: "tooltip",
    title: "Tooltip",
    stage: "Molecules",
    group: "Overlay",
    description: "호버 툴팁.",
  },
  {
    name: "empty-state",
    title: "Empty State",
    stage: "Molecules",
    group: "Feedback",
    description: "빈 상태 안내 + 액션.",
    example: examples["empty-state"],
  },
  {
    name: "metric-card",
    title: "Metric Card",
    stage: "Molecules",
    group: "Data Display",
    description: "지표 라벨·값·증감 카드.",
    example: examples["metric-card"],
  },
  {
    name: "stat-card",
    title: "Stat Card",
    stage: "Molecules",
    group: "Data Display",
    description: "상태 태그·증감·진행바 지표 카드.",
    example: examples["stat-card"],
  },
  {
    name: "chip",
    title: "Chip",
    stage: "Molecules",
    group: "Data Display",
    description: "선택·필터 칩.",
  },
  {
    name: "segmented-control",
    title: "Segmented Control",
    stage: "Molecules",
    group: "Actions",
    description: "분절형 선택 컨트롤.",
  },
  {
    name: "breadcrumb",
    title: "Breadcrumb",
    stage: "Molecules",
    group: "Navigation",
    description: "경로 탐색 브레드크럼.",
  },
  {
    name: "pagination",
    title: "Pagination",
    stage: "Molecules",
    group: "Navigation",
    description: "페이지 네비게이션.",
  },
  {
    name: "tabs",
    title: "Tabs",
    stage: "Molecules",
    group: "Navigation",
    description: "탭 네비게이션.",
  },
  {
    name: "stepper",
    title: "Stepper",
    stage: "Molecules",
    group: "Navigation",
    description: "단계 진행 표시기.",
  },
  {
    name: "select",
    title: "Select",
    stage: "Molecules",
    group: "Inputs",
    description: "단일 선택 드롭다운.",
  },
  {
    name: "combobox",
    title: "Combobox",
    stage: "Molecules",
    group: "Inputs",
    description: "검색 가능한 선택 입력.",
  },
  {
    name: "multi-select",
    title: "Multi Select",
    stage: "Molecules",
    group: "Inputs",
    description: "다중 선택 드롭다운.",
  },
  {
    name: "tag-input",
    title: "Tag Input",
    stage: "Molecules",
    group: "Inputs",
    description: "태그 입력 필드.",
  },
  {
    name: "file-upload",
    title: "File Upload",
    stage: "Molecules",
    group: "Inputs",
    description: "드래그·드롭 파일 업로드.",
  },
  {
    name: "calendar",
    title: "Calendar",
    stage: "Molecules",
    group: "Inputs",
    description: "날짜 선택 달력.",
  },
  {
    name: "date-picker",
    title: "Date Picker",
    stage: "Molecules",
    group: "Inputs",
    description: "단일 날짜 선택기.",
  },

  // ── Organisms ──────────────────────────────────────────────────
  {
    name: "accordion",
    title: "Accordion",
    stage: "Organisms",
    group: "Disclosure",
    description: "접이식 아코디언.",
  },
  {
    name: "dialog",
    title: "Dialog",
    stage: "Organisms",
    group: "Overlay",
    description: "모달 다이얼로그.",
  },
  {
    name: "alert-dialog",
    title: "Alert Dialog",
    stage: "Organisms",
    group: "Overlay",
    description: "확인·취소 경고 다이얼로그.",
  },
  {
    name: "sheet",
    title: "Sheet",
    stage: "Organisms",
    group: "Overlay",
    description: "사이드 시트 패널.",
  },
  {
    name: "popover",
    title: "Popover",
    stage: "Organisms",
    group: "Overlay",
    description: "앵커 기준 팝오버.",
  },
  {
    name: "dropdown-menu",
    title: "Dropdown Menu",
    stage: "Organisms",
    group: "Overlay",
    description: "드롭다운 메뉴.",
  },
  {
    name: "modal",
    title: "Modal",
    stage: "Organisms",
    group: "Overlay",
    description: "합성 모달.",
  },
  {
    name: "side-panel",
    title: "Side Panel",
    stage: "Organisms",
    group: "Overlay",
    description: "사이드 패널.",
  },
  {
    name: "data-table",
    title: "Data Table",
    stage: "Organisms",
    group: "Data Display",
    description: "정렬·페이지네이션 데이터 테이블.",
  },
  {
    name: "table",
    title: "Table",
    stage: "Organisms",
    group: "Data Display",
    description: "기본 테이블.",
  },
  {
    name: "tree-table",
    title: "Tree Table",
    stage: "Organisms",
    group: "Data Display",
    description: "계층형 트리 테이블.",
  },
  {
    name: "timeline",
    title: "Timeline",
    stage: "Organisms",
    group: "Data Display",
    description: "타임라인.",
  },
  {
    name: "chart",
    title: "Chart",
    stage: "Organisms",
    group: "Data Display",
    description: "차트 (recharts 기반).",
  },
  {
    name: "bar-list",
    title: "Bar List",
    stage: "Organisms",
    group: "Data Display",
    description: "가로 막대 순위 리스트.",
  },
  {
    name: "code-editor",
    title: "Code Editor",
    stage: "Organisms",
    group: "Inputs",
    description: "CodeMirror 기반 코드 에디터.",
  },
  {
    name: "page-header",
    title: "Page Header",
    stage: "Organisms",
    group: "Layout",
    description: "페이지 헤더.",
  },
  {
    name: "nav-flyout",
    title: "Nav Flyout",
    stage: "Organisms",
    group: "Navigation",
    description: "플라이아웃 내비게이션.",
  },

  // ── Templates ──────────────────────────────────────────────────
  {
    name: "list-page-template",
    title: "List Page Template",
    stage: "Templates",
    group: "Page",
    description: "목록 페이지 레이아웃.",
  },
  {
    name: "form-page-template",
    title: "Form Page Template",
    stage: "Templates",
    group: "Page",
    description: "폼 페이지 레이아웃.",
  },
  {
    name: "detail-tabs-page-template",
    title: "Detail Tabs Page Template",
    stage: "Templates",
    group: "Page",
    description: "탭 상세 페이지 레이아웃.",
  },
  {
    name: "bulk-action-list-page-template",
    title: "Bulk Action List Template",
    stage: "Templates",
    group: "Page",
    description: "일괄 액션 목록 페이지.",
  },
  {
    name: "modal-page-template",
    title: "Modal Page Template",
    stage: "Templates",
    group: "Page",
    description: "모달 페이지 레이아웃.",
  },
  {
    name: "side-panel-page-template",
    title: "Side Panel Page Template",
    stage: "Templates",
    group: "Page",
    description: "사이드 패널 페이지 레이아웃.",
  },
  {
    name: "full-screen-dialog-page-template",
    title: "Full Screen Dialog Template",
    stage: "Templates",
    group: "Page",
    description: "전체 화면 다이얼로그 페이지.",
  },
  {
    name: "data-items-layout",
    title: "Data Items Layout",
    stage: "Templates",
    group: "Page",
    description: "데이터 아이템 레이아웃.",
  },
];

export const STAGE_ORDER: AtomicStage[] = [
  "Foundations",
  "Atoms",
  "Molecules",
  "Organisms",
  "Templates",
];

export function findEntry(name: string | null): CatalogEntry | undefined {
  if (!name) return undefined;
  return catalog.find((e) => e.name === name);
}
