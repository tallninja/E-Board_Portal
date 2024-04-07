import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Audios,
	DashBoard,
	Documents,
	Login, Meeting,
	Meetings,
	PageNotFound,
	Users,
	Videos,
} from './pages';
import { useTheme } from './hooks';
import {PersistAuthSession, Protected, Wrapper} from './components';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
	{
		path: '/auth/login',
		element: <Login />
	},
	{
		element: <PersistAuthSession />,
		children: [
			{
				element: <Protected />,
				children: [
					{
						element: <Wrapper/>,
						children: [
							{
								path: '/dashboard',
								children: [
									{index: true, element: <DashBoard/>},
									{
										path: 'meetings',
										children: [
											{index: true, element: <Meetings/>},
											{path: ':meetingSlug', element: <Meeting/>}
										]
									},
									{path: 'media/documents', element: <Documents/>},
									{path: 'media/audios', element: <Audios/>},
									{path: 'media/videos', element: <Videos/>},
									{path: 'users', element: <Users/>},
								]
							}
						],
					}
				]
			},
		]
	},
	{ path: '*', element: <PageNotFound /> },
]);

function App() {
	const [theme, _] = useTheme();

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer theme={theme === 'light' ? 'dark' : 'light'} />
		</>
	);
}

export default App;
