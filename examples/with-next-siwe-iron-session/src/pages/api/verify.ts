import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseSiweMessage, type SiweMessage } from 'viem/siwe';

import { ironOptions } from '../../../lib/iron';
import { publicClient } from '../../wagmi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body;
        const siweMessage = parseSiweMessage(message) as SiweMessage;

        const success = await publicClient.verifyMessage({
          address: siweMessage.address,
          message,
          signature,
        });

        if (!success) throw new Error('Invalid signature.');

        if (siweMessage.nonce !== req.session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' });

        req.session.siwe = siweMessage;
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
