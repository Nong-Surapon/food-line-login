import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import liff from '@line/liff/dist/lib';

const Login = () => {
  const [pictureUrl, setPictureUrl] = useState('');
  const [idToken, setIdToken] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [userId, setuserId] = useState('');

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  const getLine = () => {
    liff.init(
      { liffId: '1655207232-0MxWBN5K' },
      () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      },
      (err) => console.error(err)
    );
  };

  const runApp = () => {
    const idToken = liff.getIDToken();
    console.log('idToken', idToken);
    setIdToken(idToken);

    liff
      .getProfile()
      .then((profile) => {
        console.log('profile', profile);
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        setuserId(profile.userId);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getLine();
  }, []);

  return (
    <>
      <h1>Line Login</h1>
      <Image width={200} src={pictureUrl} />
      <h2>{idToken}</h2>
      <h2>{displayName}</h2>
      <h2>{statusMessage}</h2>
      <h2>{userId}</h2>
      <button onClick={() => logout()} />
      Logout <button />
    </>
  );
};

export default Login;
