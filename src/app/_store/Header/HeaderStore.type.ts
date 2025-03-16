import { Alarm } from '@/_types/Header/Alarm.type';

type ViewMode = 'mobile' | 'web';

interface ViewportState {
  width: number;
  mode: ViewMode;
}

interface ViewportActions {
  setWidth: (width: number) => void;
  setMode: (mode: ViewMode) => void;
}

interface BaseSlice<State, Action> {
  state: State;
  actions: Action;
}

// -----------------------------------
export type AlarmView = Alarm & { time: string };

interface AlarmState {
  alrams: AlarmView;
}

interface AlarmActions {
  addAlarm: (alarm: Alarm) => void;
}

//------------------------------------

export interface HeaderSlice {
  viewport: BaseSlice<ViewportState, ViewportActions>;
  alarm: BaseSlice<AlarmState, AlarmActions>;
}
