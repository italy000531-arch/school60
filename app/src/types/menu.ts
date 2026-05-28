export interface MenuItem {
  date: number;
  weekday: string;
  weekdayEn: string;
  isHoliday: boolean;
  breakfast: string;
  lunch: {
    staple: string;
    main: string;
    side1: string;
    side2: string;
    soup: string;
    fruit: string;
  };
  afternoon: string;
  specialNote?: string;
}
