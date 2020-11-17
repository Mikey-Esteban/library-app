// const addBookToLibrary= (event) => {
//
//   alert('i ran')
//   ////// UI //////
//   event.preventDefault();
//   const form = event.target
//
//   let title = form.querySelector('input[name=title]');
//   let author = form.querySelector('input[name=author]');
//   let pages = form.querySelector('input[name=pages]');
//   let radios = form.querySelectorAll('input[name=read]');
//   let read;
//   for (let radio of radios) {
//     if (radio.checked) {
//       radio.value === 'true' ? read = true : read = false
//     }
//   }
//
//   ////// Object //////
//   // create new book instance
//   const id = myLibrary.count;
//   const newBook = BookFactory(id, title.value, author.value, pages.value, read)
//   myLibrary.addBookToLibrary(newBook);
//
//   ////// UI //////
//   title.value = ''
//   author.value = '';
//   pages.value = '';
//   for (let radio of radios) {
//     if (radio.checked) { radio.checked = false}
//   }
//
//   updateBooksList(newBook)
// }

const addDropdownFunc = (el) => {
  ////// UI //////
  el.classList.add('dropdown')

  el.addEventListener('click', () => {
    el.classList.toggle('is-active');
    el.nextElementSibling.classList.toggle('hidden');
  })
}


const removeBookFromUI = (id) => {
  const LI = document.querySelector(`[data-id='${id}']`)
  console.log(LI);
  LI.remove();
}

const handleReadButtonChange = (button) => {
  if ( button.classList.contains('is-primary') ) {
    button.classList.remove('is-primary');
    button.classList.add('is-danger');
    button.innerText = 'Unread'
  } else {
    button.classList.remove('is-danger');
    button.classList.add('is-primary');
    button.innerText = 'Read'
  }
}

const updateBooksList = (book) => {

  ////// UI //////
  const mainUL = document.querySelector('.menu-list');

  // add DOM elements
  // parent LI
  const LI = document.createElement('LI');
  LI.setAttribute('data-id', book.id)
  const A = document.createElement('A');

  // child UL holding book info
  const childUL = document.createElement('UL');
  childUL.classList.add('hidden');

  const authorLI = document.createElement('LI');
  const authorA = document.createElement('A');
  authorLI.append(authorA);

  const pagesLI = document.createElement('LI');
  const pagesA = document.createElement('A');
  pagesLI.append(pagesA);

  const readLI = document.createElement('LI');
  const readA = document.createElement('A');
  const readBUTTON = document.createElement('BUTTON');
  readLI.append(readA);
  readA.append(readBUTTON);

  const deleteLI = document.createElement('LI');
  const deleteA = document.createElement('A');
  deleteLI.append(deleteA);
  deleteLI.classList.add('delete')
  deleteLI.addEventListener('click', () => {
    myLibrary.removeBookFromLibrary(book, book.id);
    removeBookFromUI(book.id)
  })


  authorA.innerText = `Author: ${book.author}`
  pagesA.innerText = `Pages: ${book.pages}`
  if (book.read === true) {
    readBUTTON.innerText = 'Read';
    readBUTTON.classList.add('button', 'is-primary', 'is-small')
    readBUTTON.addEventListener('click', () => {
      handleReadButtonChange(readBUTTON);
      myLibrary.editBookReadStatus(book);
    })
  } else {
    readBUTTON.innerText = 'Unread'
    readBUTTON.classList.add('button', 'is-danger', 'is-small')
    readBUTTON.addEventListener('click', () => {
      handleReadButtonChange(readBUTTON);
      editBookReadStatus(book);
    })
  }
  // readBUTTON.innerText = `Read: ${book.read}`
  deleteA.innerText = 'Delete'

  childUL.append(authorLI, pagesLI, readLI, deleteLI);

  A.innerText = book.title
  LI.append(A, childUL);

  addDropdownFunc(A);

  mainUL.append(LI)

}
