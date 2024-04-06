import {toast} from "react-toastify";
import {VideoRecordingsTable, TableFilterSearch, TableFooter} from '../components';
import {useGetVideoRecordingsQuery} from "../services";

export function Videos() {
	const { isLoading, isError, data } = useGetVideoRecordingsQuery(
		{
			page: 0,
			pageSize: 10,
		},
		{
			pollingInterval: 5000,
			skipPollingIfUnfocused: true,
		}
	);

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return toast.error("An error occurred!");
	}

	return (
		<div className='p-4 sm:ml-64 h-screen'>
			<div className='p-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg mt-14'>
				<div className="mt-4">
					<div className="flex items-center flex-row justify-between pb-4">
						<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
							Videos
						</h2>
						<TableFilterSearch/>
					</div>

					<VideoRecordingsTable data={data.content}/>

					<TableFooter/>
				</div>
			</div>
		</div>
	);
}
