import View from "./View";

class SearchView extends View{
    _parentElement = document.querySelector('.search')

    addHandlerSubmit(handler){
        this._parentElement.addEventListener('submit',e => {
            e.preventDefault()
            handler()
        })
    }

    getQuery(){
        const query = this._parentElement.querySelector('.search__input').value
        this._clearInput()
        return query
    }

    _clearInput(){
        this._parentElement.querySelector('.search__input').value = ''
    }
}

export default new SearchView()