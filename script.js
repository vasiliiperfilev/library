library = [];

const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".bookForm");
const bookTemplate = document.querySelector("#bookCardTemplate");

document.querySelector(".btn.addBook").addEventListener('click', showBookForm);
document.querySelector(".btn.submit").addEventListener('click', createBook);
//close bookform if click on overlay
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
    overlay.style.display = 'none';
    bookForm.style.display = 'none';
}

function createBook(e) {
    //prevent submit from refreshing page
    e.preventDefault();

    const inputs = document.querySelectorAll(".bookParam");
    const inputValues = [];
    inputs.forEach((input) => inputValues.push(input.value))
    const newBook = new Book(...inputValues);
    newBook.isFinished = inputs[3].checked;
    library.push(newBook);
    
    const clone = document.importNode(bookTemplate.content, true); 
    clone.querySelector(".title").textContent = newBook.title;
    clone.querySelector(".author").textContent = newBook.author;
    clone.querySelector(".pages").textContent = newBook.pages;
    const readStateBtn = clone.querySelector(".readBook");
    //button state if not finished
    if (newBook.isFinished == false){
        readStateBtn.classList.add("bookIsNotRead");
        readStateBtn.classList.remove("readBook");
        readStateBtn.value = "Not read";
    }
    //add event listener to read button
    readStateBtn.addEventListener('click', changeReadState);

    document.body.querySelector(".booksContainer").appendChild(clone);
    closeBookForm();
}

function changeReadState(e){
    let bookCard = e.target.parentElement;
    let title = bookCard.querySelector(".title").textContent;
    let author = bookCard.querySelector(".author").textContent;
    let index = findBookIndex(title, author);
    let book = library[index];
    if (book.isFinished === false){
        let readStateBtn = bookCard.querySelector(".bookIsNotRead");
        book.isFinished = true;
        readStateBtn.classList.add("readBook");
        readStateBtn.classList.remove("bookIsNotRead");
        readStateBtn.value = "Read";
    }
    else {
        let readStateBtn = bookCard.querySelector(".readBook");
        book.isFinished = false;
        readStateBtn.classList.add("bookIsNotRead");
        readStateBtn.classList.remove("readBook");
        readStateBtn.value = "Not read";
    }
    library[index] = book;
}

function findBookIndex(title, author){
    for (let i = 0; i < library.length; i++){
        if (library[i].title === title && library[i].author === author){
            return i;
        }
    }
    return null;
}