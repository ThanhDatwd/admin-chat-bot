import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Layout } from 'src/layouts';
import LoginPage from 'src/pages/auth/login';
import RegisterPage from 'src/pages/auth/register';
import AuthLayout from 'src/layouts/AuthLayout';
import RecoverPasswordPage from 'src/pages/auth/recover-password';

const HomePage = lazy(() => import('src/pages/index'));
const PageExample = lazy(() => import('src/pages/page-example'));
const User = lazy(() => import('src/pages/user'));
const Chatbot = lazy(() => import('src/pages/chatbot'));
const ChatbotDetail = lazy(() => import('src/pages/chatbot-detail'));
const Error404Page = lazy(() => import('src/pages/404'));



export const routesOutlets = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'recover-password',
        element: <RecoverPasswordPage />,
      },
    ],
  },
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'page-example',
        element: <PageExample />,
      },
      {
        path: 'chatbot',
        element: <Chatbot />,
      },
      {
        path: 'chatbot/:id',
        element: <ChatbotDetail />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];
