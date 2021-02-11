import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';

import { checkIfDayToday } from '@/services/date.service';
import { fonts } from '@/styles/fonts';
import { themeColors } from '@/styles/colors';
import { alignCenter } from '@/styles/mixins';

import { getDayType, getWeekDayName, DayTypeEnum, isActiveDay } from '../../week.date.service';

interface WeekDayProps {
  weekDay: Date;
  selectedWeekDay: string;
  selectWeekDay: (day: string) => void;
}

export const BUTTON_SIZE = 52;

const setBackgroundAndTextColors = (weekDay: string) => {
  const type = getDayType(weekDay);
  return {
    [DayTypeEnum.Previous]: [styles.previousBorderColor, styles.previousTextColor],
    [DayTypeEnum.Today]: [styles.todayBorderColor, styles.todayTextColor],
    [DayTypeEnum.Future]: [styles.futureBorderColor, styles.futureTextColor],
  }[type];
};

export const WeekDay: React.FC<WeekDayProps> = ({ weekDay, selectedWeekDay, selectWeekDay }) => {
  const day = weekDay.toString();
  const date = weekDay.getDate();
  const [borderColor, textColor] = setBackgroundAndTextColors(day);
  const isActive = isActiveDay(selectedWeekDay, day);

  const setWeekDay = () => selectWeekDay(day);

  return (
    <TouchableWithoutFeedback onPress={setWeekDay}>
      <View
        style={[
          styles.day,
          isActive ? (styles.activeBorderColor as ViewStyle) : (borderColor as ViewStyle),
          checkIfDayToday(day) && styles.todayBgColor,
        ]}
      >
        <Text style={[styles.text, textColor, isActive && styles.activeTextColor]}>
          {getWeekDayName(day)}
        </Text>
        <Text style={[styles.text, styles.textDate, textColor, isActive && styles.activeTextColor]}>
          {date}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  day: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    ...alignCenter,
  },
  text: {
    fontFamily: fonts.main.regular,
    fontSize: 12,
    letterSpacing: 1,
  },
  previousTextColor: {
    color: themeColors.week.text.previous,
  },
  previousBorderColor: {
    borderColor: themeColors.week.borders.previous,
  },
  todayTextColor: {
    color: themeColors.week.text.today,
  },
  todayBgColor: {
    backgroundColor: themeColors.week.bg.today,
  },
  todayBorderColor: {
    borderColor: themeColors.week.borders.today,
  },
  futureBorderColor: {
    borderColor: themeColors.week.borders.future,
  },
  futureTextColor: {
    color: themeColors.week.text.future,
  },
  activeBorderColor: {
    borderColor: themeColors.week.borders.active,
  },
  activeTextColor: {
    color: themeColors.week.text.active,
  },
  textDate: {
    fontFamily: fonts.main.bold,
    fontSize: 14,
  },
  background: {
    ...(StyleSheet.absoluteFill as object),
  },
});
