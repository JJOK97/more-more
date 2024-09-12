import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/assets/css/common/appRouter.css';
import MainHeader from '@/components/common/MainHeader';
import Header from '@/components/common/GroupHeader';
import Footer from '@/components/common/GroupFooter';
import Main from '@/pages/Main';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/User/Profile';
import GroupAccount from '@/pages/groupAccount/GroupAccount';
import Feed from '@/pages/feed/Feed';
import Post from '@/pages/post/Post';

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Main />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/profile"
					element={<Profile />}
				/>
				<Route
					path="groupaccount"
					element={<GroupAccount />}
				/>
			</Routes>
			<MainHeader />
			<Header />
			<main>
				<Routes>
					<Route
						path="/"
						element={<Main />}
					/>
					<Route
						path="/login"
						element={<Login />}
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
						path="/post/:id"
						element={<Post />}
					/>
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default AppRouter;
