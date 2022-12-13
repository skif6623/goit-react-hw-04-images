import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (text, page) => {
  const response = await axios.get(`?key=26725186-0eb3948d92fc479f1d029e31a`, {
    params: {
      q: text,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
