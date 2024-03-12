interface Props {
	className?: string | undefined;
}

export function ArrowLeftIcon({ className }: Props) {
	return (
		<svg
			className={
				className ||
				'flex-shrink w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
			}
			aria-hidden='true'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
		>
			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M5 12h14M5 12l4-4m-4 4 4 4'
			/>
		</svg>
	);
}
