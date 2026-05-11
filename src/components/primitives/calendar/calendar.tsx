"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import {
  type DayButton,
  DayPicker,
  getDefaultClassNames,
  type Locale,
  useDayPicker,
} from "react-day-picker";
import { ko } from "react-day-picker/locale";
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

function CalendarMonthCaption({
  calendarMonth,
  locale,
}: {
  calendarMonth: { date: Date };
  locale?: Partial<Locale>;
}) {
  const { goToMonth, previousMonth, nextMonth } = useDayPicker();

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

  return (
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
        months: cn("flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
        nav: defaultClassNames.nav,
        month_caption: cn("flex w-full", defaultClassNames.month_caption),
        caption_label: defaultClassNames.caption_label,
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
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(rootClassName)} {...rootProps} />
        ),
        Nav: () => <></>,
        CaptionLabel: () => <></>,
        MonthCaption: ({ calendarMonth }) => (
          <CalendarMonthCaption calendarMonth={calendarMonth} locale={locale} />
        ),
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
        DayButton: ({ ...dayButtonProps }) => (
          <CalendarDayButton locale={locale} {...dayButtonProps} />
        ),
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
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  day,
  modifiers,
  locale,
  style: _propsStyle,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
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
    ? "var(--token-color-text-inverse)"
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
        outline: "none",
        transition: "background-color 0.15s",
      }}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
