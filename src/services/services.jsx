import axios from "axios";
import credentials from './credential.json';

export function getDailyPhoto(){
    return new Promise((resolve, reject) => {
        axios.get(credentials.url + '?api_key=' + credentials.apiKey)
        .then((response) => {
            resolve(response.data);
        })
        .catch((err) => {
            reject(new Error('Error al obtener los datos: ' + err));
        });
    });
}

export function getPhotoByDate(date){
    return new Promise((resolve, reject) => {
        axios.get(credentials.url + '?api_key=' + credentials.apiKey + '&date=' + date)
        .then((response) => {
            resolve(response.data);
        })
        .catch((err) => {
            reject(new Error('Error al obtener los datos: ' + err));
        });
    });
}

export function getMarsPhoto(date){
    return new Promise((resolve, reject) => {
        axios.get(credentials.url_mars + date +'&api_key=' + credentials.apiKey)
        .then((response) => {
            resolve(response.data.photos);
        })
        .catch((err) => {
            reject(new Error('Error al obtener los datos: ' + err));
        });
    });
}
