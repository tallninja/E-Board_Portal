import { TableWrapper } from './TableWrapper';

interface Props {
	data: User[];
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
					name
				</th>
				<th scope='col' className='px-6 py-3'>
					Email
				</th>
				<th scope='col' className='px-6 py-3'>
					Phone Number
				</th>
				<th scope='col' className='px-6 py-3'>
					Actions
				</th>
				<th scope='col' className='px-6 py-3'></th>
			</tr>
		</thead>
	);
}

function Tbody({ data }: { data: User[] }) {
	return (
		<tbody>
			{data.map((user) => (
				<tr
					key={user.id}
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
					<td className='px-6 py-4'>{user.id}</td>
					<th
						scope='row'
						className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
					>
						{user.name}
					</th>
					<td className='px-6 py-4'>{user.email}</td>
					<td className='px-6 py-4'>{user.phoneNumber}</td>
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

export function UsersTable({ data }: Props) {
	return (
		<TableWrapper>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<Thead />
				<Tbody data={data} />
			</table>
		</TableWrapper>
	);
}
