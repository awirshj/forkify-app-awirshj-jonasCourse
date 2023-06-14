import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './View.js';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Not recipes found for you query! Please try again ;)';
  _errorMessage2 = 'Your connection is too low! Please try again ;)';
  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
