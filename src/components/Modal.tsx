import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import './Modal.css'
import { ModalType } from "../types/types";
import {useUser} from "../context/UserGroupContext.tsx";

function Modal(props: ModalType) {
  const {isModalOpen, closeModal}= useUser()
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(()=>{
    if(isModalOpen) dialogRef.current?.showModal();
    return () => dialogRef.current?.close();
  },[isModalOpen])
  return (
    createPortal(
      <dialog ref={dialogRef} onClose={closeModal}
      className="modal"
      >
      {props.children}
    </dialog>, document.getElementById("modal") as HTMLElement)
  )
}

export default Modal