import {DashboardStatsCards} from '../components';
import {DashboardMeetingsTable} from "../components/DashboardMeetingsTable.tsx";

export function DashBoard() {

	return (
		<>
			<div className='p-4 sm:ml-64 sm:mt-14 h-screen'>
				<div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5'>
					<DashboardStatsCards />
					<DashboardMeetingsTable />
				</div>
			</div>
		</>
	);
}
