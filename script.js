library = [];

const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".bookForm");

document.querySelector(".btn.addBook").addEventListener('click', showBookForm);
overlay.addEventListener('click', closeBookForm)
bookForm.addEventListener('click', (e) => e.stopPropagation());

function Book(title, author, pages, isFinished){
    this.title = title;
    this. author = author;
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