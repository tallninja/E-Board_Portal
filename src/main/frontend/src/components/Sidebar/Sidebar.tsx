import {
	AudioIcon,
	DashboardIcon,
	DropDownIcon,
	FileIcon,
	FilePdfIcon,
	FireIcon,
	HelpIcon,
	UserGroupIcon,
	UsersIcon,
	VideoIcon,
} from '../Icons';
import { NavItem } from './NavItem';

export function Sidebar() {
	return (
		<aside
			id='logo-sidebar'
			className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
			aria-label='Sidebar'
		>
			<div className='flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
				<ul className='space-y-2 font-medium'>
					<li>
						<NavItem text='Dasboard' to='/dashboard' icon={<DashboardIcon />} />
					</li>
					<li>
						<NavItem
							end={false}
							text='Meetings'
							to='/dashboard/meetings'
							icon={<UserGroupIcon className="w-6 h-6 text-gray-500  dark:text-gray-400" />}
						/>
					</li>
					<li>
						<button
							type='button'
							className='flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
							aria-controls='media-dropdown'
							data-collapse-toggle='media-dropdown'
						>
							<FileIcon />
							<span className='flex-1 ms-3 text-left rtl:text-right whitespace-nowrap'>
								Media Files
							</span>
							<DropDownIcon />
						</button>
						<ul id='media-dropdown' className='py-2 space-y-2 pl-8'>
							<li>
								<NavItem
									text='Documents'
									to='/dashboard/media/documents'
									icon={<FilePdfIcon className="w-6 h-6 text-gray-500  dark:text-gray-400" />}
								/>
							</li>
							<li>
								<NavItem
									text='Audio Recordings'
									to='/dashboard/media/audios'
									icon={<AudioIcon className="w-6 h-6 text-gray-500  dark:text-gray-400" />}
								/>
							</li>
							<li>
								<NavItem
									text='Video Recordings'
									to='/dashboard/media/videos'
									icon={<VideoIcon className="w-6 h-6 text-gray-500  dark:text-gray-400" />}
								/>
							</li>
						</ul>
					</li>

					<li>
						<NavItem
							text='Users'
							to='https://bobgroganconsulting.com'
							icon={<UsersIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />} />
					</li>
				</ul>

				<ul className='pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700'>
					<li>
						<NavItem text='Upgrade to Pro' to='https://bobgroganconsulting.com' icon={<FireIcon />} />
					</li>
					<li>
						<NavItem text='help' to='https://bobgroganconsulting.com'  icon={<HelpIcon />} />
					</li>
				</ul>
			</div>
		</aside>
	);
}
