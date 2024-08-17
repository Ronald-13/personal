import axios from "axios";

export const headers = {

}

export const baseURL = 'https://myportfolio-hc9g.et.r.appspot.com';
// export const baseURL = 'http://localhost:3013';

export const wakeUpServer = () => {
  return axios.get(`${baseURL}/`, {
    headers
   }).then((response) => {
      return response.data;
  });
}

export const getChat = (text: string) => {
  const body = {
    text
  }
  return axios.post(`${baseURL}/getChat`, body, {
    headers
   }).then((response) => {
      return response.data;
  });
}