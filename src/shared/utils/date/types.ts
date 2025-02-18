export type DayjsCalendar = {
  // The same day ( Today at 2:30 AM )
  sameDay: string;
  // The next day ( Tomorrow at 2:30 AM )
  nextDay: string;
  // The next week ( Sunday at 2:30 AM )
  nextWeek: string;
  // The day before ( Yesterday at 2:30 AM )
  lastDay: string;
  // Last week ( Last Monday at 2:30 AM )
  lastWeek: string;
  // Same year ( 10/10 )
  sameYear: string;
  // Everything else ( 17/10/2011 )
  sameElse: string;
};
