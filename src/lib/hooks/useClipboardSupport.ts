import { useState, useEffect } from 'react';

export function useClipboardSupport() {
  const [isClipboardSupported, setIsClipboardSupported] = useState(false);

  useEffect(() => {
    setIsClipboardSupported(!!navigator.clipboard);
  }, []);

  return isClipboardSupported;
}

