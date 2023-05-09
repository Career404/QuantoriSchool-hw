import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

//! add typing to prefernces

interface DailyStore {
	lastShown: number;
	preferences: Record<string, any>;
}

const initialState: { server: DailyStore; private: DailyStore } = {
	server: {
		lastShown: 0,
		preferences: {
			show: true,
			showAsModal: true,
			showAt: [],
		},
	},
	private: {
		lastShown: 0,
		preferences: {
			show: true,
			showAsModal: true,
			showAt: [],
		},
	},
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		updateDailyLastShown: (
			state,
			action: PayloadAction<{ lastShown: number; isPrivate: boolean }>
		) => {
			if (action.payload.isPrivate) {
				state.private.lastShown = action.payload.lastShown;
			} else {
				state.server.lastShown = action.payload.lastShown;
			}
		},
	},
});
export const selectDailyLastShown = (state: RootState) =>
	state.daily.server.lastShown;
export const selectDailyPreferences = (state: RootState) =>
	state.daily.server.preferences;
export const selectDailyLastShownPrivate = (state: RootState) =>
	state.daily.private.lastShown;
export const selectDailyPreferencesPrivate = (state: RootState) =>
	state.daily.private.preferences;

export const { updateDailyLastShown } = tasksSlice.actions;
export default tasksSlice.reducer;
