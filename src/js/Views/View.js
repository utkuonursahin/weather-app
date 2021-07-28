import icons from '../../images/sprite.svg'; // Parcel 1

class View{
    _data;
    addHandlerLoad(handler){window.addEventListener('load',handler)}
    _addHandlerModal(){
        const btnClose = document.querySelector('.message__close')
        const message = document.querySelector('.message')
        btnClose.addEventListener('click',()=> message.remove())
    }

    renderSpinner(){
        const markup = `
         <div class="spinner">
            <svg class="">
                <use href="${icons}#icon-spinner" class=""></use>
            </svg>
        </div> `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderInformation(message){
        const markup = `
         <div class="message">
            <svg class="message__close">
                <use href="${icons}#icon-close" class="message__close--svg"></use>
            </svg>
            <svg class="message__alert">
                <use href="${icons}#icon-warning" class="message__alert--svg"></use>
            </svg>
            <span class="message__text">${message}</span>
        </div>`
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
        this._addHandlerModal()
    }

    _clear(){this._parentElement.innerHTML = ''}

    render(data){
        this._data = data
        const markup = this._createMarkup()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }
}

export default View