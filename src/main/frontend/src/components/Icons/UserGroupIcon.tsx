interface Props {
	className?: string | undefined;
}

export function UserGroupIcon({ className }: Props) {
	return (
		<svg
			className={
				className +
				'flex-shrink transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white'
			}
			aria-hidden='true'
			xmlns='http://www.w3.org/2000/svg'
			fill='currentColor'
			viewBox='0 0 24 24'
		>
			<path
				fillRule='evenodd'
				d='M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z'
				clipRule='evenodd'
			/>
		</svg>
	);
}