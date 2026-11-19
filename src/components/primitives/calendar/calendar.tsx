"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import {
  type CustomComponents,
  type DayButton,
  DayPicker,
  getDefaultClassNames,
  type Locale,
  useDayPicker,
} from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { useUiKitMessages } from "../../../locale";
import { cn } from "../../../utils/cn";

const CELL_SIZE = 32;

const NAV_BTN_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: CELL_SIZE,
  height: CELL_SIZE,
  flexShrink: 0,
  border: "none",
  background: "none",
  padding: 0,
  borderRadius: "var(--token-radius-xxs)",
  color: "var(--token-color-text-primary)",
  cursor: "pointer",
};

function CalendarMonthCaption({ calendarMonth }: { calendarMonth: { date: Date } }) {
  const locale = React.useContext(CalendarLocaleContext);
  const { goToMonth, previousMonth, nextMonth } = useDayPicker();
  const t = useUiKitMessages();

  const label = calendarMonth.date.toLocaleString(locale?.code ?? "ko", {
    year: "numeric",
    month: "long",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: CELL_SIZE,
        gap: 13,
      }}
    >
      <button
        type="button"
        className="focus-ring"
        aria-label={t.date.previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        style={{
          ...NAV_BTN_STYLE,
          opacity: !previousMonth ? 0.5 : 1,
          cursor: !previousMonth ? "default" : "pointer",
        }}
      >
        <ChevronLeftIcon style={{ width: 16, height: 16 }} />
      </button>
      <span
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "var(--token-color-text-primary)",
          userSelect: "none",
        }}
      >
        {label}
      </span>
      <button
        type="button"
        className="focus-ring"
        aria-label={t.date.nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        style={{
          ...NAV_BTN_STYLE,
          opacity: !nextMonth ? 0.5 : 1,
          cursor: !nextMonth ? "default" : "pointer",
        }}
      >
        <ChevronRightIcon style={{ width: 16, height: 16 }} />
      </button>
    </div>
  );
}

/**
 * DayPicker 의 components 는 모듈 스코프에 둔다. 렌더마다 새 함수를 넘기면 react-day-picker 가
 * 컴포넌트 타입이 바뀐 것으로 보고 트리 전체를 재마운트한다(hover·포커스 초기화). locale 은 context 로 전달.
 */
const CalendarLocaleContext = React.createContext<Partial<Locale>>(ko);

const CALENDAR_COMPONENTS: Partial<CustomComponents> = {
  Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
    <div data-slot="calendar" ref={rootRef} className={cn(rootClassName)} {...rootProps} />
  ),
  Nav: () => <></>,
  CaptionLabel: () => <></>,
  MonthCaption: ({ calendarMonth }) => <CalendarMonthCaption calendarMonth={calendarMonth} />,
  Weekday: ({ children, ...weekdayProps }) => (
    <th
      {...weekdayProps}
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "var(--token-color-text-tertiary)",
          fontWeight: "normal",
        }}
      >
        {children}
      </div>
    </th>
  ),
  DayButton: (dayButtonProps) => <CalendarDayButton {...dayButtonProps} />,
  WeekNumber: ({ children, ...weekNumberProps }) => (
    <td {...weekNumberProps}>
      <div
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "var(--token-color-text-tertiary)",
        }}
      >
        {children}
      </div>
    </td>
  ),
};

const {
  MonthCaption: _monthCaption,
  Nav: _nav,
  CaptionLabel: _captionLabel,
  ...CALENDAR_COMPONENTS_FOR_DROPDOWN
} = CALENDAR_COMPONENTS;

// dropdown 캡션 전용 — rdp 기본 스타일시트가 없어 select 를 라벨 위에 투명하게 겹치고 nav 를 캡션 양끝에 둔다

const DROPDOWN_NAV_BUTTON =
  "focus-ring inline-flex size-8 items-center justify-center rounded-[var(--token-radius-xxs)] text-[var(--token-color-text-primary)] hover:bg-[var(--token-color-action-tertiary-hover)] disabled:cursor-default disabled:opacity-50 [&>svg]:size-4 [&>svg]:fill-current";

