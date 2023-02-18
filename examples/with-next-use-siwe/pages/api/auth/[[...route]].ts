import { withIronSessionApiRoute } from 'iron-session/next';
import { siweApi } from '@randombits/use-siwe/next';
import ironOptions from '../../../lib/ironOptions';

export default withIronSessionApiRoute(siweApi(), ironOptions);
