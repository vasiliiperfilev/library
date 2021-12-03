library = [];

const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".bookForm");
const bookTemplate = document.querySelector("#bookCardTemplate");

document.querySelector(".btn.addBook").addEventListener('click', showBookForm);
document.querySelector(".btn.submit").addEventListener('click', createBook);
overlay.addEventListener('click', closeBookForm)
bookForm.addEventListener('click', (e) => e.stopPropagation());

function Book(title, author, pages, isFinished){
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
    overlay.style.display = 'none';
    bookForm.style.display = 'none';
}

function createBook(e) {
    e.preventDefault();

    const inputs = document.querySelectorAll(".bookParam");
    const inputValues = [];
    inputs.forEach((input) => inputValues.push(input.value))
    const newBook = new Book(...inputValues);
    
    const clone = document.importNode(bookTemplate.content, true); 
    clone.querySelector(".title").textContent = newBook.title;
    clone.querySelector(".author").textContent = newBook.author;
    clone.querySelector(".pages").textContent = newBook.pages;
    document.body.querySelector(".booksContainer").appendChild(clone);
}