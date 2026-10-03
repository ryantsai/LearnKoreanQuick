const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

// Dates are class-local calendar dates, not timestamps. UTC keeps the displayed
// weekday independent of the learner's browser timezone.
export function formatCourseLabel({ name, sessionNumber, sessionCount, date }) {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Course metadata requires an official name.");
  }
  if (!Number.isInteger(sessionNumber) || !Number.isInteger(sessionCount)
    || sessionNumber < 1 || sessionCount < sessionNumber) {
    throw new Error("Course metadata requires a valid session number and count.");
  }
  if (typeof date !== "string" || !/^\d{8}$/.test(date)) {
    throw new Error("Course metadata requires a YYYYMMDD date.");
  }
  const calendarDate = new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T00:00:00Z`);
  if (Number.isNaN(calendarDate.getTime())
    || calendarDate.toISOString().slice(0, 10).replaceAll("-", "") !== date) {
    throw new Error("Course metadata requires a valid calendar date.");
  }
  return `${name.trim()}-${sessionNumber}/${sessionCount}堂-${date}(${weekdays[calendarDate.getUTCDay()]})`;
}

export function applyCourseMetadata(lesson, metadata) {
  // Missing evidence must keep the existing label, never an inferred name/date.
  if (metadata === undefined) return lesson;
  return { ...lesson, courseMetadata: metadata, label: formatCourseLabel(metadata) };
}
