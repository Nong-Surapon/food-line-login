import React, { useEffect, useState } from 'react';
import './App.css';
const liff = window.liff;

function App() {
  const [pictureUrl, setPictureUrl] = useState('');
  const [idToken, setIdToken] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [userId, setUserId] = useState('');

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  async function fetchLiff() {
    await liff.init({ liffId: `1655207232-0MxWBN5K` }).catch((err) => {
      throw err;
    });
    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile();
      console.log(getProfile);
      setIdToken(getProfile.idToken);
      setDisplayName(getProfile.displayName);
      setStatusMessage(getProfile.statusMessage);
      setUserId(getProfile.userId);
      setPictureUrl(getProfile.pictureUrl);
      // window.location.href =
      //   'https://docs.google.com/forms/d/e/1FAIpQLSdH7uwMINodj3dJSPpss-_DnJIiQ4t_U0TnJ__rZDamfbDUdA/viewform?usp=pp_url&entry.862938837=' +
      //   getProfile.userId +
      //   '&entry.428673667=' +
      //   getProfile.displayName +
      //   '&entry.845592098=' +
      //   getProfile.pictureUrl;
    } else {
      liff.login();
    }
  }

  useEffect(() => {
    fetchLiff();
  }, []);

  return (
    <div className="App">
      <>
        <h1>Line Login</h1>
        <img src={pictureUrl} alt="Logo" />
        <h2>idToken: {idToken}</h2>
        <h2>displayName: {displayName}</h2>
        <h2>statusMessage: {statusMessage}</h2>
        <h2>userId: {userId}</h2>
        <botton onClick={() => logout()} type="primary">
          Logout
        </botton>
      </>
    </div>
  );
}

export default App;
