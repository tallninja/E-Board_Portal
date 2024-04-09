import {Link} from "react-router-dom";
import {useState} from "react";
import {CustomModal} from "../CustomModal.tsx";
import {VideoPlayer} from "../VideoPlayer.tsx";
import prettyBytes from "pretty-bytes";
import {setVideoRecording, setMeeting} from "../../features";
import {useDispatch} from "react-redux";
import {DeleteVideoRecordingForm} from "../Forms";

function Thead() {
	return (
		<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
		<tr>
			<th scope='col' className='p-4'>
				<div className='flex items-center'>
					<input
						id='checkbox-all-search'
						type='checkbox'
						className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
					/>
					<label htmlFor='checkbox-all-search' className='sr-only'>
						checkbox
					</label>
				</div>
			</th>
			<th scope='col' className='px-6 py-3'>
				#id
			</th>
			<th scope='col' className='px-6 py-3'>
				File Name
			</th>
			<th scope='col' className='px-6 py-3'>
				File Type
			</th>
			<th scope='col' className='px-6 py-3'>
				File Size
			</th>
			<th scope='col' className='px-6 py-3'>
				Actions
			</th>
			<th scope='col' className='px-6 py-3'></th>
		</tr>
		</thead>
	);
}

interface TbodyProps {
	data: VideoRecording[];
	playVideo: ((video: VideoRecording) => void);
	deleteRow: ((video: VideoRecording) => void);
}

function Tbody({data, playVideo, deleteRow} : TbodyProps) {

	return (
		<tbody>
		{data.map((video, idx) => (
			<tr
				key={video.id}
				className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
			>
				<td className='w-4 p-4'>
					<div className='flex items-center'>
						<input
							id='checkbox-table-search-1'
							type='checkbox'
							className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
						<label htmlFor='checkbox-table-search-1' className='sr-only'>
							checkbox
						</label>
					</div>
				</td>
				<td className='px-6 py-4'>{idx + 1}</td>
				<th
					scope='row'
					className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
				>
					<p
						onClick={() => playVideo(video)}
						className="hover:underline hover:text-green-400 cursor-pointer"
					>
						{video.fileName.slice(14, 70)}
						{video.fileName.length > 70 && "..."}
					</p>
				</th>
				<td className='px-6 py-4'>{video.fileType}</td>
				<td className='px-6 py-4'>{prettyBytes(video.fileSize)}</td>
				<td className='px-6 py-4'>
					<Link
						to={video.uri}
						target="_blank"
						download={video.fileName}
						className='cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline'
					>
						Download
					</Link>
				</td>

				<td className='px-6 py-4'>
						<span
							onClick={() => deleteRow(video)}
							className='cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline'
						>
							Delete
						</span>
				</td>
			</tr>
		))}
		</tbody>
	);
}

interface Props {
	data: VideoRecording[];
}

export function VideoRecordingsTable({ data }: Props) {
	const dispatch = useDispatch();
	const [showPlayer, setShowPlayer] = useState<boolean>(false);
	const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
	const [video, setVideo] = useState<VideoRecording>(null);

	const playVideo = (video: VideoRecording) => {
		setVideo(video);
		setShowPlayer(true);
	}

	const deleteRow = (videoRecording: VideoRecording) => {
		dispatch(setVideoRecording(videoRecording))
		setShowDeleteForm(true);
	}

	return (
		<>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<Thead/>
					<Tbody data={data} playVideo={(video) => playVideo(video)} deleteRow={deleteRow}/>
				</table>
			</div>

			<CustomModal
				title={`${video?.fileName.slice(14, 66)}${video?.fileName.length > 66 ? "..." : ""}`}
				showModal={showPlayer}
				setShowModal={setShowPlayer}
			>
				<VideoPlayer src={video?.uri ?? ""} type={video?.fileType ?? ""} />
			</CustomModal>

			<CustomModal
				title={`${video?.fileName.slice(14, 66)}${video?.fileName.length > 66 ? "..." : ""}`}
				showModal={showDeleteForm}
				setShowModal={setShowDeleteForm}
			>
				<DeleteVideoRecordingForm
					onCancel={() => setShowDeleteForm(false)}
					afterSubmit={() => setShowDeleteForm(false)}
				/>
			</CustomModal>
		</>
	);
}
