import * as React from 'react';

import Example from '../components/Example';

function Page() {
  const [isHydrated, setIsHydrated] = React.useState(false);
  React.useEffect(() => setIsHydrated(true), []);

  if (!isHydrated) return null;
  return <Example />;
}

export default Page;
