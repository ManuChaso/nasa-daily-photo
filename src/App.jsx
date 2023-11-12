import { useState, useEffect } from 'react'
import './App.css'

import DailyPhoto from './components/dailyPhoto/dailyPhoto';
import MarsPhoto from './components/marsPhoto/marsPhoto';

import NasaLogo from './assets/images/LogoNasa.png';
import SearchIcon from './assets/icons/lupa.png';
import LoadingIcon from './assets/icons/galaxia.png';

function App() {
  // Establece la api a la que solicitar la imagen. false: daily photo, true: Mars rover photo
  const [photoMode, setPhotoMode] = useState(false);
  const [inputDate, setInputDate] = useState(false);
  const [date, setDate] = useState()

  const fetchDataByDate = async () => {
    setDate(inputDate);
  }


  const LoadingComponent = () => {
    return(
      <div className='loading-component'>
        <img className='loading-icon' src={LoadingIcon} alt="Icono de carga" />
      </div>
    )
  }

  return (
    <div className='app'>
      <h1 className='title'>App Nasa <img src={NasaLogo} alt="Logo de la Nasa" /></h1>
      <div className='filter'>
        <div className='mode-selector'>
          <button onClick={() => setPhotoMode(false)} className={photoMode ? 'unselected-mode' : 'selected-mode'}>Daily photo</button>
          <button onClick={() => setPhotoMode(true)} className={photoMode ? 'selected-mode' : 'unselected-mode'}>Mars rover</button>
        </div>
        <div className='date-filter'>
          <input onChange={e => setInputDate(e.target.value)} type="date" className='input-date'/>
          <button onClick={fetchDataByDate} className='search'><img src={SearchIcon} alt="Icono de buscar" /></button>
        </div>
      </div>
      {photoMode ? <MarsPhoto loading={<LoadingComponent/>} date={date}/> : <DailyPhoto loading={<LoadingComponent/>} date={date}/>}
    </div>
  )
} 

export default App
