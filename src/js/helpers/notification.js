import Notiflix from 'notiflix';

export function failedNotification() {
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

export function foundNotification(total) {
  return Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}

export function warningNotification() {
  return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
}

Notiflix.Notify.init({
  distance: '100px',
  opacity: 0.9,
  fontFamily: 'Sriracha',
  fontSize: '16px',
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  success: {
    background: '#287018',
    textColor: '#F9F0DA',
    notiflixIconColor: 'rgba(249, 240, 218, 1)',
  },
  failure: {
    background: '#892c2c',
    textColor: '#F9F0DA',
    notiflixIconColor: 'rgba(249, 240, 218, 1)',
  },
  warning: {
    background: '#e7a810',
    textColor: '#F9F0DA',
    notiflixIconColor: 'rgba(249, 240, 218, 1)',
  },
});
