import { useState } from 'react';
import {useLocalStorage, useTheme} from '../../hooks';
import {HamburgerIcon, LogoutIcon, MoonIcon, SunIcon} from '../Icons';
import { Branding } from '../Branding';
// import { UserMenu } from './UserMenu';
// import IMAGES from '../../assets.ts';
import {authApi, authApiWithAuth, useLogoutUserMutation} from "../../services/auth.ts";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import {useNavigate} from "react-router-dom";
import {logout} from "../../features";

export function Navbar() {
	const [colorTheme, setTheme] = useTheme();
	const [darkMode, setDarkMode] = useState(
		colorTheme === 'light'
	);
	const [logoutUser, result] = useLogoutUserMutation();
	const dispatch = useDispatch();
	const [_, setAccessToken] = useLocalStorage<string>("a_t", "");
	const [__, setRefreshToken] = useLocalStorage<string>("r_t", "");

	const toggleDarkMode = (checked: boolean) => {
		setTheme(colorTheme);
		setDarkMode(checked);
	};

	const handleLogout = async () => {
		console.log("LOGOUT!!!")
		// noinspection TypeScriptUnresolvedReference
		await logoutUser();
		setAccessToken(null);
		setRefreshToken(null);
		dispatch(logout());
	}

	return (
		<nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
			<div className='px-3 py-3 lg:px-5 lg:pl-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center justify-start rtl:justify-end'>
						<button
							data-drawer-target='logo-sidebar'
							data-drawer-toggle='logo-sidebar'
							aria-controls='logo-sidebar'
							type='button'
							className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						>
							<span className='sr-only'>Open sidebar</span>
							<HamburgerIcon />
						</button>
						<Branding colorTheme={colorTheme} />
					</div>
					<div
						onClick={() => toggleDarkMode(!darkMode)}
						className='text-2xl cursor-pointer'
					>
						{darkMode ? <SunIcon /> : <MoonIcon />}
					</div>
					<div className='flex items-center'>
						<div className='flex items-center ms-3'>
							<div>
								<button onClick={handleLogout}>
									<LogoutIcon />
								</button>
								{/*<button*/}
								{/*	type='button'*/}
								{/*	className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'*/}
								{/*	aria-expanded='false'*/}
								{/*	data-dropdown-toggle='dropdown-user'*/}
								{/*>*/}
								{/*	<span className='sr-only'>Open user menu</span>*/}
								{/*	<img*/}
								{/*		className='w-8 h-8 rounded-full'*/}
								{/*		src={IMAGES.profile}*/}
								{/*		alt='user photo'*/}
								{/*	/>*/}
								{/*</button>*/}
							</div>
							{/*<UserMenu />*/}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
