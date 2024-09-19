import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/assets/css/common/appRouter.css';
import MainHeader from '@/components/common/MainHeader';
import Header from '@/components/common/GroupHeader';
import Footer from '@/components/common/GroupFooter';
import GroupAccount from '@/pages/groupaccount/GroupAccount';
import Main from '@/pages/Main';
import Login from '@/pages/Login/Login';
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
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/feed" element={<Feed />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/groupaccount" element={<GroupAccount />} />
					<Route path="/group/:groupId" element={<Feed />} />
					<Route path="/group/:groupId/:postId" element={<Post />} />
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default AppRouter;
