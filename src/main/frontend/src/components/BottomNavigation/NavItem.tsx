import {NavLink, NavLinkProps, To} from "react-router-dom";
import {ReactNode} from "react";

interface Props {
    to: To;
    text: string;
    icon: ReactNode;
    className?: string | undefined;
}

export function NavItem({ to, text, icon, className }: Props) {
    const navLinkProps: NavLinkProps = {
        to: to,
        className: ({ isActive, isPending }) =>
            [
                isActive ? 'bg-gray-300 dark:bg-gray-800' : '',
                isPending ? 'pending' : '',
            ].join(' ') +
            'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-300 dark:hover:bg-gray-800 group' +
            className,
    };

    return (
        <NavLink to={to} className={navLinkProps.className} type="button" end>
            {icon}
            <span
                className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >
                {text}
            </span>
        </NavLink>
    )

}