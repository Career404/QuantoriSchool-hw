import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Outlet, NavLink } from 'react-router-dom';

export default function App() {
	const location = useLocation();
	useEffect(() => {
		let title = location.pathname.slice(1);
		title = title.charAt(0).toUpperCase() + title.slice(1);
		let searchString = location.search.slice(3).replaceAll('+', ' ');
		document.title = title + ' ' + searchString;
	});
	return (
		<>
			<div className="tab-wrapper">
				<NavLink
					to={`/private`}
					className={({ isActive, isPending }) =>
						isPending ? 'tab pending' : isActive ? 'tab active' : 'tab'
					}
				>
					Private
				</NavLink>
				<NavLink
					to={`/server`}
					className={({ isActive, isPending }) =>
						isPending ? 'tab pending' : isActive ? 'tab active' : 'tab'
					}
				>
					Server
				</NavLink>
			</div>
			<div className="panels-wrapper">
				<Outlet />
			</div>
		</>
	);
}
