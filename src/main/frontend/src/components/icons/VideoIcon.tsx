interface Props {
	className?: string | undefined;
}

export function VideoIcon({ className }: Props) {
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
				d='M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V7Zm2 9.4 4.7 1.5A1 1 0 0 0 22 17V7a1 1 0 0 0-1.3-1L16 7.7v8.8Z'
				clipRule='evenodd'
			/>
		</svg>
	);
}
