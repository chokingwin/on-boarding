import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";
import './App.css';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import FormPage from './pages/form';
import FinishPage from './pages/finish';
import { useAppSelector } from './hooks/useRedux';
import {
    selectIsLogin,
    selectIsSubmit
} from './store/userSlice';

const LayoutPage = () => {
    const isLogin = useAppSelector(selectIsLogin);
    const isSubmit = useAppSelector(selectIsSubmit);
    const location = useLocation();

    if (location.pathname === '/') {
        return <Navigate to="/form" replace />;
    }

    if (location.pathname !== '/login' && !isLogin) {
        return <Navigate to="/login" replace />;
    }

    if (location.pathname === '/form' && isSubmit) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

const saveRedux = (user: any) => {
    window.onbeforeunload = () => {
        sessionStorage.setItem('user', JSON.stringify(user));
    };
}

const App = () => {
    const isLogin = useAppSelector(selectIsLogin);
    const isSubmit = useAppSelector(selectIsSubmit);

    saveRedux({
        isLogin,
        isSubmit
    });

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutPage />}>
                        <Route path="home" element={<HomePage />} />
                        <Route path="form" element={<FormPage />} />
                        <Route path="finish" element={<FinishPage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App; 
