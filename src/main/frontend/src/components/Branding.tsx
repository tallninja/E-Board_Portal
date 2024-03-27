import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IMAGES from '../assets.ts';

interface Props {
	colorTheme: String;
}

export function Branding({ colorTheme }: Props) {
	const [darkMode, setDarkMode] = useState(
		colorTheme === 'light'
	);

	useEffect(() => {
		setDarkMode(colorTheme === 'light');
	}, [colorTheme]);

	return (
		<Link to='/' className='flex ms-2 md:me-24'>
			<img
				src={darkMode ? IMAGES.whiteLogo : IMAGES.blackLogo}
				className='h-8 me-3'
				alt='Logo'
			/>
			<span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
				Bob Grogan
			</span>
		</Link>
	);
}
