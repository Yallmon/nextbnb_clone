import React, {useRef, useEffect, useState} from "react";
import { createPortal } from "react-dom";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .modal-background {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

function useModal() {
    const [modalOpened, setModalOpened] = useState(false);

    const openModalPortal = () => {
        setModalOpened(true);
    };
    const closeModalPortal = (event: React.MouseEvent<HTMLDivElement>) => {
        if(event.target == event.currentTarget){
            setModalOpened(false);
        }
    };

    type Iprops = {
        children: React.ReactNode;
    };

    function ModalPortal({children}:Iprops) {
        const ref = useRef<Element | null>();
        const [mounted, setMounted] = useState(false);
        useEffect(() => {
            setMounted(true);
            if (document){
                const dom = document.querySelector("#root-modal");
                ref.current = dom;
            }
        }, []);

        if (ref.current && mounted && modalOpened) {
            return createPortal(
                <Container>
                    <div className="modal-background" role="presentation" onClick={closeModalPortal}>
                        {children}
                    </div>
                </Container>, ref.current
            );
        }
        return (null);
    }

    return {
        openModalPortal,
        closeModalPortal,
        ModalPortal
    };
}

export default useModal;