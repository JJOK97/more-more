import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/assets/css/common/appRouter.css';
import MainHeader from '@/components/common/MainHeader';
import Header from '@/components/common/GroupHeader';
import Footer from '@/components/common/GroupFooter';
import GroupAccount from '@/pages/groupaccount/GroupAccount';
<<<<<<< HEAD
import Schedule from '@/pages/schedule/GroupSchedule';
=======
import GroupAccountDepositStatus from '@/pages/groupaccount/GroupAccountDepositStatus';
>>>>>>> 9a125d864ecf06cf55c5dab80efff01ec44175cc
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
<<<<<<< HEAD
						path="/schedule"
						element={<Schedule />}
=======
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
>>>>>>> 9a125d864ecf06cf55c5dab80efff01ec44175cc
					/>
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default AppRouter;
