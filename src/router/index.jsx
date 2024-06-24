import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLE } from 'src/constants/role';
import { Layout } from 'src/layouts';
import AuthLayout from 'src/layouts/AuthLayout';
import LoginPage from 'src/pages/auth/login';
import RecoverPasswordPage from 'src/pages/auth/recover-password';
import RegisterPage from 'src/pages/auth/register';
import CreateAccountAdminPage from 'src/pages/create-account';
import CustomerDetail from 'src/pages/customer-detail';
import DecentralizationPage from 'src/pages/decentralization';
import FieldPage from 'src/pages/field';
import UserPage from 'src/pages/user';
import ProtectedRoute from './protected-route';

const HomePage = lazy(() => import('src/pages/index'));
const PageExample = lazy(() => import('src/pages/page-example'));
const CustomerPage = lazy(() => import('src/pages/customer'));
const Chatbot = lazy(() => import('src/pages/chatbot'));
const ChatbotDetail = lazy(() => import('src/pages/chatbot-detail'));
const ServicesPackage = lazy(() => import('src/pages/services-package'));
const Invoices = lazy(() => import('src/pages/invoices'));
const Ranking = lazy(() => import('src/pages/ranking'));
const Partner = lazy(() => import('src/pages/partner'));
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
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN]}>
            <PageExample />
          </ProtectedRoute>
        ),
      },
      {
        path: 'chatbot',
        element: (
          <ProtectedRoute
            roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN, ROLE.ORG_USER, ROLE.USER]}
          >
            <Chatbot />
          </ProtectedRoute>
        ),
      },
      {
        path: 'chatbot/:id',
        element: (
          // <ProtectedRoute
          //   roles={[]}
          // >
            <ChatbotDetail />
          // </ProtectedRoute>
        ),
      },
      {
        path: 'customer',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <CustomerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'customer/:id',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <CustomerDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN]}>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/:id',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN]}>
            <CustomerDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create-account',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <CreateAccountAdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'services-package',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <ServicesPackage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'invoices',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <Invoices />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ranking',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <Ranking />
          </ProtectedRoute>
        ),
      },
      {
        path: 'partner',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <Partner />
          </ProtectedRoute>
        ),
      },
      {
        path: 'field',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN]}>
            <FieldPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'decentralization',
        element: (
          <ProtectedRoute roles={[ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.ORG_ADMIN]}>
            <DecentralizationPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];
