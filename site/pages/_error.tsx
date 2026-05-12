import type { NextPageContext } from 'next';
import NextErrorComponent, { type ErrorProps } from 'next/error';

function ErrorPage(props: ErrorProps) {
  return <NextErrorComponent {...props} />;
}

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  return NextErrorComponent.getInitialProps(ctx);
};

export default ErrorPage;
