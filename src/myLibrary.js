const myLibrary = (() => {
  let library = [];
  let count = 0;

  const addBookToLibrary = (book) => {
    library.push(book);
    count++;
  }

  const removeBookFromLibrary = (book, id) => {
    library = library.filter( book => book.id !== id);
  }

  const editBookReadStatus = (book) => {
    book.read === true? book.read = false : book.read = true;
  }

  return {
    library,
    count,
    addBookToLibrary,
    editBookReadStatus,
    removeBookFromLibrary
  }
})();
