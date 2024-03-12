import { useEffect, useState } from 'react';
import { getVideos } from '../data';
import { VideosTable } from '../components';

export function Videos() {
	const [videoRecordings, setVideoRecordings] = useState<VideoRecording[]>([]);

	useEffect(() => {
		(async () => {
			const data: VideoRecording[] = await getVideos();
			setVideoRecordings(data);
		})();
	}, []);

	return (
		<div className='p-4 sm:ml-64'>
			<div className='p-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg mt-14'>
				{/* <div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
					<p className='text-2xl text-gray-400 dark:text-gray-500'>Videos</p>
				</div> */}
				<VideosTable data={videoRecordings} />
			</div>
		</div>
	);
}
