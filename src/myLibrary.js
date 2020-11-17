const myLibrary = (() => {

  let library;

  // Lookup localStorage for library
  const result = myStorage.getItem('library');
  if (result) {
    library = JSON.parse(result);
  } else {
    library = [];
    // initialize count for book ids
    myStorage.setItem('count', '0');
  }

  const addBookToLibrary = (book) => {
    library.push(book);

    //local storage
    myStorage.setItem('library', JSON.stringify(library));
    const newCount = parseInt(myStorage.getItem('count')) + 1;
    myStorage.setItem('count', newCount);
  }

  const removeBookFromLibrary = (book, id) => {
    library = library.filter( book => book.id !== id);

    //local storage
    myStorage.setItem('library', JSON.stringify(library));
  }

  const editBookReadStatus = (book) => {
    book.read === true? book.read = false : book.read = true;
  }

  const clearStorage = () => {
    // Remove each Book from Menu
    for (let book of library) {
      removeBookFromLibrary(book, book.id);
    }
    // clear myStorage cache
    myStorage.clear();
  }

  return {
    library,
    addBookToLibrary,
    editBookReadStatus,
    removeBookFromLibrary,
    clearStorage
  }
})();
