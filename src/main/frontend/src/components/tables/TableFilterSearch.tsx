import { useState } from 'react';
import { ClockIcon, DropDownIcon, SearchIcon } from '../icons';

export function TableFilterSearch() {
	const [fetchLast, setFetchLast] = useState('7d');

	return (
		<div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4'>
			<div>
				<button
					id='dropdownRadioButton'
					data-dropdown-toggle='dropdownRadio'
					className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
					type='button'
				>
					<ClockIcon />
					Last 30 days
					<DropDownIcon />
				</button>

				<div
					id='dropdownRadio'
					className='z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
					data-popper-reference-hidden=''
					data-popper-escaped=''
					data-popper-placement='top'
				>
					<ul
						className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200'
						aria-labelledby='dropdownRadioButton'
					>
						<li>
							<div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
								<input
									checked={fetchLast === '1d'}
									onChange={(e) => setFetchLast(e.target.value)}
									id='filter-radio-example-1'
									type='radio'
									value='1d'
									name='filter-radio'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label
									htmlFor='filter-radio-example-1'
									className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
								>
									Last day
								</label>
							</div>
						</li>
						<li>
							<div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
								<input
									checked={fetchLast === '7d'}
									onChange={(e) => setFetchLast(e.target.value)}
									id='filter-radio-example-2'
									type='radio'
									value='7d'
									name='filter-radio'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label
									htmlFor='filter-radio-example-2'
									className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
								>
									Last 7 days
								</label>
							</div>
						</li>
						<li>
							<div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
								<input
									checked={fetchLast === '30d'}
									onChange={(e) => setFetchLast(e.target.value)}
									id='filter-radio-example-3'
									type='radio'
									value='30d'
									name='filter-radio'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label
									htmlFor='filter-radio-example-3'
									className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
								>
									Last 30 days
								</label>
							</div>
						</li>
						<li>
							<div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
								<input
									checked={fetchLast === '1m'}
									onChange={(e) => setFetchLast(e.target.value)}
									id='filter-radio-example-4'
									type='radio'
									value='1m'
									name='filter-radio'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label
									htmlFor='filter-radio-example-4'
									className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
								>
									Last month
								</label>
							</div>
						</li>
						<li>
							<div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
								<input
									checked={fetchLast === '1y'}
									onChange={(e) => setFetchLast(e.target.value)}
									id='filter-radio-example-5'
									type='radio'
									value='1y'
									name='filter-radio'
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label
									htmlFor='filter-radio-example-5'
									className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
								>
									Last year
								</label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<label htmlFor='table-search' className='sr-only'>
				Search
			</label>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
					<SearchIcon />
				</div>
				<input
					type='text'
					id='table-search'
					className='block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Search htmlFor items'
				/>
			</div>
		</div>
	);
}
