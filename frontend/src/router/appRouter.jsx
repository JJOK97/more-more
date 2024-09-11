import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/assets/css/common/appRouter.css';
import Main from '@/pages/Main';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/User/Profile';
import Feed from '@/pages/feed/Feed';
import Header from '@/components/common/GroupHeader';
import Footer from '@/components/common/GroupFooter';

const AppRouter = () => {
	return (
		<Router>
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
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default AppRouter;