const DROPDOWN_CLASS_NAMES = {
  months: "relative",
  nav: "absolute inset-x-0 top-0 z-10 flex h-8 items-center justify-between",
  button_previous: DROPDOWN_NAV_BUTTON,
  button_next: DROPDOWN_NAV_BUTTON,
  month_caption: "flex h-8 w-full items-center justify-center",
  dropdowns: "flex items-center gap-1",
  dropdown_root:
    "relative inline-flex items-center rounded-[var(--token-radius-xxs)] hover:bg-[var(--token-color-action-tertiary-hover)] has-[select:focus-visible]:outline-2 has-[select:focus-visible]:outline-offset-2 has-[select:focus-visible]:outline-solid has-[select:focus-visible]:outline-[color:var(--color-border-focus)]",
  dropdown: "absolute inset-0 z-10 cursor-pointer opacity-0",
  caption_label:
    "inline-flex h-8 select-none items-center gap-0.5 px-1.5 typography-label-md-bold text-[var(--token-color-text-primary)] [&>svg]:size-3.5 [&>svg]:fill-current",
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale: localeProp,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const locale = localeProp ?? ko;
  const defaultClassNames = getDefaultClassNames();
  const isDropdown = captionLayout !== "label";
  const dropdownCn = (key: keyof typeof DROPDOWN_CLASS_NAMES) =>
    isDropdown ? DROPDOWN_CLASS_NAMES[key] : undefined;

  return (
    <CalendarLocaleContext.Provider value={locale}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("group/calendar", className)}
        style={{
          padding: "8px 4px",
          backgroundColor: "var(--token-color-surface-default)",
        }}
        captionLayout={captionLayout}
        locale={locale}
        formatters={{
          formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
          ...formatters,
        }}
        classNames={{
          root: cn("w-fit", defaultClassNames.root),
          months: cn(
            "flex flex-col gap-4 md:flex-row",
            dropdownCn("months"),
            defaultClassNames.months,
          ),
          month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
          nav: cn(dropdownCn("nav"), defaultClassNames.nav),
          button_previous: cn(dropdownCn("button_previous"), defaultClassNames.button_previous),
          button_next: cn(dropdownCn("button_next"), defaultClassNames.button_next),
          month_caption: cn(
            "flex w-full",
            dropdownCn("month_caption"),
            defaultClassNames.month_caption,
          ),
          dropdowns: cn(dropdownCn("dropdowns"), defaultClassNames.dropdowns),
          dropdown_root: cn(dropdownCn("dropdown_root"), defaultClassNames.dropdown_root),
          dropdown: cn(dropdownCn("dropdown"), defaultClassNames.dropdown),
          caption_label: cn(dropdownCn("caption_label"), defaultClassNames.caption_label),
          table: "w-full border-collapse",
          weekdays: cn("flex", defaultClassNames.weekdays),
          weekday: cn("select-none", defaultClassNames.weekday),
          week: cn("flex mt-1", defaultClassNames.week),
          week_number_header: cn("select-none", defaultClassNames.week_number_header),
          week_number: cn("text-xs select-none", defaultClassNames.week_number),
          day: cn("group/day relative p-0 text-center select-none", defaultClassNames.day),
          range_start: cn(defaultClassNames.range_start),
          range_middle: cn(defaultClassNames.range_middle),
          range_end: cn(defaultClassNames.range_end),
          today: cn(defaultClassNames.today),
          outside: cn(defaultClassNames.outside),
          disabled: cn(defaultClassNames.disabled),
          hidden: cn("invisible", defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          // 커스텀 캡션은 label 레이아웃용 — dropdown 이면 react-day-picker 기본 캡션·드롭다운을 쓴다
          ...(captionLayout === "label" ? CALENDAR_COMPONENTS : CALENDAR_COMPONENTS_FOR_DROPDOWN),
          ...components,
        }}
        {...props}
      />
    </CalendarLocaleContext.Provider>
  );
}

function CalendarDayButton({
  day,
  modifiers,
  style: _propsStyle,
  className,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const locale = React.useContext(CalendarLocaleContext);
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelectedSingle =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;
  const isActive = isSelectedSingle || modifiers.range_start || modifiers.range_end;
  const isToday = modifiers.today && !modifiers.selected;

  const bgColor = isActive
    ? "var(--token-color-surface-brand-default)"
    : isToday || modifiers.range_middle
      ? "var(--token-color-surface-brand-subtle)"
      : "transparent";

  const textColor = isActive
    ? "var(--color-interactive-primary-text)"
    : modifiers.outside && !modifiers.selected
      ? "var(--token-color-text-tertiary)"
      : "var(--token-color-text-primary)";

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive && !isToday && !modifiers.range_middle && !modifiers.disabled) {
      e.currentTarget.style.backgroundColor = "var(--token-color-action-tertiary-hover)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive && !isToday && !modifiers.range_middle) {
      e.currentTarget.style.backgroundColor = bgColor;
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={isSelectedSingle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      disabled={modifiers.disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        padding: 0,
        borderRadius: "var(--token-radius-xxs)",
        backgroundColor: bgColor,
        color: textColor,
        fontSize: "12px",
        fontWeight: isActive ? "bold" : "normal",
        cursor: modifiers.disabled ? "not-allowed" : "pointer",
        opacity: modifiers.disabled ? 0.5 : 1,
        transition: "background-color 0.15s",
      }}
      {...props}
      // react-day-picker 가 넘기는 className(rdp-day_button)에 덮이지 않도록 spread 뒤에서 합친다
      className={cn("focus-ring", className)}
    />
  );
}

export { Calendar, CalendarDayButton };
