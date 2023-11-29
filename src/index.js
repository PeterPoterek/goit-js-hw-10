import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const handleBreedSelect = e => {
  const selectedBreed = e.target.value;
  fetchCatByBreed(selectedBreed);
};

breedSelect.addEventListener('change', handleBreedSelect);

fetchBreeds();
