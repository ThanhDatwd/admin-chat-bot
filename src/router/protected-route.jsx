import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const currentAdmin = useSelector((state) => state.auth.admin);
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (currentAdmin?.authorities.some(item=>roles.includes(item.role))) {
    return children;
  }
  return (
    <Navigate
      to="/"
      replace
    />
  );
};

export default ProtectedRoute;
