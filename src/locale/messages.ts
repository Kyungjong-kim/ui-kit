/** Default UI copy rendered inside ui-kit components. Component props still override each entry. */
export interface UiKitMessages {
  common: {
    close: string;
    cancel: string;
    confirm: string;
    remove: string;
    select: string;
    search: string;
    noResults: string;
    noData: string;
    loading: string;
    filter: string;
    apply: string;
    reset: string;
    add: string;
    help: string;
    refresh: string;
    favorite: string;
    more: string;
    dragHandle: string;
    deleteFile: string;
    previous: string;
    next: string;
    save: string;
  };
  navigation: {
    nav: string;
    breadcrumb: string;
    fullScreenDialog: string;
    /** 제목 없이 연 Dialog·Sheet 의 숨김 제목 */
    dialog: string;
  };
  multiSelect: {
    selectedList: string;
    selectAll: string;
    clearAll: string;
    emptySubText: string;
  };
  table: {
    selectAll: string;
    selectRow: string;
    expand: string;
    collapse: string;
    countUnit: string;
    /** "총 {count}{unit}" 의 앞말 */
    totalPrefix: string;
    /** "{n}개 선택됨" 의 뒷말 */
    selectedSuffix: string;
  };
  date: {
    datePlaceholder: string;
    rangePlaceholder: string;
    dateTimePlaceholder: string;
    monthPlaceholder: string;
    hour: string;
    minute: string;
    previousYear: string;
    nextYear: string;
    startDate: string;
    endDate: string;
    startLabel: string;
    endLabel: string;
    year: (year: number) => string;
    /** January → December */
    months: readonly string[];
  };
  period: {
    today: string;
    last7: string;
    last30: string;
    custom: string;
  };
  relativeTime: {
    justNow: string;
    seconds: (count: number) => string;
    minutes: (count: number) => string;
    hours: (count: number) => string;
    days: (count: number) => string;
    months: (count: number) => string;
    years: (count: number) => string;
  };
  fileUpload: {
    tooLarge: (fileName: string) => string;
    invalidType: (fileName: string) => string;
    tooMany: string;
    failed: (fileName: string) => string;
    removeFile: (fileName: string) => string;
    dropHint: string;
    limits: (maxFiles: number, maxSizeMb: number) => string;
  };
  pagination: {
    label: string;
    previous: string;
    next: string;
    page: (page: number) => string;
  };
  stepper: {
    label: string;
    complete: string;
    stateDone: string;
    stateCurrent: string;
    stateUpcoming: string;
    step: (index: number, step: string, state: string) => string;
  };
  tagInput: {
    placeholder: string;
    clearAll: (count: number) => string;
    patternError: string;
    duplicateError: string;
    maxLengthError: (maxLength: number) => string;
    lengthExceeded: string;
  };
  statCard: {
    deltaCaption: string;
  };
}

export type UiKitLocale = "ko" | "en";

export const ko: UiKitMessages = {
  common: {
    close: "닫기",
    cancel: "취소",
    confirm: "확인",
    remove: "제거",
    select: "선택",
    search: "검색",
    noResults: "결과 없음",
    noData: "데이터가 없습니다",
    loading: "로딩 중",
    filter: "필터",
    apply: "적용",
    reset: "초기화",
    add: "추가",
    help: "도움말",
    refresh: "새로고침",
    favorite: "즐겨찾기",
    more: "더보기",
    dragHandle: "드래그 핸들",
    deleteFile: "파일 삭제",
    previous: "이전",
    next: "다음",
    save: "저장",
  },
  navigation: {
    nav: "네비게이션",
    breadcrumb: "이동 경로",
    fullScreenDialog: "전체화면 다이얼로그",
    dialog: "대화상자",
  },
  multiSelect: {
    selectedList: "선택 항목 목록",
    selectAll: "전체 선택",
    clearAll: "전체 삭제",
    emptySubText: "다른 검색어를 입력해 보세요.",
  },
  table: {
    selectAll: "전체 선택",
    selectRow: "행 선택",
    expand: "펼치기",
    collapse: "접기",
    countUnit: "건",
    totalPrefix: "총",
    selectedSuffix: "개 선택됨",
  },
  date: {
    datePlaceholder: "날짜 선택",
    rangePlaceholder: "기간 선택",
    dateTimePlaceholder: "날짜·시간 선택",
    monthPlaceholder: "년/월 선택",
    hour: "시",
    minute: "분",
    previousYear: "이전 연도",
    nextYear: "다음 연도",
    startDate: "시작일 선택",
    endDate: "종료일 선택",
    startLabel: "시작일",
    endLabel: "종료일",
    year: (year) => `${year}년`,
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  },
  period: {
    today: "오늘",
    last7: "최근 7일",
    last30: "최근 30일",
    custom: "사용자 지정",
  },
  relativeTime: {
    justNow: "방금 전",
    seconds: (count) => `${count}초 전`,
    minutes: (count) => `${count}분 전`,
    hours: (count) => `${count}시간 전`,
    days: (count) => `${count}일 전`,
    months: (count) => `${count}개월 전`,
    years: (count) => `${count}년 전`,
  },
  fileUpload: {
    tooLarge: (fileName) => `${fileName}: 파일 크기 초과`,
    invalidType: (fileName) => `${fileName}: 지원하지 않는 형식`,
    tooMany: "파일 개수 초과",
    failed: (fileName) => `${fileName}: 업로드 실패`,
    removeFile: (fileName) => `${fileName} 제거`,
    dropHint: "파일을 드래그하거나 클릭해서 업로드",
    limits: (maxFiles, maxSizeMb) => `최대 ${maxFiles}개, 파일당 ${maxSizeMb}MB`,
  },
  pagination: {
    label: "페이지 네비게이션",
    previous: "이전",
    next: "다음",
    page: (page) => `${page} 페이지`,
  },
  stepper: {
    label: "단계 진행",
    complete: "완료",
    stateDone: "완료",
    stateCurrent: "현재",
    stateUpcoming: "미완",
    step: (index, step, state) => `${index}단계: ${step} (${state})`,
  },
  tagInput: {
    placeholder: "입력 후 Enter 또는 + 를 누르세요",
    clearAll: (count) => `전체 삭제 (${count})`,
    patternError: "사용할 수 없는 문자가 있습니다.",
    duplicateError: "이미 추가한 항목입니다.",
    maxLengthError: (maxLength) => `${maxLength}자까지 입력할 수 있습니다.`,
    lengthExceeded: "입력할 수 있는 길이를 넘었습니다.",
  },
  statCard: {
    deltaCaption: "직전 기간 대비",
  },
};

