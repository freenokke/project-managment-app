import i18next from 'i18next';
import { Component, ReactNode } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { withRouter } from './WithRouter';

interface IProps {
  children?: ReactNode;
  navigate: NavigateFunction;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reloadPage = () => {
    this.props.navigate('/main');
    location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[100%] flex-grow pt-[10%] gap-[40px]">
          <div className="container w-[85%] sm:w-[60%] md:w-[500px] flex flex-col items-center gap-[30px] text-gray-700 text-center">
            <h1 className="text-[28px] md:text-[35px]">{i18next.t('errorBoundary.title')}</h1>
            <p className="text-[18px] md:text-[24px] text-center">
              {i18next.t('errorBoundary.text')}
            </p>
            <div
              onClick={this.reloadPage}
              className="flex items-center gap-2 transition-colors cursor-pointer text-gray-500 hover:text-blue-500"
            >
              <span className="material-icons">refresh</span>
              {i18next.t('errorBoundary.reload')}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
