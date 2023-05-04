import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function App() {
	const navigate = useNavigate();

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
