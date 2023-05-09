import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import tasksReducer from './tasks';
import dailyReducer from './daily';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		daily: dailyReducer,
	},
	enhancers: (defaultEnhancers) =>
		defaultEnhancers.prepend(offline(offlineConfig) as StoreEnhancer),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
