import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Layout } from 'src/layouts';
import LoginPage from 'src/pages/auth/login';
import RegisterPage from 'src/pages/auth/register';
import AuthLayout from 'src/layouts/AuthLayout';
import RecoverPasswordPage from 'src/pages/auth/recover-password';
import CustomerDetail from 'src/pages/customer-detail';
import CreateAccountAdminPage from 'src/pages/create-account';
import UserPage from 'src/pages/user';

// import { Layout as LayoutBase } from "src/layouts/base";

const HomePage = lazy(() => import('src/pages/index'));
const PageExample = lazy(() => import('src/pages/page-example'));
const CustomerPage = lazy(() => import('src/pages/customer'));
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
        path: 'customer',
        element: <CustomerPage />,
      },
      {
        path: 'customer/:id',
        element: <CustomerDetail />,
      },
      {
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'user/:id',
        element: <CustomerDetail />,
      },
      {
        path: 'create-account',
        element: <CreateAccountAdminPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];
