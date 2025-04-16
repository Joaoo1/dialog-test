import { useEffect } from 'react';

export const useActionOnEsc = (action: () => void) => {
  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        action();
      }
    }

    document.addEventListener('keydown', onKeyPress);

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [action]);
};
