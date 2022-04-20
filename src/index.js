import './sass/main.scss';

// Import reference
import { refs } from './js/refs';

// Import markup
import { renderMarkup } from './js/renderMarkup';

// Import notifications
import { failedNotification } from './js/helpers/notification';
import { foundNotification } from './js/helpers/notification';
import { warningNotification } from './js/helpers/notification';

// Import API
import { getPictures } from './js/api/api-service';
// LightBox imports
import { lightbox } from './js/helpers/lightbox';
import { slowRender } from './js/helpers/lightbox';

let currentPage = 1;
// currentPage текущая страница запроса

let hitsLength = 0;
// hitsLength количество изображений

let totalHits = 0;
// totalHits количество изображений (500) на запрос

let inputValue = '';
// inputValue значение получаеммое из формы

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  inputValue = refs.form.elements.searchQuery.value;
  currentPage = 1;
  if (inputValue === '') {
    failedNotification();
    return;
  }

  const response = await getPictures(inputValue, currentPage);

  hitsLength = response.data.hits.length;
  totalHits = response.data.totalHits;

  if (totalHits > hitsLength) {
    refs.loadBtn.classList.remove('is-hidden');
  } else {
    refs.loadBtn.classList.add('is-hidden');
  }

  try {
    if (hitsLength === 0) {
      failedNotification();
    } else {
      foundNotification(totalHits);
      refs.gallery.innerHTML = renderMarkup(response.data.hits);
      lightbox();
      lightbox.refresh();
    }
  } catch (error) {
    console.error(error);
  }
  refs.form.reset();
}

refs.loadBtn.addEventListener('click', loadMorePictures);

async function loadMorePictures() {
  try {
    currentPage += 1;
    const response = await getPictures(inputValue, currentPage);

    refs.gallery.insertAdjacentHTML('beforeend', renderMarkup(response.data.hits));

    hitsLength += response.data.hits.length;
    lightbox.refresh();
    slowRender();
    if (hitsLength >= response.data.totalHits) {
      warningNotification();
      refs.loadBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}
