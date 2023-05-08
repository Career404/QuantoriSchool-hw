import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

//! add typing

interface DailyStore {
	lastShown: string;
	preferences: Record<string, any>;
}

const initialState: DailyStore = {
	lastShown: '0',
	preferences: {
		show: true,
		showAsModal: true,
		showAt: [],
	},
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		updateDailyLastShown: (state, action: PayloadAction<string>) => {
			state.lastShown = action.payload;
		},
	},
});
export const selectDailyLastShown = (state: RootState) => state.daily.lastShown;
export const selectDailyPreferences = (state: RootState) =>
	state.daily.preferences;

export const { updateDailyLastShown } = tasksSlice.actions;
export default tasksSlice.reducer;
