import React, { ErrorInfo } from "react";

/** Types */
type ParentCompState = {
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<ParentCompState> {
  public state = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);

    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Layout>
          <Typography.Text>
            Seems we ran into an error. We are automatically notified of such
            issues.
          </Typography.Text>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
