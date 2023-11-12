import { useState, useEffect } from "react";
import './gallery.css';

import CloseIcon from '../../assets/icons/cerrar.png';

export default function Gallery(props){

    return(
        <div className={props.show ? "image-viewer" : 'image-viewer-closed'}>
            <button onClick={props.closeWindow}><img className="close-icon" src={CloseIcon} alt="" /></button>
            <img src={props.image} alt="Imagen diaria de la nasa" />
        </div>
    )
}
