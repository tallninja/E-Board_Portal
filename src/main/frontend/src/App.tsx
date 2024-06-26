import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Audios,
	DashBoard,
	Documents,
	Login, Meeting, MeetingAudios, MeetingDocuments,
	Meetings, MeetingVideos,
	PageNotFound,
	Users,
	Videos,
} from './pages';
import { useTheme } from './hooks';
import {PersistAuthSession, PersistMeeting, Protected, Wrapper} from './components';
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
											{
												path: ':meetingSlug',
												children: [
													{index: true, element: <Meeting/>},
													{
														element: <PersistMeeting />,
														children: [
															{path: 'documents', element: <MeetingDocuments/>},
															{path: 'audios', element: <MeetingAudios/>},
															{path: 'videos', element: <MeetingVideos/>},
														]
													}
												]
											}
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
