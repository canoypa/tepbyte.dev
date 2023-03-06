import { FC, PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return createPortal(children, document.body);
};
