import classNames from 'classnames';
import React, { ReactElement } from 'react';
import './Button.scss';

type Props = {
  onClick?: () => void;
  content?: string;
  icon?: ReactElement;
  isClose?: boolean;
};

export const Button: React.FC<Props> = ({
  onClick,
  content,
  icon,
  isClose,
}) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={classNames('table-button', {
        'table-button--close': isClose,
      })}
    >
      {icon}
      {content}
    </button>
  );
};
