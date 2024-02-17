import { Component, ErrorInfo, ReactNode } from 'react';
import { TbWifiOff, TbMoodSadDizzy } from 'react-icons/tb';
import ErrorContainer from './ErrorContainer';
import JwtService from 'src/app/auth/services/jwtService';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  currentError: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { currentError: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { currentError: error };
  }

  componentDidCatch(error: Error, details: ErrorInfo) {}

  tryAgain = () => {
    window.location.reload();
  };

  clearData = () => {
    JwtService.logout();
    this.setState({ currentError: null });
  };

  render() {
    if (this.state.currentError) {
      if (this.state.currentError.name === 'ChunkLoadError') {
        return (
          <ErrorContainer
            icon={<TbWifiOff fontSize={200} />}
            title="اتصال با اینترنت برقرار نیست !"
            message="لطفا اتصال شبکه خود را بررسی کنید و دوباره تلاش کنید."
            submitClick={this.tryAgain}
          />
        );
      }
      return (
        <ErrorContainer
          icon={<TbMoodSadDizzy fontSize={200} />}
          title="مشکلی پیش آمد !"
          message="لطفا مجدد تلاش کنید."
          submitClick={this.tryAgain}
          error={this.state.currentError}
        />
      );
    }
    return this.props.children;
  }
}
