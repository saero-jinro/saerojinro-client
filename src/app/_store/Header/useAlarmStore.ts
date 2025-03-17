import { createJSONStorage, persist } from 'zustand/middleware';
import { Alarm } from '@/_types/Header/Alarm.type';
import { BaseSlice } from '@/_types/store';
import { create } from 'zustand';
import { produce } from 'immer';

export type AlarmView = Alarm & { time: string };

export interface AlarmState {
  alarms: AlarmView[];
}

export interface AlarmActions {
  addAlarm: (alarm: Alarm) => void;
  resetAlarm: () => void;
}

type AlarmSlice = BaseSlice<AlarmState, AlarmActions>;

const useAlarmStore = create<AlarmSlice>()(
  persist(
    (set) => ({
      state: {
        alarms: [],
      },
      actions: {
        addAlarm(alarm) {
          set(
            produce((store: AlarmSlice) => {
              store.state.alarms.push({
                ...alarm,
                time: new Date().toISOString(),
              });
            }),
          );
        },
        resetAlarm() {
          set(
            produce((store: AlarmSlice) => {
              store.state.alarms = [];
            }),
          );
        },
      },
    }),
    {
      name: 'alarm-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAlarmStore;
