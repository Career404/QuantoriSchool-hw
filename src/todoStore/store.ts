import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dailySlice, privateDailySlice } from './daily';
import { tasksSlice, privateTasksSlice } from './tasks';

import storage from 'redux-persist/lib/storage';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
	tasks: tasksSlice.reducer,
	privateTasks: privateTasksSlice.reducer,
	daily: dailySlice.reducer,
	privateDaily: privateDailySlice.reducer,
});

const persistConfig = {
	key: 'ToDo',
	storage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedRootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
