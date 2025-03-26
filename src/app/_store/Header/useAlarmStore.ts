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

interface IsNewMessageState {
  isNewMessage: boolean;
}

interface IsNewMessageActions {
  setNewMessageState: (state: boolean) => void;
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
  isNewMessage: BaseSlice<IsNewMessageState, IsNewMessageActions>;
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
  isNewMessage: {
    state: { isNewMessage: false },
    actions: {
      setNewMessageState(state: boolean) {
        set(
          produce((store: AlarmSlice) => {
            store.isNewMessage.state.isNewMessage = state;
          }),
        );
      },
    },
  },
}));

export default useAlarmStore;
