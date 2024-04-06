import {ReactNode, useEffect, useState} from "react";
import {Modal} from "flowbite-react";

interface Props {
    title: string;
    children: ReactNode;
    showModal: boolean;
    setShowModal: ((state: boolean) => void)
}

export function CustomModal({ title, children, showModal, setShowModal } : Props) {
    useEffect(() => {
        console.log(showModal)
    }, [showModal]);

    return (
        <Modal dismissable show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
}