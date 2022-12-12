import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?page=1&key=26725186-0eb3948d92fc479f1d029e31a&image_type=photo&orientation=horizontal&per_page=12';

export const getImages = async text => {
  const response = await axios.get(`&q=${text}`);
  return response.data;
};
