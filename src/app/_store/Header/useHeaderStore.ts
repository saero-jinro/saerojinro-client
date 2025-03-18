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

interface MobileNavOpenState {
  isOpen: boolean;
}

interface MobileNavOpenAction {
  setOpen: () => void;
  setClose: () => void;
}

type HeaderSlice = {
  viewport: BaseSlice<ViewportState, ViewportActions>;
  mobileNavOpen: BaseSlice<MobileNavOpenState, MobileNavOpenAction>;
};

// 해더 스토어
const useHeaderStore = create<HeaderSlice>((set) => ({
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
  mobileNavOpen: {
    state: {
      isOpen: false,
    },
    actions: {
      setOpen() {
        set(
          produce<HeaderSlice>((store) => {
            store.mobileNavOpen.state.isOpen = true;
          }),
        );
      },
      setClose() {
        set(
          produce<HeaderSlice>((store) => {
            store.mobileNavOpen.state.isOpen = false;
          }),
        );
      },
    },
  },
}));

export default useHeaderStore;
