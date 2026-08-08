import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
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

        // Bind SIWE domain to this app host (parity with with-next-siwe-next-auth).
        // Without this check, a signature minted for an attacker-controlled domain
        // can be replayed against this verify endpoint under a stolen/own nonce.
        const expectedHost = req.headers.host;
        if (!expectedHost || siweMessage.domain !== expectedHost) {
          return res.status(422).json({ message: 'Invalid domain.' });
        }

        if (siweMessage.nonce !== req.session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' });

        const success = await publicClient.verifyMessage({
          address: siweMessage.address,
          message,
          signature,
        });

        if (!success) throw new Error('Invalid signature.');

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
