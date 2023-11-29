import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_TaIGK3rsMEKklkFcwlsXQnzMHzIcWi9oBOFV02xixfWvhpAsIvH0VzMASm6lgRn4';

const breedSelect = document.querySelector('.breed-select');

const fetchCatByBreed = breedId => {
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};

const handleBreedSelect = e => {
  const selectedBreed = e.target.value;
  fetchCatByBreed(selectedBreed);
};
breedSelect.addEventListener('change', handleBreedSelect);

const fetchBreeds = () => {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(res => {
      const breedData = res.data;

      breedData.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(err => console.log(err));
};

export { fetchBreeds };
