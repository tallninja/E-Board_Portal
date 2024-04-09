import { ReactNode } from 'react';
import { NavLink, To, NavLinkProps } from 'react-router-dom';

interface Props {
	to: To;
	text: string;
	icon: ReactNode;
	className?: string | undefined;
	end?: boolean;
}

export function NavItem({ to, text, icon, className, end }: Props) {
	const navLinkProps: NavLinkProps = {
		to: to,
		className: ({ isActive, isPending }) =>
			[
				isActive ? 'bg-gray-300 dark:bg-gray-600' : '',
				isPending ? 'pending' : '',
			].join(' ') +
			'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group' +
			className,
	};

	return (
		<NavLink to={to} className={navLinkProps.className} end={end ?? true}>
			{icon}
			<span className='ms-3'>{text}</span>
		</NavLink>
	);
}
