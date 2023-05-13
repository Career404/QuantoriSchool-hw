import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface DailyStore {
	lastShown: number;
	//preferences: Record<string, any>;
}

const initialState: DailyStore = {
	lastShown: 0,
	/* preferences: {
		show: true,
		showAsModal: true,
		showAt: [],
	}, */
};
//
export const createDailySlice = (
	sliceName: string,
	initialState: DailyStore
) => {
	return createSlice({
		name: sliceName,
		initialState,
		reducers: {
			updateDailyLastShown: (
				state,
				action: PayloadAction<{ lastShown: number; isPrivate: boolean }>
			) => {
				if (action.payload.isPrivate) {
					state.lastShown = action.payload.lastShown;
				} else {
					state.lastShown = action.payload.lastShown;
				}
			},
			//preferences:()=>{}
		},
	});
};

const dailyByName: any = {};

export const updateDailyLastShown = (dailyName: string) =>
	dailyByName[dailyName].actions.updateDailyLastShown;

const createDaily = (name: string, initialState: DailyStore) => {
	const slice = createDailySlice(name, initialState);
	dailyByName[name] = {
		actions: slice.actions,
	};
	return slice;
};
export const dailySlice = createDaily('daily', initialState);
export const privateDailySlice = createDaily('privateDaily', initialState);

export const selectDailyLastShown =
	(dailyName: 'daily' | 'privateDaily') => (state: RootState) =>
		state[dailyName].lastShown;
