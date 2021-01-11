import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import LoginView from './components/auth/LoginView';
import RegisterView from './components/auth/RegisterView';
import FogotPassWordView from "./components/auth/ForgotPassWordView";
import ActiveAccountView from './components/auth/ActiveAccountView';
import ResetPassWordView from './components/auth/ResetPassWordView';
import NotFoundView from './components/errors/NotFoundView';


const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Navigate to="/login" /> },
            { path: '/login', element: <LoginView /> },
            { path: '/register', element: <RegisterView /> },
            { path: '/forgot_password', element: <FogotPassWordView /> },
            { path: "/active/:token", element: <ActiveAccountView /> },
            { path: "/reset_password/:token", element: <ResetPassWordView /> },
            { path: "/profile", element: <Navigate to="/login" /> },
            { path: "/change_password", element: <Navigate to="/" /> },
            { path: "/users", element: <Navigate to="/" /> },
            { path: "/matchs", element: <Navigate to="/" /> },
            { path: '/404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> },

        ]
    },

];

export default routes;
