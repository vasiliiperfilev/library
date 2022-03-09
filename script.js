library = [];

const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".bookForm");
const bookTemplate = document.querySelector("#bookCardTemplate");

document.querySelector(".btn.addBook").addEventListener('click', showBookForm);
document.querySelector(".bookForm").addEventListener('submit', addBookCard);

overlay.addEventListener('click', closeBookForm)
//stop propagation of closeBookForm in case of click on bookForm itself
bookForm.addEventListener('click', (e) => e.stopPropagation());

function Book(title, author, pages, isFinished, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isFinished = isFinished;
}

function showBookForm(){
    overlay.style.display = 'block';
    bookForm.style.display = 'flex';
    bookForm.classList.add("popUpAnim");
}

function closeBookForm() {
    bookForm.querySelectorAll(".bookParam").forEach((input => input.value = ""));
    bookForm.querySelector(".isFinishedInput").checked = false;
    overlay.style.display = 'none';
    bookForm.style.display = 'none';
}

function addBookCard(e) {
    e.preventDefault();
    let newBook = createBook();
    if (newBook){
        bookCard = createBookCardFromTemplate(newBook, bookTemplate)
        document.body.querySelector(".booksContainer").appendChild(bookCard);
        closeBookForm();
        library.push(newBook);
    }
}

function checkIfDuplicate(book){
    if (findBookIndex(book.title, book.author) != null) {
        alert("Book already exists!");
        return true;
    }
    return false;
}

function createBook(){
    const inputs = document.querySelectorAll(".bookParam");
    const inputValues = [];
    inputs.forEach((input) => inputValues.push(input.value))
    const newBook = new Book(...inputValues);
    newBook.isFinished = inputs[3].checked;
    if (checkIfDuplicate(newBook)) return false;
    return newBook;
}

function createBookCardFromTemplate(newBook, template){
    const templateClone = document.importNode(template.content, true); 
    templateClone.querySelector(".title").textContent = newBook.title;
    templateClone.querySelector(".author").textContent = newBook.author;
    templateClone.querySelector(".pages").textContent = newBook.pages;
    const readStateBtn = templateClone.querySelector(".readBook");
    const removeBookBtn = templateClone.querySelector(".btn.removeBook");
    setReadButtonStyle(newBook, readStateBtn);
    readStateBtn.addEventListener('click', changeReadState);
    removeBookBtn.addEventListener('click', removeBook);
    return templateClone;
}

function changeReadState(e){
    let index = findBookByCard(this.parentElement)[0];
    let book = findBookByCard(this.parentElement)[1];
    book.isFinished = !book.isFinished;
    setReadButtonStyle(book, this);
    library[index] = book;
}

function setReadButtonStyle(book, button) {
    if (book.isFinished === false){
        button.classList.add("bookIsNotRead");
        button.classList.remove("readBook");
        button.value = "Not read";
    }
    else {
        button.classList.add("readBook");
        button.classList.remove("bookIsNotRead");
        button.value = "Read";
    }
}

function findBookIndex(title, author){
    for (let i = 0; i < library.length; i++){
        if (library[i].title === title && library[i].author === author){
            return i;
        }
    }
    return null;
}

function findBookByCard(card){
    let title = card.querySelector(".title").textContent;
    let author = card.querySelector(".author").textContent;
    let index = findBookIndex(title, author);
    let book = library[index];
    return [index, book];
}

function removeBook() {
    let index = findBookByCard(this.parentElement)[0];
    library.splice(index,1);
    this.parentElement.remove();
}