// import Loading from '@/components/Loading';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <>
      {!isAuth ? (
        <Suspense fallback={<></>}>{<Outlet />}</Suspense>
      ) : (
        <Navigate
          replace
          to="/chatbot"
        />
      )}
    </>
  );
};

export default AuthLayout;
