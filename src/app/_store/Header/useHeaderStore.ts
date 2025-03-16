import { Alarm } from '@/_types/Header/Alarm.type';
import { produce } from 'immer';
import { create } from 'zustand';

/** -------type------- **/
//#region

type ViewMode = 'mobile' | 'web';

interface ViewportState {
  width: number;
  mode: ViewMode;
}

interface ViewportActions {
  setWidth: (width: number) => void;
  setMode: (mode: ViewMode) => void;
}

export type AlarmView = Alarm & { time: string };

interface AlarmState {
  alarms: AlarmView[];
}

interface AlarmActions {
  addAlarm: (alarm: Alarm) => void;
}

//------------------total------------------
interface BaseSlice<State, Action> {
  state: State;
  actions: Action;
}

export interface HeaderSlice {
  viewport: BaseSlice<ViewportState, ViewportActions>;
  alarm: BaseSlice<AlarmState, AlarmActions>;
}

//#endregion

const useHeaderSlice = create<HeaderSlice>((set) => ({
  viewport: {
    state: {
      mode: 'web',
      width: 1920,
    },
    actions: {
      setWidth(width: number) {
        set(
          produce<HeaderSlice>((store) => {
            store.viewport.state.width = width;
          }),
        );
      },
      setMode(mode: ViewMode) {
        set(
          produce<HeaderSlice>((store) => {
            store.viewport.state.mode = mode;
          }),
        );
      },
    },
  },
  alarm: {
    state: {
      alarms: [],
    },
    actions: {
      addAlarm(alarm) {
        set(
          produce<HeaderSlice>((store) => {
            store.alarm.state.alarms.push({ ...alarm, time: new Date().toISOString() });
          }),
        );
      },
    },
  },
}));

export default useHeaderSlice;
