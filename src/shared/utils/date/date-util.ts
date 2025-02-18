import type { ConfigType } from 'dayjs';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import calendarPlugin from './calendarPlugin';

export type DateUtilInput = ConfigType;

export const DateUtil = dayjs;

DateUtil.extend(timezone);
DateUtil.extend(relativeTime);
DateUtil.extend(calendarPlugin);
DateUtil.extend(localizedFormat);
DateUtil.extend(duration);
DateUtil.extend(utc);

export const getViewerTimezone = () => DateUtil.tz.guess();

export const getDateValueFormat = () => `YYYY-MM-DD[T]HH:mm:ss.SSS[[${getViewerTimezone()}]]`;