export const en: UiKitMessages = {
  common: {
    close: "Close",
    cancel: "Cancel",
    confirm: "Confirm",
    remove: "Remove",
    select: "Select",
    search: "Search",
    noResults: "No results found.",
    noData: "No data",
    loading: "Loading",
    filter: "Filter",
    apply: "Apply",
    reset: "Reset",
    add: "Add",
    help: "Help",
    refresh: "Refresh",
    favorite: "Favorite",
    more: "More",
    dragHandle: "Drag handle",
    deleteFile: "Delete file",
    previous: "Previous",
    next: "Next",
    save: "Save",
  },
  navigation: {
    nav: "Navigation",
    breadcrumb: "Breadcrumb",
    fullScreenDialog: "Full screen dialog",
    dialog: "Dialog",
  },
  multiSelect: {
    selectedList: "Selected items",
    selectAll: "Select all",
    clearAll: "Clear all",
    emptySubText: "Try a different keyword.",
  },
  table: {
    selectAll: "Select all",
    selectRow: "Select row",
    expand: "Expand",
    collapse: "Collapse",
    countUnit: "items",
    totalPrefix: "Total",
    selectedSuffix: " selected",
  },
  date: {
    datePlaceholder: "Select date",
    rangePlaceholder: "Select period",
    dateTimePlaceholder: "Select date and time",
    monthPlaceholder: "Select month",
    hour: "Hour",
    minute: "Minute",
    previousYear: "Previous year",
    nextYear: "Next year",
    startDate: "Select start date",
    endDate: "Select end date",
    startLabel: "Start date",
    endLabel: "End date",
    year: (year) => `${year}`,
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  period: {
    today: "Today",
    last7: "Last 7 days",
    last30: "Last 30 days",
    custom: "Custom",
  },
  relativeTime: {
    justNow: "Just now",
    seconds: (count) => `${count}s ago`,
    minutes: (count) => `${count}m ago`,
    hours: (count) => `${count}h ago`,
    days: (count) => `${count}d ago`,
    months: (count) => `${count}mo ago`,
    years: (count) => `${count}y ago`,
  },
  fileUpload: {
    tooLarge: (fileName) => `${fileName}: file is too large`,
    invalidType: (fileName) => `${fileName}: unsupported file type`,
    tooMany: "Too many files",
    failed: (fileName) => `${fileName}: upload failed`,
    removeFile: (fileName) => `Remove ${fileName}`,
    dropHint: "Drag files here or click to upload",
    limits: (maxFiles, maxSizeMb) => `Up to ${maxFiles} files, ${maxSizeMb}MB each`,
  },
  pagination: {
    label: "Pagination",
    previous: "Previous",
    next: "Next",
    page: (page) => `Page ${page}`,
  },
  stepper: {
    label: "Progress",
    complete: "Done",
    stateDone: "completed",
    stateCurrent: "current",
    stateUpcoming: "not started",
    step: (index, step, state) => `Step ${index}: ${step} (${state})`,
  },
  tagInput: {
    placeholder: "Type and press Enter or +",
    clearAll: (count) => `Clear all (${count})`,
    patternError: "Contains an unsupported character.",
    duplicateError: "Already added.",
    maxLengthError: (maxLength) => `Up to ${maxLength} characters.`,
    lengthExceeded: "Input length exceeded.",
  },
  statCard: {
    deltaCaption: "vs. previous period",
  },
};

export const messagesByLocale: Record<UiKitLocale, UiKitMessages> = { ko, en };
