import { BaseProvider, Web3Provider } from '@ethersproject/providers';
import { useEffect, useState } from 'react';

export const useENSWithAvatar = <T extends BaseProvider = Web3Provider>({
  address,
  provider,
}: {
  address: string;
  provider: T;
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
            setAvatar(avatar);
          }

          setLoading(false);
        }
      };

      getENSInfo();
    }
  }, [provider, address]);

  return { avatar, domain, loading };
};
