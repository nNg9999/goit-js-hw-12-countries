import newfetchCountries from './fetchCountries';

import countriesListItemsTemplate from '../templates/countries-list-items.hbs';
import oneCountryListItemsTemplate from '../templates/countries-item.hbs';

import debounce from 'lodash.debounce';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '100',
  timeOut: '2000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const refs = {
  userInput: document.querySelector('#name-input'),
  countryList: document.querySelector('#country-list'),
};

refs.userInput.addEventListener('input', debounce(searchFormHandler, 500));

function searchFormHandler(e) {
  clearListItems();
  const searchQuery = refs.userInput.value || '';
  console.log(searchQuery);
  if (searchQuery) {
    fetchCountries(searchQuery);
  }
}

function fetchCountries(searchQuery) {
  newfetchCountries
    .fetchCountries(searchQuery)
    .then(data => {
      rendertListItems(data);
      // toastr.success('SUCCESS!');
    })
    .catch(toastr.error('ERROR!'));
}

function rendertListItems(items) {
  let markup = '';
  if (items.length === 1) {
    markup = countriesListItemsTemplate(items);
  } else if (items.length > 2 && items.length < 10) {
    markup = oneCountryListItemsTemplate(items);
  } else {
    toastr.error('Сountries more than 10 !');
  }
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.countryList.innerHTML = '';
}
