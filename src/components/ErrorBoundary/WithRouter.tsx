import React, { ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
  navigate: NavigateFunction;
}

export const withRouter = (Component: React.ComponentClass<IProps>) => {
  const Wrapper = (props: React.PropsWithChildren) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
