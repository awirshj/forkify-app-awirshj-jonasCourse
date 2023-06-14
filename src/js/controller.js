// polyfilling
import 'regenerator-runtime/runtime';
import 'core-js';

import * as model from './model.js';

import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import { TIMEOUT_SEC, MODAL_CLOSE_SEC } from './config.js';
import addRecipeView from './view/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // 0) update result view to mark selected search result and bookmark pannel
    console.log(`dash bemoola 1`);
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
    //1) loading recipe
    recipeView.renderSpinner();
    // 2) render recipe
    await model.loadRecipe(id); // state updated
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // 1)load spinner
    resultsView.renderSpinner();
    // 2) get key of result
    const query = searchView.getQuery();

    if (!query) return;
    // 3) load data of result to state object and reset inital page of pagination(to 1)
    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultPage());
    // 5) render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    if (
      err.message ===
      `Request took too long! Timeout after ${TIMEOUT_SEC} second`
    )
      resultsView.renderError(resultsView._errorMessage2);

    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 1) display NEW result
  resultsView.render(model.getSearchResultPage(goToPage));
  // 2) render NEW pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServinges) {
  // update serving
  model.updateServinges(newServinges);
  // render recipe with new data
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) add/remove bookmark
  model.state.recipe.bookmarked
    ? model.deleteBookmark(model.state.recipe.id)
    : model.addBookmark(model.state.recipe);
  // 2) update recipe
  recipeView.update();
  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRcipe) {
  try {
    // lodading spinner
    addRecipeView.renderSpinner();
    // upload the new recipe
    await model.uploadRecipe(newRcipe);
    // render recipe and add that to bookmarks pannel
    recipeView.render(model.state.recipe);
    controlBookmarks(model.state.bookmarks);
    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // success message
    addRecipeView.renderMessage();

    // close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error(err);
  }
};

const init = function () {
  bookmarksView._addHandlerRender(controlBookmarks);

  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
