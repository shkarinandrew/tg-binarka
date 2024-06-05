import { FC, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { createWrapperAndAppendToBody } from '../../utils/createWrapperAndAppendToBody';
import { IReactPortal } from './ReactPortal.interface';

const ReactPortal: FC<IReactPortal> = ({
  children,
  wrapperId = 'react-portal-wrapper',
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default ReactPortal;
