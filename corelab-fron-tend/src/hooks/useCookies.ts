import { useState, useEffect } from 'react';

export default function useCookies() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const cookies = localStorage.getItem('cookiesAccepted');
    if (cookies) setCookiesAccepted(true);
  }, []);

  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
  }

  return { cookiesAccepted, acceptCookies };
}
