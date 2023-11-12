import { useState, useEffect } from "react";
import './marsPhoto.css';

import { getMarsPhoto } from "../../services/services";
import Gallery from "../gallery/gallery";


export default function MarsPhoto(props){
    const [marsImages, setMarsImages] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState();
    const [imageViewer, setImageViewer] = useState();
    const [invertedDate, setInvertedDate] = useState();
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() =>{
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      const date = props.date ? props.date : `${year}-${month}-${day - 1}`;

      const selectedDate = new Date(props.date);

      if(selectedDate > currentDate){
        setErrorMessage(true);
      }else{
        setErrorMessage(false);
        const fetchMarsData = async () => {
          try{
            setLoading(true);
            setInvertedDate(date);
            const response =  await getMarsPhoto(date);
            setMarsImages(response);
            setLoading(false);
          } catch (err) {
            console.error(err);
          }
      }
      
          fetchMarsData();
      }
    }, [props.date]);


    
    const openImage = (image) => {
      setImageViewer(true);
      setSelectedImage(image);
    }
    const closeImage = () => {
      setImageViewer(false)
    }



    return(
        (errorMessage ? <p className="error-message">Imposible pedir fotos del futuro, la tecnología aún no lo permite.</p> : 
        (loading ? props.loading :
          <div className="mars-photo">
            {marsImages.length <= 0 ? <h2>No hay imágenes para este día.</h2> : <h2>Imágenes correspondientes al día: {invertedDate}</h2>}
            <div className="images-template">
              {
               marsImages.map((image, index) => (
                   <img loading="lazy" onClick={() => openImage(image.img_src)} className="mars-image" src={image.img_src} alt="Imagen del rover" key={index}/>
               ))
              }
            </div>
            <Gallery show={imageViewer} image={selectedImage} closeWindow={closeImage}/>
          </div>))
    )
}