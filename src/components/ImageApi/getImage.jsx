import axios from 'axios';

export async function getImages(imageName, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=33189178-525f8a1defc89c7722c2aac0c&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
