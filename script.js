library = [];

const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".bookForm");

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
    if (this != overlay) return;
    overlay.style.display = 'none';
    bookForm.style.display = 'none';
}

function createBook() {
    const inputs = document.querySelectorAll(".bookForm input");
    const inputValues = [];
    inputs.forEach((input) => inputValues.push(input.value))
    const newBook = new Book(...inputValues);
}