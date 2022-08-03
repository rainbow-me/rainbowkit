import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        'This is private content. You can access this userinfo because you are signed in.',
    });
  } else {
    res.send({
      error: 'You must be signed in to view the userinfo content on this page.',
    });
  }
};
