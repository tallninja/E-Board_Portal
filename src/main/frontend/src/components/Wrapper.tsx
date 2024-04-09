import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import {useEffect} from "react";
import {initFlowbite} from "flowbite";

export function Wrapper() {
	useEffect(() => {
		initFlowbite()
		return () => {}
	}, []);

	return (
		<div className='w-full h-auto max-h-full bg-white dark:bg-gray-800'>
			<Navbar />
			<Sidebar />
			<Outlet />
		</div>
	);
}
