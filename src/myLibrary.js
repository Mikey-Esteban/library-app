const myLibrary = (() => {

  let library;
  // let count;

  // Lookup localStorage for library
  const result = myStorage.getItem('library');
  if (result) {
    library = JSON.parse(result);
    // count = library.length

    // myStorage.setItem('count', library.length)
    console.log(`We have local storage!: ${library}`);
    // console.log(`Count is now: ${count}`);


    // UI function... why is it here?
    // for (let book of library) {
    //   updateBooksList(book);
    // }
  } else {
    library = [];
    // count = 0;
    myStorage.setItem('count', '0');
  }

  const addBookToLibrary = (book) => {
    library.push(book);
    // count++;

    //local storage
    myStorage.setItem('library', JSON.stringify(library))
    const newCount = parseInt(myStorage.getItem('count')) + 1;
    myStorage.setItem('count', newCount);
  }

  const removeBookFromLibrary = (book, id) => {
    library = library.filter( book => book.id !== id);

    //local storage
    myStorage.setItem('library', JSON.stringify(library))
  }

  const editBookReadStatus = (book) => {
    book.read === true? book.read = false : book.read = true;
  }

  const clearStorage = () => {
    // Remove each Book from Menu
    for (let book of library) {
      removeBookFromLibrary(book, book.id)
    }
    // clear myStorage cache
    myStorage.clear()
  }

  return {
    library,
    // count,
    addBookToLibrary,
    editBookReadStatus,
    removeBookFromLibrary,
    clearStorage
  }
})();
