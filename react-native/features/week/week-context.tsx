import React, { Dispatch, ReactNode, FunctionComponent } from 'react';

import { weekReducer, initialState, State, Action } from './week-reducer';

const WeekStateContext = React.createContext<State | undefined>(undefined);
const WeekDispatchContext = React.createContext<Dispatch<Action> | undefined>(undefined);

const WeekProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(weekReducer, initialState);

  return (
    <WeekStateContext.Provider value={state}>
      <WeekDispatchContext.Provider value={dispatch}>{children}</WeekDispatchContext.Provider>
    </WeekStateContext.Provider>
  );
};

const useWeekState = (): State => {
  const context = React.useContext(WeekStateContext);

  if (!context) {
    throw new Error('useWeekState must be used with WeekStateContext');
  }

  return context;
};

const useWeekDispatch = (): Dispatch<Action> => {
  const context = React.useContext(WeekDispatchContext);

  if (!context) {
    throw new Error('useWeekDispatch must be used with WeekDispatchContext');
  }

  return context;
};

const useWeek = (): [State, Dispatch<Action>] => [useWeekState(), useWeekDispatch()];

export { WeekProvider, useWeekState, useWeekDispatch, useWeek };
