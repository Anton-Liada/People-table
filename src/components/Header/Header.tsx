import React from "react";
import { HeaderLink } from "../HeaderLink";

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <HeaderLink to='/' content='Home' />
        <HeaderLink to='/users' content='Users' />
      </nav>
    </header>
  );
};