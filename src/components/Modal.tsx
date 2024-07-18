import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import './Modal.css'
import { useGroup } from "../context/GroupContext";
import { ModalType } from "../types/types";

function Modal(props: ModalType) {
  const {isModalOpen, closeModal}= useGroup()
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