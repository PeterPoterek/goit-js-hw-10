import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_TaIGK3rsMEKklkFcwlsXQnzMHzIcWi9oBOFV02xixfWvhpAsIvH0VzMASm6lgRn4';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.style.display = 'none';
error.style.display = 'none';

const showErrorMessage = e => {
  console.log(e);
  breedSelect.style.display = 'none';
  loader.style.display = 'none';
  error.style.display = 'block';
};

const fetchCatByBreed = breedId => {
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => {
      console.log(res.data[0].url);

      let catTitle, catDescription, catTemperament, catImage;

      if (catInfo.children.length === 0) {
        catTitle = document.createElement('h1');
        catTitle.setAttribute('class', 'cat-info-title');

        catDescription = document.createElement('p');
        catDescription.setAttribute('class', 'cat-info-desc');

        catTemperament = document.createElement('p');
        catTemperament.setAttribute('class', 'cat-info-temperament');

        catImage = document.createElement('img');
        catImage.setAttribute('class', 'cat-info-img');

        catInfo.append(catTitle, catDescription, catTemperament, catImage);
      } else {
        catTitle = document.querySelector('.cat-info-title');
        catDescription = document.querySelector('.cat-info-desc');
        catTemperament = document.querySelector('.cat-info-temperament');
        catImage = document.querySelector('.cat-info-img');
      }

      catTitle.textContent = res.data[0].breeds[0].name;
      catDescription.textContent = res.data[0].breeds[0].description;
      catTemperament.innerHTML = `<span>Temperament:</span> ${res.data[0].breeds[0].temperament}`;
      catImage.setAttribute('src', res.data[0].url);
    })
    .catch(err => {
      showErrorMessage(err);
    });
};

const fetchBreeds = () => {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(res => {
      const breedData = res.data;

      breedSelect.style.display = 'block';
      loader.style.display = 'none';

      breedData.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(err => {
      showErrorMessage(err);
    });
};

export { fetchBreeds, fetchCatByBreed };
