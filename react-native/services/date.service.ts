import {
  isEqual,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday,
  isAfter,
  isBefore,
  addDays,
  isThursday,
  startOfDay,
} from 'date-fns';

interface weekOptionsType {
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const weekOptions: weekOptionsType = { weekStartsOn: 1 };

export enum DayTypeEnum {
  Previous = 'previous',
  Today = 'today',
  Future = 'future',
}

export const getDaysOfWeek = (): Date[] => {
  const today = new Date();
  const start = startOfWeek(today, weekOptions);
  const end = endOfWeek(today, weekOptions);
  return eachDayOfInterval({ start, end });
};

export const getWeekDayName = (weekDay: string): string => format(new Date(weekDay), 'E');

export const formatDate = (weekDay: string): string => format(new Date(weekDay), 'EEEE, d MMM');

export const getPrevDay = (date: string): string => {
  const today = new Date();
  const selectedDate = new Date(date);
  const firstDayOfWeek = startOfWeek(today, weekOptions);
  const previousDay = subDays(selectedDate, 1);
  const result = isBefore(previousDay, firstDayOfWeek) ? selectedDate : startOfDay(previousDay);
  return result.toString();
};

export const getNextDay = (date: string): string => {
  const today = new Date();
  const selectedDate = new Date(date);
  const nextDay = addDays(selectedDate, 1);
  const result = isAfter(nextDay, today) ? today : startOfDay(nextDay);
  return result.toString();
};

export const isSecondHalfOfWeek = (weekDay: Date = new Date()): boolean => {
  const firstDayOfWeek = startOfWeek(weekDay, weekOptions);
  const thursday = addDays(firstDayOfWeek, 3);
  return isThursday(weekDay) || isAfter(weekDay, thursday);
};

export const isActiveDay = (date: string, weekDay: string) => {
  const selectedDate = startOfDay(new Date(date));
  return isEqual(selectedDate, new Date(weekDay));
};

export const getDayType = (weekDay: string): DayTypeEnum => {
  const weekDayDate = new Date(weekDay);
  const today = new Date();

  if (isToday(weekDayDate)) {
    return DayTypeEnum.Today;
  }

  if (isBefore(weekDayDate, today)) {
    return DayTypeEnum.Previous;
  }

  return DayTypeEnum.Future;
};
