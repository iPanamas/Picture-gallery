import axios from 'axios';

export async function getPictures(value, page) {
  const url = 'https://pixabay.com/api/';
  const API_KEY = '26793641-c5f33c7d474ec2bb748918a6c';
  const settings = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  const response = await axios.get(`${url}${settings}`);
  return response;
}
