import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  content: string;
};

export const HeaderLink: React.FC<Props> = ({ to, content }) => {
  return (
    <NavLink to={`${to}`}>
      {content}
    </NavLink>
  );
};