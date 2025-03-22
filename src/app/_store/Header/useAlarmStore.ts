import { Alarm } from '@/_types/Header/Alarm.type';
import { BaseSlice } from '@/_types/store';
import { create } from 'zustand';
import { produce } from 'immer';

interface AlarmState {
  alarms: Alarm[];
}

interface AlarmActions {
  addAlarm: (alarm: Alarm) => void;
  resetAlarm: () => void;
  loadInitAlarms: (alarms: Alarm[]) => void;
}

interface IsSubscribeState {
  isSubscribe: boolean;
}

interface IsSubscribeActions {
  setSubscribe: (state: boolean) => void;
}

interface IsOpenState {
  isOpen: boolean;
}

interface IsOpenActions {
  setIsOpen: (state: boolean) => void;
}

type AlarmSlice = {
  alarms: BaseSlice<AlarmState, AlarmActions>;
  isOpen: BaseSlice<IsOpenState, IsOpenActions>;
  isSubscribe: BaseSlice<IsSubscribeState, IsSubscribeActions>;
};

const useAlarmStore = create<AlarmSlice>()((set) => ({
  alarms: {
    state: { alarms: [] },
    actions: {
      addAlarm(alarm) {
        set(
          produce((store: AlarmSlice) => {
            store.alarms.state.alarms.push({ ...alarm });
          }),
        );
      },
      resetAlarm() {
        set(
          produce((store: AlarmSlice) => {
            store.alarms.state.alarms = [];
          }),
        );
      },
      loadInitAlarms(alarms) {
        set(
          produce((store: AlarmSlice) => {
            store.alarms.state.alarms = [...alarms];
          }),
        );
      },
    },
  },
  isOpen: {
    state: { isOpen: false },
    actions: {
      setIsOpen(state) {
        set(
          produce((store: AlarmSlice) => {
            store.isOpen.state.isOpen = state;
          }),
        );
      },
    },
  },
  isSubscribe: {
    state: { isSubscribe: false },
    actions: {
      setSubscribe(state) {
        set(
          produce((store: AlarmSlice) => {
            store.isSubscribe.state.isSubscribe = state;
          }),
        );
      },
    },
  },
}));

export default useAlarmStore;
