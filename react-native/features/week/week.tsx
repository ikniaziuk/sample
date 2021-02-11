import React from 'react';
import { View, StyleSheet } from 'react-native';

import { checkIfDayAfter } from '@/services/date.service';
import { SCREEN_PADDING } from '@/styles/mixins';

import { WeekDayList } from './components/week-day-list';
import { WeekCurrentDayTitle } from './components/week-current-day-title';
import { WeekDayArrows } from './components/week-day-arrows';
import { SELECT_WEEK_DAY } from './week-reducer';
import { useWeek } from './week-context';
import { getDaysOfWeek } from './week.date.service';

export const Week = () => {
  const [{ selectedWeekDay }, dispatch] = useWeek();
  const weekDays = getDaysOfWeek();

  const setWeekDay = (weekDay: string) => dispatch({ type: SELECT_WEEK_DAY, weekDay });

  const selectWeekDay = (weekDay: string): void => {
    if (!checkIfDayAfter(weekDay)) {
      setWeekDay(weekDay);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <WeekCurrentDayTitle weekDay={selectedWeekDay} />
        <WeekDayArrows selectWeekDay={selectWeekDay} weekDay={selectedWeekDay} />
      </View>
      <WeekDayList
        weekDays={weekDays}
        selectedWeekDay={selectedWeekDay}
        selectWeekDay={selectWeekDay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -SCREEN_PADDING,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 8,
  },
});
