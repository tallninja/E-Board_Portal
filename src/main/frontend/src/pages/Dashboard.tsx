import {DashboardStatsCards} from '../components';
import {DashboardMeetingsTable} from "../components/DashboardMeetingsTable.tsx";
import {useEffect} from "react";
import {initFlowbite} from "flowbite";
import {InitFlowbite} from "../InitFlowbite.tsx";

export function DashBoard() {

	return (
		<>
			<h1 className='text-4xl'>Dashboard</h1>
			<div className='p-4 sm:ml-64 h-full'>
				<div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5'>
					<DashboardStatsCards />
					<DashboardMeetingsTable />
				</div>
			</div>
		</>
	);
}
