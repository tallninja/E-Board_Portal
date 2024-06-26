import {Link} from "react-router-dom";
import {useState} from "react";
import {CustomModal} from "../CustomModal.tsx";
import {AudioPlayer} from "../AudioPlayer.tsx";
import prettyBytes from "pretty-bytes";
import {setAudioRecording, setMeeting} from "../../features";
import {useDispatch} from "react-redux";
import {DeleteAudioRecordingForm} from "../Forms";

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
	data: AudioRecording[];
	playAudio: ((audio: AudioRecording) => void);
	deleteRow: ((audio: AudioRecording) => void);
}

function Tbody({data, playAudio, deleteRow} : TbodyProps) {

	return (
		<tbody>
		{data.map((audio, idx) => (
			<tr
				key={audio.id}
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
							onClick={() => playAudio(audio)}
							className="hover:underline hover:text-green-400 cursor-pointer"
						>
							{audio.fileName.slice(14, 70)}
							{audio.fileName.length > 70 && "..."}
						</p>
					</th>
					<td className='px-6 py-4'>{audio.fileType}</td>
					<td className='px-6 py-4'>{prettyBytes(audio.fileSize)}</td>
					<td className='px-6 py-4'>
						<Link
							to={audio.uri}
							target="_blank"
							download={audio.fileName}
							className='cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline'
						>
							Download
						</Link>
					</td>

					<td className='px-6 py-4'>
						<span
							onClick={() => deleteRow(audio)}
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
	data: AudioRecording[];
}

export function AudioRecordingsTable({ data }: Props) {
	const dispatch = useDispatch();
	const [showPlayer, setShowPlayer] = useState<boolean>(false);
	const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
	const [audio, setAudio] = useState<AudioRecording>(null);

	const playAudio = (audio: AudioRecording) => {
		setAudio(audio);
		setShowPlayer(true);
	}

	const deleteRow = (audioRecording: AudioRecording) => {
		dispatch(setAudioRecording(audioRecording))
		setShowDeleteForm(true);
	}

	return (
		<>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<Thead/>
					<Tbody data={data} playAudio={(audio) => playAudio(audio)} deleteRow={deleteRow}/>
				</table>
			</div>

			<CustomModal
				title={`${audio?.fileName.slice(14, 66)}${audio?.fileName.length > 66 ? "..." : ""}`}
				showModal={showPlayer}
				setShowModal={setShowPlayer}
			>
				<AudioPlayer src={audio?.uri ?? ""} type={audio?.fileType ?? ""} />
			</CustomModal>

			<CustomModal
				title={`${audio?.fileName.slice(14, 66)}${audio?.fileName.length > 66 ? "..." : ""}`}
				showModal={showDeleteForm}
				setShowModal={setShowDeleteForm}
			>
				<DeleteAudioRecordingForm
					onCancel={() => setShowDeleteForm(false)}
					afterSubmit={() => setShowDeleteForm(false)}
				/>
			</CustomModal>
		</>
	);
}
