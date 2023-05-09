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
import { store } from '../../todoStore/store';

import Layout from './routes/Layout';
import Todo from '../../components/Todo/Todo';
import todoLoader from './loaders/todoLoader';
import { NotFound } from './routes/Error';

const router = createHashRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<NotFound />}>
			<Route index element={<Navigate to="/server" />} />
			<Route
				loader={todoLoader}
				path="/private"
				element={<Todo offlineInstance />}
			>
				<Route path="/private/*" element={<div>Hello there!</div>} />
			</Route>
			<Route loader={todoLoader} path="/server" element={<Todo />}>
				<Route path="/server/*" element={<div>Hello there!</div>} />
			</Route>
			<Route path="/*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
