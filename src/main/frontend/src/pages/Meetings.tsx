import { useState } from 'react';
import {toast} from "react-toastify";
import {useMeetingsQuery} from "../services";
import {
	CreateMeetingForm,
	CustomModal, EditMeetingForm,
	MeetingsTable,
	TableFilterSearch,
	TableFooter,
	DeleteMeetingForm
} from '../components';

export function Meetings() {
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

	const { isLoading, isError, data } = useMeetingsQuery(
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
		<>
			<div className='p-4 sm:ml-64 h-screen pt-14'>
				<div className='h-full p-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg mt-2'>
					<div className="mt-4">
						<div className="flex items-center flex-row justify-between pb-4">
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
								Meetings
							</h2>
							<TableFilterSearch/>
							<button
								className="py-1.5 px-4 text-white font-semibold bg-green-700 hover:bg-green-500 rounded-md"
								type="button"
								onClick={() => setShowCreateModal(true)}
							>
								New Meeting
							</button>
						</div>

						<MeetingsTable
							data={data.content}
							onEdit={() => setShowEditModal(true)}
							onDelete={() => setShowDeleteModal(true)}
						/>

						<TableFooter />
					</div>
				</div>
			</div>

			<CustomModal
				showModal={showCreateModal}
				setShowModal={setShowCreateModal}
				title="Create New Meeting"
			>
				<CreateMeetingForm />
			</CustomModal>

			<CustomModal
				showModal={showEditModal}
				setShowModal={setShowEditModal}
				title="Edit Meeting"
			>
				<EditMeetingForm afterSubmit={() => setShowEditModal(false)}/>
			</CustomModal>

			<CustomModal
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
				title="Delete Meeting"
			>
				<DeleteMeetingForm
					onCancel={() => setShowDeleteModal(false)}
					afterSubmit={() => setShowDeleteModal(false)}/>
			</CustomModal>
		</>
	);
}
