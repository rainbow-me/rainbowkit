import { Session } from 'next-auth';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AccessDenied from './AccessDenied';

const UserInfo: React.FC<{
  session: Session | null;
}> = ({ session }) => {
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/userinfo');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  // If session exists, display content
  return (
    <>
      <h1>UserInfo Section</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{ borderRadius: '50%', marginRight: 5 }}
          src={session.user?.image!}
          width={45}
          height={45}
        />
        <span>{session.user?.name}</span>
      </div>
      <p>
        <strong>{content ?? '\u00a0'}</strong>
      </p>
    </>
  );
};

export default UserInfo;
