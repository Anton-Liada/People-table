import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderLink.scss';

type Props = {
  to: string;
  content: string;
};

export const HeaderLink: React.FC<Props> = ({ to, content }) => {
  return (
    <NavLink to={`${to}`} className="nav-link">
      {content}
    </NavLink>
  );
};
