import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { submitReview, updateReview, deleteReview } from './review';
import { resizeImage } from './resize.js';
import { bookTour } from './stripe';

// DOM ELEMENTS

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const reviewForm = document.querySelector('.form--review');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.form--signup');
const reviewPage = document.getElementById('review__page');

// VALUES

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  const pfpUploadInput = document.getElementById('photo');

  pfpUploadInput.addEventListener('change', async e => {
    const inputPic = pfpUploadInput.files[0];

    if (inputPic) {
      const userPhotoElement = document.querySelector('.form__user-photo');
      resizeImage(inputPic, 500, 500, userPhotoElement);
    }
  });
  userDataForm.addEventListener('submit', async e => {
    e.preventDefault();
    const form = new FormData();
    const inputPic = pfpUploadInput.files[0];
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    if (inputPic) {
      const headerPhotoElement = document.querySelector('.nav__user-img');
      resizeImage(inputPic, 500, 500, headerPhotoElement);
    }
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });
}
if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    const tourId = header.dataset.tourId;
    submitReview(rating, review, tourId);
  });
}

if (reviewPage) {
  const btnDelete = document.querySelectorAll('.btn-delete');
  const btnUpdate = document.querySelectorAll('.btn-update');
  const rating = document.querySelectorAll('#rating');
  const review = document.querySelectorAll('#review');
  // console.log({ rating, review });
  btnUpdate.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      btn.textContent = 'Save';
      rating[i].disabled = false;
      review[i].disabled = false;
      btn.addEventListener('click', e => {
        const reviewId = btn.dataset.reviewId;
        // console.log(rating[i].value);
        btn.disabled = true;
        btn.textContent = 'Saving...';
        updateReview(reviewId, rating[i].value, review[i].value);
      });
    });
  });

  btnDelete.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      const reviewId = btn.dataset.reviewId;
      btn.textContent = 'Removing...';
      btn.disabled = true;
      deleteReview(reviewId);
    });
  });
}
