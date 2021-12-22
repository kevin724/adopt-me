import { doc } from "prettier";
import { useEffect, useRef, FunctionComponent, MutableRefObject } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {
  // useRef is a container for state that you want to survive past render cycles
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  // create exactly one div and keep using it past renders until we dispose of the modal
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    if (!modalRoot || !elRef.current) {
      return;
    }
    // whenever it gets created, insert into DOM and remove when done
    // prevents memory leaks
    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
