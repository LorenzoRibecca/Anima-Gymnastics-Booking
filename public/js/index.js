/* eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { newClass } from './newClass';
import {
  updateSettings,
  updateClassSettings,
  deleteClass,
} from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

//  DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const newClassForm = document.querySelector('.newClass-form');
const updateClassForm = document.querySelector('.form-update-class');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const deleteBtn = document.querySelector('.btn--delete');
const bookBtn = document.getElementById('book-tour');
//  Delegations

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, phone, password, passwordConfirm);
  });
}

if (deleteBtn) {
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteClass();
  });
}

if (newClassForm) {
  newClassForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const venue = document.getElementById('venue').value;
    const term = document.getElementById('term').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const time1 = document.getElementById('time1').value;
    const duration = document.getElementById('duration').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const age = document.getElementById('age').value;
    const age1 = document.getElementById('age1').value;
    const maxCapacity = document.getElementById('maxCapacity').value;
    const description = document.getElementById('description').value;
    const fullPrice = document.getElementById('fullPrice').value;
    const classPrice = document.getElementById('classPrice').value;
    newClass(
      name,
      venue,
      term,
      day,
      time,
      time1,
      duration,
      startDate,
      endDate,
      age,
      age1,
      maxCapacity,
      description,
      fullPrice,
      classPrice
    );
  });
}

if (updateClassForm) {
  updateClassForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const venue = document.getElementById('venue').value;
    const term = document.getElementById('term').value;
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const time1 = document.getElementById('time1').value;
    const duration = document.getElementById('duration').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const age = document.getElementById('age').value;
    const age1 = document.getElementById('age1').value;
    const maxCapacity = document.getElementById('maxCapacity').value;
    const description = document.getElementById('description').value;
    const fullPrice = document.getElementById('fullPrice').value;
    const classPrice = document.getElementById('classPrice').value;

    updateClassSettings(
      name,
      venue,
      term,
      day,
      time,
      time1,
      duration,
      startDate,
      endDate,
      age,
      age1,
      maxCapacity,
      description,
      fullPrice,
      classPrice
    );
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
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
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
