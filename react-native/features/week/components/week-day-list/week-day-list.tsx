import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { SCREEN_PADDING } from '@/styles/mixins';

import { WeekDay } from './../week-day';
import { isSecondHalfOfWeek } from './../../week.date.service';

interface WeekDayListProps {
  weekDays: Date[];
  selectedWeekDay: string;
  selectWeekDay: (weekDay: string) => void;
}

export const WeekDayList: React.FC<WeekDayListProps> = ({
  weekDays,
  selectedWeekDay,
  selectWeekDay,
}) => {
  const scrollListRef = React.useRef<ScrollView>(null);

  const scrollEndIfSecondHalfOfWeek = (): void => {
    if (isSecondHalfOfWeek()) {
      scrollListRef?.current?.scrollToEnd({ animated: true });
    }
  };

  React.useEffect(() => {
    const scrollList = scrollListRef?.current;
    return isSecondHalfOfWeek(new Date(selectedWeekDay))
      ? scrollList?.scrollToEnd({ animated: true })
      : scrollList?.scrollTo({ x: 0, y: 0, animated: true });
  }, [selectedWeekDay]);

  return (
    <ScrollView
      ref={scrollListRef}
      onContentSizeChange={scrollEndIfSecondHalfOfWeek}
      bounces={false}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToEnd={true}
      contentContainerStyle={styles.contentContainer}
    >
      {weekDays.map((day: Date) => (
        <WeekDay
          key={day.getDate()}
          weekDay={day}
          selectedWeekDay={selectedWeekDay}
          selectWeekDay={selectWeekDay}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: SCREEN_PADDING,
    paddingRight: 8,
    paddingVertical: 4,
  },
});
