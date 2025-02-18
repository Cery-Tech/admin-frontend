export {};
declare module 'dayjs' {
  interface Dayjs {
    calendar(referenceTime?: ConfigType, formats?: Partial<DayjsCalendar>): string;
  }
}
