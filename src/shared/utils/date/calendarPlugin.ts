import type { DayjsCalendar } from './types';
import type { ConfigType, PluginFunc } from 'dayjs';

const calendarPlugin: PluginFunc<unknown> = (_o, c, d) => {
  const LT = 'h:mm A';
  const L = 'MM/DD/YYYY';
  const L_YEAR = 'MMM D';
  const calendarFormat: DayjsCalendar = {
    lastDay: `[Yesterday at] ${LT}`,
    sameDay: `[Today at] ${LT}`,
    nextDay: `[Tomorrow at] ${LT}`,
    nextWeek: `dddd [at] ${LT}`,
    lastWeek: `[Last] dddd [at] ${LT}`,
    sameYear: L_YEAR,
    sameElse: L,
  };

  const proto = c.prototype;

  proto.calendar = function (referenceTime: ConfigType, formats: unknown) {
    // @ts-expect-error - TS doesn't know about the plugin
    const format = formats || this.$locale().calendar || calendarFormat;
    const referenceStartOfDay = d(referenceTime || undefined).startOf('d');
    const diff = this.diff(referenceStartOfDay, 'd', true);
    const isSameYear = this.year() === referenceStartOfDay.year();
    const sameElse = 'sameElse';

    let output: keyof DayjsCalendar = 'sameElse';

    switch (true) {
      case diff < -6:
        if (isSameYear) {
          output = 'sameYear';
          break;
        }
        break;
      case diff < -1:
        output = 'lastWeek';
        break;
      case diff < 0:
        output = 'lastDay';
        break;
      case diff < 1:
        output = 'sameDay';
        break;
      case diff < 2:
        output = 'nextDay';
        break;
      case diff < 7:
        output = 'nextWeek';
        break;
      case isSameYear:
        output = 'sameYear';
        break;
      default:
        output = sameElse;
    }

    const currentFormat = format[output] || calendarFormat[output];

    if (typeof currentFormat === 'function') {
      return currentFormat.call(this, d());
    }

    return this.format(currentFormat);
  };
};

export default calendarPlugin;
