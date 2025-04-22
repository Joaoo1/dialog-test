import { useEffect, useState } from 'react';
import { Sizes } from '../styles/sizes';

export const useHeaderHeight = () => {
  const [isShrunken, setShrunken] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shrunken =
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100;

      setShrunken(shrunken);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isShrunken ? Sizes.ShrunkenHeaderHeight : Sizes.FullHeaderHeight;
};
