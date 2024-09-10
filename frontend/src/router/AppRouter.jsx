import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '@/pages/Main';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/User/Profile';

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
            </Routes>
        </Router>
    );
};

export default AppRouter;
