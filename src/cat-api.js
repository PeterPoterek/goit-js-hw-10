import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_TaIGK3rsMEKklkFcwlsXQnzMHzIcWi9oBOFV02xixfWvhpAsIvH0VzMASm6lgRn4';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const slimSelect = new SlimSelect({
  select: breedSelect,
});
const ssMain = document.querySelector('.ss-main');
console.log(ssMain);

breedSelect.style.display = 'none';
error.style.display = 'none';
ssMain.style.display = 'none';

const showErrorMessage = err => {
  breedSelect.style.display = 'none';
  loader.style.display = 'none';
  catInfo.style.display = 'none';
  error.style.display = 'block';

  console.log(err);
  Notiflix.Notify.failure('Error');
};

const hideLoader = () => {
  ssMain.style.display = 'inline-flex';

  loader.style.display = 'none';
};
const showLoader = () => {
  ssMain.style.display = 'none';
  catInfo.style.display = 'none';
  loader.style.display = 'flex';
};

const fetchCatByBreed = breedId => {
  showLoader();
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => {
      ssMain.style.display = 'inline-flex';
      catInfo.style.display = 'flex';
      loader.style.display = 'none';

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

      hideLoader();
      const optionsData = [];

      breedData.forEach(breed => {
        const option = { text: breed.name, value: breed.id };
        breedSelect.appendChild(document.createElement('option'));
        optionsData.push(option);
      });

      slimSelect.setData(optionsData);
    })
    .catch(err => {
      showErrorMessage(err);
    });
};

export { fetchBreeds, fetchCatByBreed };
