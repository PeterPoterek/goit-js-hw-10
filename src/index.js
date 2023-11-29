import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_TaIGK3rsMEKklkFcwlsXQnzMHzIcWi9oBOFV02xixfWvhpAsIvH0VzMASm6lgRn4';

const breedSelect = document.querySelector('.breed-select');
const fetchBreeds = () => {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(res => {
      const breedData = res.data;
      console.log(breedData);

      breedData.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(err => console.log(err));
};
fetchBreeds();
