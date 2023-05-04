import React from 'react';
import ReactDOM from 'react-dom/client';

import { Routes, Route, HashRouter } from 'react-router-dom';
import Todo from '../../components/Todo/Todo';

import getAuth from '../../utility/auth/auth';

import App from './routes/App';
import { NotFound } from './routes/Error';

const auth = getAuth();

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/private" element={<Todo offlineInstance />}>
						<Route path=":tag" element={<div>Look, a tag!</div>} />
					</Route>
					<Route path="/server" element={<Todo userId={auth} />}>
						<Route path=":tag" element={<div>Look, a tag!</div>} />
					</Route>
					<Route path="/*" element={<NotFound />} />
				</Route>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);
