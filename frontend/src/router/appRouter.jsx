import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '@/pages/Main';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/User/Profile';
import GroupAccount from '@/pages/groupAccount/GroupAccount';

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
		</Router>
	);
};

export default AppRouter;
