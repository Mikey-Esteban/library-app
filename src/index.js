const addDropdownFunc = (el) => {
  ////// UI //////
  el.classList.add('dropdown')

  el.addEventListener('click', () => {
    el.classList.toggle('is-active');
    el.nextElementSibling.classList.toggle('hidden');
  })
}

const createButtonStyles = (button, status) => {
  if (status) {
    button.innerText = 'Read';
    button.classList.add('button', 'is-primary', 'is-small')
  } else {
    button.innerText = 'Unread'
    button.classList.add('button', 'is-danger', 'is-small')
  }
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

const removeBookFromMenu = (id) => {
  const LI = document.querySelector(`[data-id='${id}']`)
  LI.remove();
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// UI for Delete All Button
const deleteAllBooks = (() => {
  const deleteAllBtn = document.querySelector('#deleteBooksBtn');

  deleteAllBtn.addEventListener('click', () => {
    console.log('DELETE ALL RAN');
    const mainUL = document.querySelector('.menu-list');
    removeAllChildNodes(mainUL);
    myLibrary.clearStorage();
  });

})();

const updateBooksList = (book) => {

  ////// UI //////
  const mainUL = document.querySelector('.menu-list');

  // Parent LI of book title / anchor that holds book info
  const LI = document.createElement('LI');
  LI.setAttribute('data-id', book.id)
  const A = document.createElement('A');
  A.innerText = book.title;
  addDropdownFunc(A);

  // Child UL holding book info
  const childUL = document.createElement('UL');
  childUL.classList.add('hidden');

  const authorLI = document.createElement('LI');
  const authorA = document.createElement('A');
  authorA.innerText = `Author: ${book.author}`;
  authorLI.append(authorA);

  const pagesLI = document.createElement('LI');
  const pagesA = document.createElement('A');
  pagesA.innerText = `Pages: ${book.pages}`;
  pagesLI.append(pagesA);

  const readLI = document.createElement('LI');
  const readA = document.createElement('A');
  const readBUTTON = document.createElement('BUTTON');
  createButtonStyles(readBUTTON, book.read);
  readBUTTON.addEventListener('click', () => {
    handleReadButtonChange(readBUTTON);
    myLibrary.editBookReadStatus(book);
  });
  readA.append(readBUTTON);
  readLI.append(readA);

  const deleteLI = document.createElement('LI');
  const deleteA = document.createElement('A');
  deleteLI.classList.add('delete');
  deleteLI.addEventListener('click', () => {
    myLibrary.removeBookFromLibrary(book, book.id);
    removeBookFromMenu(book.id)
  });
  deleteLI.append(deleteA);

  childUL.append(authorLI, pagesLI, readLI, deleteLI);
  LI.append(A, childUL);
  mainUL.append(LI)

}

// ON RELOAD
for (let book of myLibrary.library) {
  updateBooksList(book);
}
