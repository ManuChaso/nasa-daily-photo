import { useState, useEffect } from "react";
import './dailyPhoto.css';

import { getDailyPhoto, getPhotoByDate } from "../../services/services";
import Gallery from "../gallery/gallery";

export default function DailyPhoto(props){
    const [imageViewer, setImageViewer] = useState(false);
    const [dailyPhoto, setDailyPhoto] = useState();
    const [error, setError] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const actualDate = new Date();
        const selectedDate = new Date(props.date);

        if(selectedDate > actualDate){
            setError(true);
            setErrorMessage('Imposible pedir fotos del futuro, la tecnología aún no lo permite.')
        }else{
            setErrorMessage(false);
            const fetchData = async () => {
                try{
                    setError(false)
                    setLoading(true)
                    const response =  props.date ? await getPhotoByDate(props.date) : await getDailyPhoto();
                    setDailyPhoto(response);
                    setLoading(false)
                } catch (err) {
                  console.error(err);
                  setError(true);
                  setErrorMessage('No hay imágenes disponibles para esta fecha.');
                }
              }
              fetchData();
        }
    }, [props.date])

    const closeImageWindow = () => {
        setImageViewer(false);
    }

    return(
        (error ? <p className="error-message">{errorMessage}</p> :
        (loading ? props.loading : <div className="daily-photo">
        <div className="photo-data">
            <img onClick={() => setImageViewer(true)} src={dailyPhoto.hdurl} alt="Imagen diaria de la NASA." />
            <div className="description-image">
                <h2>{dailyPhoto.title}</h2>
                <p>{dailyPhoto.explanation}</p>
            </div>
        </div>
        <div className="copy-date">
            <p>Fecha: {dailyPhoto.date}</p>
            <p>Copyright: {dailyPhoto.copyright ? dailyPhoto.copyright : 'Desconocido'}</p>
        </div>
        <Gallery image={dailyPhoto.hdurl} show={imageViewer} closeWindow={closeImageWindow}/>
    </div>))
    )
}