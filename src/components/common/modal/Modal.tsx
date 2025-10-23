"use client";
import "./style.css";

import { useRouter } from "next/navigation";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ModalProps } from "./type";

const Modal: FC<ModalProps> = ({
  containerClassName = "bg-dr-white rounded-[32px]",
  closeClick,
  children,
  showModal,
  defaultClass = "grid overflow-auto z-[10] items-center",
  darkClass = "z-[9]",
  showDark = true,
  fromBottom,
  delay = 300,
  runFunctions = true,
  id = "modal_container",
  bookmarkId,
  fromUrl,
}) => {
  const [show, setShow] = useState<"open" | "hide" | "close">("open");
  const navigate = useRouter();
  const clearBookMark = useCallback(() => {
    if (runFunctions) {
      if (fromUrl)
        navigate.push(window.location.pathname); // Remove the bookmark without changing scroll position
      else if (bookmarkId) navigate.back();
    }
  }, [bookmarkId, fromUrl, navigate, runFunctions]);
  const containerElement =
    typeof window !== "undefined" ? document?.querySelector("body") : false;
  useEffect(() => {
    if (show === "hide") {
      setTimeout(() => closeClick(), delay);
    }
  }, [closeClick, show, delay]);
  //  this  for make  page not moved when modal open because modal remove body scroll
  useEffect(() => {
    const body = typeof window !== "undefined" && document?.documentElement;
    if (typeof window !== "undefined" && document && body && runFunctions) {
      const scrollBarCompensation =
        window.innerWidth - document.body.offsetWidth;
      body.style.overflowY = "hidden";
      document.body.style.paddingRight = `${scrollBarCompensation}px`;
      body.style.touchAction = "none";
      (body.style as any).msTouchAction = "none";
      // header style (48px is padding right of header if changing that should changing here)
    }
    return () => {
      if (typeof window !== "undefined" && body && runFunctions) {
        body.style.overflowY = "auto";
        document.body.style.paddingRight = "0";
        body.style.touchAction = "";
        (body.style as any).msTouchAction = "";
      }
    };
  }, [runFunctions]);
  //bookmark for modal
  useEffect(() => {
    if (bookmarkId) {
      if (showModal === "open") {
        window.location.hash = bookmarkId; // Add bookmark when modal opens
      } else if (showModal === "close") {
        clearBookMark(); // Remove bookmark safely when modal closes
      }
    }

    const handleBack = () => {
      if (showModal === "open") {
        setShow("hide");
      }
    };

    setShow(showModal);
    if (showModal === "hide" || (showModal === "close" && bookmarkId))
      clearBookMark();
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [showModal, bookmarkId, clearBookMark]);

  //handle close modal
  const handleClose = () => {
    setShow("hide");
    if (bookmarkId) clearBookMark();
  };
  return (
    //create portal for added this component to the  body  element because this make  modal easy to  use (no z-index  and overflow problems)
    containerElement &&
    createPortal(
      <>
        <article
          className={`${defaultClass} no-scroll max-xs:grid-cols-1 fixed left-0 top-0 h-full w-full cursor-pointer justify-items-center`}
          onClick={handleClose}
          id={id}
          dir="ltr"
        >
          {/* this div is for that time modal start from bottom and in large screen its get out 
          form bottom and if fromBottom is true then set content-between for container*/}
          {fromBottom && <div />}
          <div
            className={`${
              fromBottom
                ? show == "open"
                  ? "modal-to-top"
                  : "opacity-0"
                : show == "open"
                  ? "scale-in-center-open"
                  : "scale-in-center-close"
            } ${containerClassName} relative z-[8] w-full cursor-auto`}
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            role="button"
            tabIndex={0}
          >
            {children}
          </div>
        </article>

        {/* dark glass background */}
        {showDark && (
          <div
            className={` ${
              show == "open" ? "fade-open" : "fade-close"
            } ${darkClass} glass fixed left-0 top-0 h-full w-full`}
            style={{ transform: "scale(1)" }}
          />
        )}
      </>,
      containerElement!,
    )
  );
};
export default memo(Modal);

{
  /*usage
  1 - import lazy 
  const Modal = lazy(() => import("@/components/modal/Modal"));

  2- create state
   const [showServices, setShowServices] = useState<"open" | "hide" | "close">("close");

  3- use
  {showServices != "close" && (
   <Suspense>
    <Modal closeClick={() => setShowServices("close")}></Modal>
   </Suspense>
  )}
  
  */
}
