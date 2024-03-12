import { useEffect, useState } from 'react';
import { getMeetings } from '../data';
import { MeetingsTable } from '../components';

export function Meetings() {
	const [meetings, setMeetings] = useState<Meeting[]>([]);

	useEffect(() => {
		(async () => {
			const data: Meeting[] = await getMeetings();
			setMeetings(data);
		})();
	}, []);

	return (
		<div className='p-4 sm:ml-64'>
			<div className='p-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg mt-14'>
				{/* <div className='flexitems-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
					<p className='text-2xl text-gray-400 dark:text-gray-500'>Meetings</p>
				</div> */}
				<MeetingsTable data={meetings} />
			</div>
		</div>
	);
}
