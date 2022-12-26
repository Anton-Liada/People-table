import React from 'react';
import { HeaderLink } from '../HeaderLink';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <HeaderLink to="/home" content="Home" />
          <HeaderLink to="/" content="Users" />
        </nav>
      </div>
    </header>
  );
};
