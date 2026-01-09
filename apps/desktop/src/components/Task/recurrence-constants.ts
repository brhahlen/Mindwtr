import type { RecurrenceWeekday } from '@mindwtr/core';

export const WEEKDAY_ORDER: RecurrenceWeekday[] = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export const WEEKDAY_FULL_LABELS: Record<RecurrenceWeekday, string> = {
    SU: 'Sunday',
    MO: 'Monday',
    TU: 'Tuesday',
    WE: 'Wednesday',
    TH: 'Thursday',
    FR: 'Friday',
    SA: 'Saturday',
};
