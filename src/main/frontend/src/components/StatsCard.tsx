import {Link} from "react-router-dom";
import {ReactNode} from "react";

interface Props {
    color: "red" | "green" | "amber" | "teal";
    icon: ReactNode
    count: number;
    text: string;
    href: string;
}

export function StatsCard({ color, icon, count, text, href } : Props) {
    return (
        <div className={`max-w-sm bg-${color}-600 rounded-lg shadow-md`}>
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-white">{count}</h3>
                    <span className="text-white w-12 h-12">{icon}</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{text}</p>
            </div>
            <div className={`px-6 py-2 bg-${color}-700 rounded-b-lg`}>
                <Link to={href} className="inline-flex items-center text-white hover:underline">
                    More info
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                </Link>
            </div>
        </div>
    )
}