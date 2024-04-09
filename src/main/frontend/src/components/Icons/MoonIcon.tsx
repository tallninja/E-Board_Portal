interface Props {
	className?: string | undefined;
}

export function MoonIcon({ className }: Props) {
	return (
		<svg
			className={
				className ||
				'flex-shrink w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
			}
			aria-hidden='true'
			xmlns='http://www.w3.org/2000/svg'
			fill='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				fillRule='evenodd'
				d='M11.7 2a10 10 0 1 0 9.8 13.3 1 1 0 0 0-1-1.3H20a8 8 0 0 1-7.6-10.6l.1-.4a1 1 0 0 0-.8-1Z'
				clipRule='evenodd'
			/>
		</svg>
	);
}
