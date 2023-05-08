import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from './tasks';
import dailyReducer from './daily';

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		privateTasks: tasksReducer,
		daily: dailyReducer,
		privateDaily: dailyReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
