import { create } from 'zustand';

type ViewMode = 'mobile' | 'web';

interface BaseSlice<State, Action> {
  state: State;
  actions: Action;
}

interface ViewportState {
  width: number;
  mode: ViewMode;
}

interface ViewportActions {
  setWidth: (width: number) => void;
  setMode: (mode: ViewMode) => void;
}

type ViewportSlice = BaseSlice<ViewportState, ViewportActions>;

const ViewportSlice = create<ViewportSlice>((set) => ({
  state: {
    mode: 'web',
    width: 1920,
  },
  actions: {
    setWidth: (width) =>
      set((store) => ({
        state: { ...store.state, width },
      })),
    setMode: (mode) =>
      set((store) => ({
        state: { ...store.state, mode },
      })),
  },
}));

export default ViewportSlice;
