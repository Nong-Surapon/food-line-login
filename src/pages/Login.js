import React, { useState, useEffect } from 'react';

import liff from '@line/liff/dist/lib';
import { Form, Input, Button, Checkbox } from 'antd';

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

  const initLine = () => {
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
    initLine();
  }, []);

  return (
    <>
      <h1>Line Login</h1>
      <img src={pictureUrl} width="300px" height="300px" />
      <h2>{idToken}</h2>
      <h2>{displayName}</h2>
      <h2>{statusMessage}</h2>
      <h2>{userId}</h2>
    </>
  );
};

export default Login;
