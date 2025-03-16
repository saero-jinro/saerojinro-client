import { BaseSlice } from '@/_types/store';
import { create } from 'zustand';
import { produce } from 'immer';

export type ViewMode = 'mobile' | 'web';

interface ViewportState {
  width: number;
  mode: ViewMode;
}

interface ViewportActions {
  setWidth: (width: number) => void;
  setMode: (mode: ViewMode) => void;
}

type HeaderSlice = BaseSlice<ViewportState, ViewportActions>;

// 해더 스토어
const useHeaderStore = create<HeaderSlice>((set) => ({
  state: {
    mode: 'web',
    width: 1920,
  },
  actions: {
    setWidth(width: number) {
      set(
        produce<HeaderSlice>((store) => {
          store.state.width = width;
        }),
      );
    },
    setMode(mode: ViewMode) {
      set(
        produce<HeaderSlice>((store) => {
          store.state.mode = mode;
        }),
      );
    },
  },
}));

export default useHeaderStore;
