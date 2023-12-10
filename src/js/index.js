import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const key = '37184762-fd326293791c817732540ec51';

const elements = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-gallery'),
  loadBtn: document.querySelector('.load-more'),
};

let search;

elements.form.addEventListener('submit', evt => {
  evt.preventDefault();
  const form = evt.currentTarget;
  search = form.elements.searchQuery.value;
  searchImages(search);
  form.reset();
});

elements.loadBtn.addEventListener('click', () => {
  searchMoreImages(search);
});

const gallery = new SimpleLightbox('.gallery > .photo-card > a');

let page;
let maxPages;

async function searchImages(text) {
  elements.loadBtn.hidden = true;
  elements.gallery.innerHTML = '';
  page = 1;

  text = text.trim();
  if (!text) {
    showMessage('error', 'Please, enter text to search and try again.');
    return;
  }
  try {
    const response = await fetchImages(text);
    maxPages = Math.ceil(response.data.totalHits / 40);
    const data = response.data.hits;
    if (!data.length) {
      showMessage(
        'error',
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      showMessage(
        'info',
        `Hooray! We found ${response.data.totalHits} images.`
      );
      elements.gallery.innerHTML = createPhotoMarkup(data);
      gallery.refresh();

      if (page < maxPages) {
        elements.loadBtn.hidden = false;
      } else {
        showMessage(
          'info',
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  } catch (error) {
    showMessage('error', 'Oops! Something went wrong! Please try again.');
  }
}

async function searchMoreImages(text) {
  elements.loadBtn.hidden = true;
  page += 1;

  try {
    const response = await fetchImages(text);
    const data = response.data.hits;
    elements.gallery.insertAdjacentHTML('beforeend', createPhotoMarkup(data));
    gallery.refresh();

    if (page < maxPages) {
      elements.loadBtn.hidden = false;
    } else {
      showMessage(
        'info',
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    showMessage('error', 'Oops! Something went wrong! Please try again.');
  }
}

function createPhotoMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <br />
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              <br />
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              <br />
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <br />
              ${downloads}
            </p>
          </div>
        </a>
      </div>`;
      }
    )
    .join('');
}

function showMessage(type, message) {
  let color;
  if (type === 'error') {
    color = '#f58e82';
  } else {
    color = '#9dfab5';
  }

  iziToast.show({
    messageColor: '#262121',
    backgroundColor: color,
    messageSize: '18px',
    position: 'bottomRight',
    progressBar: false,
    animateInside: false,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    timeout: 3000,
    targetFirst: false,
    message: message,
  });
}

function fetchImages(text) {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key,
      q: text,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 40,
    },
  });
}
