import axios from "axios";
const BASE_URL ="https://youtube138.p.rapidapi.com"
const options = {

    params: {
      hl: 'en',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key': '8c519647a1mshedcb9123e8d1054p17a021jsnfb14a8dca58c',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  
 export const fetchDataFromApi = async (url) =>{
    const {data} =await axios.get(`${BASE_URL}/${url}`,options)
    return data;
  }

  