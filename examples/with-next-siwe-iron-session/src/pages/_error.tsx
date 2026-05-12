import type { NextPageContext } from 'next';

type ErrorPageProps = {
  statusCode?: number;
};

function ErrorPage({ statusCode }: ErrorPageProps) {
  return <div>{statusCode ? `${statusCode} error` : 'Application error'}</div>;
}

ErrorPage.getInitialProps = ({ err, res }: NextPageContext): ErrorPageProps => {
  return {
    statusCode: res?.statusCode ?? err?.statusCode ?? 404,
  };
};

export default ErrorPage;
