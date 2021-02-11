import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { themeColors } from '@/styles/colors';

import { getPrevDay, getNextDay } from './../../week.date.service';

interface WeekDayArrowsProps {
  weekDay: string;
  selectWeekDay: (weekDay: string) => void;
}

const BUTTON_SIZE = 24;
const BUTTON_INDENT = 5;

export const WeekDayArrows: React.FC<WeekDayArrowsProps> = ({ selectWeekDay, weekDay }) => {
  const setPrevDay = () => selectWeekDay(getPrevDay(weekDay));

  const setNextDay = () => selectWeekDay(getNextDay(weekDay));

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setPrevDay}>
        <View style={styles.button}>
          <Icon name="chevron-back-outline" size={BUTTON_SIZE} color={themeColors.text} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={setNextDay} style={styles.button}>
        <View style={styles.button}>
          <Icon name="chevron-forward-outline" size={BUTTON_SIZE} color={themeColors.text} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: -BUTTON_INDENT,
  },
  button: {
    padding: BUTTON_INDENT,
  },
});
