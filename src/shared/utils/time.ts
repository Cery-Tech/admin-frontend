import type { Duration } from 'dayjs/plugin/duration';

export const Milliseconds = {
  seconds: (seconds = 0) => seconds * 1000,
  minutes: (minutes = 0) => minutes * 60 * 1000,
  hours: (hours = 0) => hours * 60 * 60 * 1000,
};

export function createDurationString(duration: Duration, options?: { withSeconds: boolean }) {
  const totalSeconds = duration.asSeconds();

  const totalMinutes = duration.asMinutes();

  if (!options?.withSeconds && totalMinutes === 0) {
    return '';
  }

  if (options?.withSeconds && totalSeconds === 0) {
    return '';
  }

  const seconds = duration.seconds();

  const hours = duration.hours();
  const days = Math.floor(duration.asDays());
  const minutes = duration.minutes();

  const showSeconds = options?.withSeconds && (seconds || minutes || hours || days);

  return `${+days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${minutes ? `${minutes}min` : ''}${showSeconds ? ` ${String(seconds).padStart(2, '0')}s` : ''}`;
}
