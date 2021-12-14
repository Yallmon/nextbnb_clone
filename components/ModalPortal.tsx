import React, {useEffect, useRef, useState} from "react";
import { createPortal } from "react-dom";

type Iprops = {
    children: React.ReactNode;
    closePortal: ()=>void;
}

const ModalPortal = ({children, closePortal}: Iprops) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        if (document){
            const dom = document.querySelector("#root-modal");
            ref.current = dom;
        }
    }, []);
    if (ref.current && mounted) {
        return createPortal(
            <div className="container">
                <div className="modal-background" role="presentation" onClick={closePortal}>
                    {children}
                </div>
            </div>, ref.current
        );
    }
    return (null);
};

export default ModalPortal;