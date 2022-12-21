import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UsersPage } from './pages/UsersPage';

export const App: React.FC = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="users">
          <Route index element={<UsersPage />} />

          <Route path=":id" element={<UsersPage />} />
        </Route>
      </Routes>
    </>
  );
};
