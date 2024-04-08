import {toast} from "react-toastify";
import {AudioRecordingsTable, TableFilterSearch, TableFooter} from '../components';
import {useGetAudioRecordingsQuery} from "../services";

export function Audios() {
	const { isLoading, isError, data } = useGetAudioRecordingsQuery(
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
		<div className='p-4 sm:ml-64 h-screen pt-14'>
			<div className='h-full p-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg mt-2'>
				<div className="mt-4">
					<div className="flex items-center flex-row justify-between pb-4">
						<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
							Audios
						</h2>
						<TableFilterSearch/>
					</div>

					<AudioRecordingsTable data={data.content}/>

					<TableFooter/>
				</div>
			</div>
		</div>
	);
}
