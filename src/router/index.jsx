import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'src/layouts';

// import { Layout as LayoutBase } from "src/layouts/base";

const HomePage = lazy(() => import('src/pages/index'));
const PageExample = lazy(() => import('src/pages/page-example'));
const User = lazy(() => import('src/pages/user'));
const Chatbot = lazy(() => import('src/pages/chatbot'));
const ChatbotDetail = lazy(() => import('src/pages/chatbot-detail'));
const Error404Page = lazy(() => import('src/pages/404'));
export const routesOutlets = [
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
