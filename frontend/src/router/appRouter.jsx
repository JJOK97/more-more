import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import PrivateRoute from '@/components/common/PrivateRoute';

import '@/assets/css/common/appRouter.css';

import MainHeader from '@/components/common/MainHeader';
import Header from '@/components/common/GroupHeader';
import Footer from '@/components/common/GroupFooter';

import Main from '@/pages/Main';
import Login from '@/pages/user/Login';
import Profile from '@/pages/user/Profile';
import CreatePost from '@/pages/createPost/CreatePost';
import GroupAccount from '@/pages/groupaccount/GroupAccount';
import Schedule from '@/pages/schedule/GroupSchedule';
import Feed from '@/pages/feed/Feed';
import Post from '@/pages/post/Post';
import CreatePost from '@/pages/createPost/CreatePost';
import CreateGroup from '../pages/createGroup/CreateGroup';
import GroupAccountDepositStatus from '@/pages/groupaccount/GroupAccountDepositStatus';
import GroupDuesSetting from '@/pages/groupaccount/GroupDuesSetting';

const AppRouter = () => {
	return (
		<Router>
			<MainHeader />
			<Header />
			<main>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Main />
							</PrivateRoute>
						}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/create"
						element={<CreateGroup />}
					/>
					<Route
						path="/profile"
						element={<Profile />}
					/>
					<Route
						path="/group/:groupId/create"
						element={<CreatePost />}
					/>
					<Route
						path="/group/:groupId/account"
						element={<GroupAccount />}
					/>
					<Route
						path="/group/:groupId/schedule"
						element={<Schedule />}
					/>
					<Route
						path="/group/:groupId"
						element={<Feed />}
					/>
					<Route
						path="/group/:groupId/:postId"
						element={<Post />}
					/>
					<Route
						path="/group/:groupId/account/status"
						element={<GroupAccountDepositStatus />}
					/>
					<Route
						path="/group/:groupId/account/setting"
						element={<GroupDuesSetting />}
					/>
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default AppRouter;
