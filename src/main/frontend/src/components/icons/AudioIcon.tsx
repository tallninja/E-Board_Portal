interface Props {
	className?: string | undefined;
}

export function AudioIcon({ className }: Props) {
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
				d='M5 8c.6 0 1 .4 1 1v3a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9a1 1 0 1 1 2 0v3a6 6 0 0 1-6 6h-1v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2h-1a6 6 0 0 1-6-6V9c0-.6.4-1 1-1Z'
				clipRule='evenodd'
			/>
			<path d='M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z' />
		</svg>
	);
}
