import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UsersPage } from './pages/UsersPage';

export const App: React.FC = () => {
  return (
    <>
      <Header />

      <div className="container">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/home" element={<HomePage />} />

          <Route path="/">
            <Route index element={<UsersPage />} />

            <Route path=":id" element={<UsersPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
