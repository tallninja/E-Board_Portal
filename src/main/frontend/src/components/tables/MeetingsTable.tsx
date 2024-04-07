import {useEffect, useState} from "react";
import {initFlowbite} from "flowbite";
import {Link} from "react-router-dom";

interface Props {
	data: Meeting[];
}

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
					Meeting Title
				</th>
				<th scope='col' className='px-6 py-3'>
					Date
				</th>
				<th scope='col' className='px-6 py-3'>
					Start Time
				</th>
				<th scope='col' className='px-6 py-3'>
					End Time
				</th>
				<th scope='col' className='px-6 py-3'>
					Actions
				</th>
				<th scope='col' className='px-6 py-3'></th>
			</tr>
		</thead>
	);
}

function Tbody({ data }: { data: Meeting[] }) {
	return (
		<tbody>
			{data.map((meeting, idx) => (
				<tr
					key={meeting.id}
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
						<Link to={`/dashboard/meetings/${meeting.slug}`} className="hover:underline hover:text-green-400">
							{meeting.title}
						</Link>
					</th>
					<td className='px-6 py-4'>{meeting.date}</td>
					<td className='px-6 py-4'>{meeting.startTime}</td>
					<td className='px-6 py-4'>{meeting.endTime}</td>
					<td className='px-6 py-4'>
						<a
							href='#'
							className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
						>
							Edit
						</a>
					</td>

					<td className='px-6 py-4'>
						<a
							href='#'
							className='font-medium text-red-600 dark:text-red-500 hover:underline'
						>
							Delete
						</a>
					</td>
				</tr>
			))}
		</tbody>
	);
}

export function MeetingsTable({ data }: Props) {
	useEffect(() => {
		initFlowbite();
	}, []);

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<Thead/>
				<Tbody data={data}/>
			</table>
		</div>
	);
}
