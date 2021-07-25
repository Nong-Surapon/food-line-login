import React, { useEffect, useState } from 'react';
import './App.css';
import liff from '@line/liff';

function App() {
  const [pictureUrl, setPictureUrl] = useState(
    'https://profile.line-scdn.net/0hp4UmLn1zLxtoFAaAdIxQTFRRIXYfOilTEHc0Lh8UeHlNcWkfAyVmdUsTcyNCI2odB3MzeERBJCpC/preview'
  );
  const [idToken, setIdToken] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [userId, setuserId] = useState('');

  const logout = () => {
    console.log('logout');
    liff.logout();
    window.location.reload();
  };

  const getLine = () => {
    liff
      .init({
        liffId: '1655207232-0MxWBN5K',
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          runApp();
        }
      })
      .catch((err) => {
        document.getElementById('liffAppContent').classList.add('hidden');
        document
          .getElementById('liffInitErrorMessage')
          .classList.remove('hidden');
      });
  };

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff
      .getProfile()
      .then((profile) => {
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
    <div className="App">
      <>
        <h1>Line Login</h1>
        <img src={pictureUrl} alt="Logo" />
        <h2>{idToken}</h2>
        <h2>{displayName}</h2>
        <h2>{statusMessage}</h2>
        <h2>{userId}</h2>
        <botton onClick={() => logout()} type="primary">
          Logout
        </botton>
      </>
    </div>
  );
}

export default App;
