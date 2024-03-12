import { useEffect, useState } from 'react';
import { AudiosTable } from '../components';
import { getAudios } from '../data';

export function Audios() {
	const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);

	useEffect(() => {
		(async () => {
			const data: AudioRecording[] = await getAudios();
			setAudioRecordings(data);
		})();
	}, []);

	return (
		<div className='p-4 sm:ml-64'>
			<div className='p-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg mt-14'>
				{/* <div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
					<p className='text-2xl text-gray-400 dark:text-gray-500'>Audios</p>
				</div> */}
				<AudiosTable data={audioRecordings} />
			</div>
		</div>
	);
}
