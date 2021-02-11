import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { themeColors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

import { formatDate } from './../../week.date.service';

interface WeekCurrentDayTitleProps {
  weekDay: string;
}

export const WeekCurrentDayTitle: React.FC<WeekCurrentDayTitleProps> = ({ weekDay }) => (
  <Text style={styles.text}>{formatDate(weekDay)}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.main.bold,
    fontSize: 22,
    color: themeColors.text,
  },
});
