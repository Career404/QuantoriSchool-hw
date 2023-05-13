import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	RouterProvider,
	createHashRouter,
	Navigate,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from '../../todoStore/store';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from './routes/Layout';
import Todo from '../../components/Todo/Todo';
import todoLoader from './loaders/todoLoader';
import { NotFound } from './routes/Error';

const router = createHashRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<NotFound />}>
			<Route index element={<Navigate to="/server" />} />
			<Route path="/private">
				<Route
					index
					loader={todoLoader}
					element={<Todo key="private" offlineInstance />}
				/>
				<Route
					path="/private/:tag"
					loader={todoLoader}
					element={<Todo key="private" offlineInstance />}
				/>
			</Route>
			<Route path="/server">
				<Route index loader={todoLoader} element={<Todo key={'server'} />} />
				<Route
					path="/server/:tag"
					loader={todoLoader}
					element={<Todo key={'server'} />}
				/>
			</Route>
			<Route path="/*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
