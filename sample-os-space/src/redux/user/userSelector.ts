import { RootState } from '../store';

const selectSelf = (state: RootState) => state.user;
export const selectUser = (state: RootState) => selectSelf(state).user;
