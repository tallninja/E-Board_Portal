import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function Wrapper() {
	return (
		<div className='w-full h-auto max-h-full bg-white dark:bg-gray-800'>
			<Navbar />
			<Sidebar />
			<Outlet />
		</div>
	);
}
