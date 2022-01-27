import { BaseProvider, Web3Provider } from '@ethersproject/providers';
import { useEffect, useState } from 'react';

export const useENSWithAvatar = <T extends BaseProvider = Web3Provider>({
  address,
  provider,
  urlResolver,
}: {
  address: string;
  provider: T;
  urlResolver?: (address: string) => string;
}) => {
  const [avatar, setAvatar] = useState<string>();
  const [domain, setEnsDomain] = useState(address);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (provider && address) {
      const getENSInfo = async () => {
        const ensDomain = await provider.lookupAddress(address);

        if (!ensDomain) {
          setLoading(false);
          return;
        }

        setEnsDomain(ensDomain);

        const resolver = await provider.getResolver(ensDomain);
        if (resolver) {
          const avatar = await resolver.getText('avatar');

          if (avatar) {
            setAvatar(
              typeof urlResolver === 'function' ? urlResolver(avatar) : avatar
            );
          }

          setLoading(false);
        }
      };

      getENSInfo();
    }
  }, [provider, address]);

  return { avatar, domain, loading };
};
