import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { publicActions } from 'viem';
import { parseSiweMessage } from 'viem/siwe';

import { ironOptions } from '../../../lib/iron';
import { config } from '../../wagmi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { message, signature, address } = req.body;

        const publicClient = config.getClient().extend(publicActions);

        const valid = await publicClient.verifyMessage({
          address,
          message,
          signature,
        });

        if (!valid) {
          throw new Error('Invalid message');
        }

        if (parseSiweMessage(message).nonce !== req.session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' });

        req.session.siwe = { address };
        await req.session.save();
        res.json({ ok: true });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
