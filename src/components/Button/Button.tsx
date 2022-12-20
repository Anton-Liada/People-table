import React from 'react';
import './Button.scss';

type Props = {
  onClick?: () => void;
  content: string;
};

export const Button: React.FC<Props> = ({ onClick, content }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="modal-card__button"
    >
      {content}
    </button>
  );
};