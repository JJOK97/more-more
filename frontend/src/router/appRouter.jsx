import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import '@/assets/css/common/appRouter.css';
import MainHeader from '@/components/common/MainHeader';
import Header from '@/components/common/GroupHeader';
import Footer from '@/components/common/GroupFooter';
import GroupAccount from '@/pages/groupaccount/GroupAccount';
import Schedule from '@/pages/schedule/GroupSchedule';
import GroupAccountDepositStatus from '@/pages/groupaccount/GroupAccountDepositStatus';
import Main from '@/pages/Main';
import Profile from '@/pages/User/Profile';
import Feed from '@/pages/feed/Feed';
import Post from '@/pages/post/Post';
import CreatePost from '@/pages/createPost/CreatePost';

const AppRouter = () => {
	return (
		<Router>
			<MainHeader />
			<Header />
			<main>
				<Routes>
					<Route
						path="/"
						element={<Main />}
					/>

					<Route
						path="/profile"
						element={<Profile />}
					/>
					<Route
						path="/feed"
						element={<Feed />}
					/>
					<Route
						path="/create-post"
						element={<CreatePost />}
					/>
					<Route
						path="/groupaccount"
						element={<GroupAccount />}
					/>
					<Route
						path="/schedule"
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
						path="/deposit-status"
						element={<GroupAccountDepositStatus />}
					/>
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default AppRouter;
