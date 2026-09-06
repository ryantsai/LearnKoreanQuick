import { useEffect, useState } from 'react';

export default function AudioNotice() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const show = (event) => setMessage(event.detail);
    const clear = () => setMessage('');
    window.addEventListener('lkq-audio-error', show);
    window.addEventListener('lkq-audio-ready', clear);
    return () => {
      window.removeEventListener('lkq-audio-error', show);
      window.removeEventListener('lkq-audio-ready', clear);
    };
  }, []);
  if (!message) return null;
  return <div className="audio-notice" role="alert">{message}<button onClick={() => setMessage('')} aria-label="關閉語音提示">關閉</button></div>;
}
