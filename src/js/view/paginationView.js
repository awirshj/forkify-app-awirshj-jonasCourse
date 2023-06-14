import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkUp() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    // page 1, there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkUpButton(false, true);
    }
    // page 1, there are NO other pages
    if (numPages === 1) {
      return ``;
    }
    //  Last page
    if (currentPage === numPages) {
      return this._generateMarkUpButton(true);
    }
    //  other pages
    if (currentPage < numPages) {
      return this._generateMarkUpButton(true, true);
    }
  }
  _generateMarkUpButton(prev = false, next = false) {
    const currentPage = this._data.page;
    return `${
      prev === true
        ? `<button data-goto= ${
            currentPage - 1
          } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`
        : ''
    }
           ${
             next === true
               ? `<button data-goto= ${
                   currentPage + 1
                 }  class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
               : ''
           }`;
  }
}

export default new PaginationView();
