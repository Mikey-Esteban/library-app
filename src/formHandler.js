const addBookToLibrary= (event) => {
  ////// UI //////
  event.preventDefault();
  const form = event.target

  let title = form.querySelector('input[name=title]');
  let author = form.querySelector('input[name=author]');
  let pages = form.querySelector('input[name=pages]');
  let radios = form.querySelectorAll('input[name=read]');
  let read;
  for (let radio of radios) {
    if (radio.checked) {
      radio.value === 'true' ? read = true : read = false
    }
  }

  ////// Object //////
  // create new book instance
  const id = myLibrary.count;
  const newBook = BookFactory(id, title.value, author.value, pages.value, read)
  myLibrary.addBookToLibrary(newBook);

  ////// UI //////
  title.value = ''
  author.value = '';
  pages.value = '';
  for (let radio of radios) {
    if (radio.checked) { radio.checked = false}
  }

  updateBooksList(newBook)
}
