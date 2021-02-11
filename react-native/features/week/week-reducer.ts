export const SELECT_WEEK_DAY = 'selectWeekDay';

export interface State {
  selectedWeekDay: string;
}

export const initialState: State = {
  selectedWeekDay: new Date().toString(),
};

export interface SelectWeekDayAction {
  type: typeof SELECT_WEEK_DAY;
  weekDay: string;
}

export type Action = SelectWeekDayAction;

export const selectWeekDay = (state: State, action: SelectWeekDayAction): State => ({
  ...state,
  selectedWeekDay: action.weekDay,
});

export const weekReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SELECT_WEEK_DAY:
      return selectWeekDay(state, action);
    default:
      return state;
  }
};
