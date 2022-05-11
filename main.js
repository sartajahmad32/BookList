class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}
//console.log(JS)

class UI{

   static addBookToList(book){
        const list = document.querySelector("#book-list")
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class ="btn btn-danger btn-sm delete">X</a></td>`
       
        list.appendChild(row);
    }

  static clearAllFields(){
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("isbn").value = ""
  }

  static showAlert(msg,className){
      const div = document.createElement("div")
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(msg));
      const container = document.querySelector(".container")
      const form = document.querySelector("#book-form")
      container.insertBefore(div,form)
      setTimeout(()=>{
          document.querySelector(".alert").remove()
      },3000)
  }

  static deleteBook(el){
      if(el.classList.contains("delete")){
          if(confirm("Are you sure")){
              el.parentElement.parentElement.remove()
          }
      }
  }

 static dispayBooks(){
    //  const StoredBooks = [
    //      {
    //          title:'Book one',
    //          author:'Unknown',
    //          isbn:"1430",

    //      },
    //      {
    //         title:"Book Two",
    //         author:"Unknown",
    //         isbn:"1431"

    //     },
    //     {
    //         title:"Book Three",
    //         author:"Unknown",
    //         isbn:"1432",

    //     },
    //  ]
    const StoredBooks = Store.getBooks();
     StoredBooks.forEach((book) =>{
         UI.addBookToList(book)
     })
 }

}

class Store{

    static getBooks(){
        let books;
        if(localStorage.getItem("books") == null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;
    }

    static addBooks(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book,index){
        if(book.isbn == isbn){
            books.splice(index,1);
        }
        })
        localStorage.setItem("books",JSON.stringify(books));
    }

}

//Event Display book
document.addEventListener("DOMContentLoaded",UI.dispayBooks)

//Event to add a book
document.querySelector("#book-form").addEventListener("submit",(e)=>{
    e.preventDefault();

   const title = document.getElementById("title").value;
   const author = document.getElementById("author").value;
   const isbn = document.getElementById("isbn").value;
//    console.log(title,author,isbn)
    if(author == "" || isbn == "" || title == ""){
        UI.showAlert("Please fill the Above details","danger")
    }else{
        const book = new Book(title,author,isbn)
    // console.log(book)

        UI.addBookToList(book)
        Store.addBooks(book)
        UI.clearAllFields()
        // alert("Bood Added")
        UI.showAlert("Book Added Successfully","success");
    }
    
})
//Event remove a book
document.querySelector("#book-list").addEventListener("click",(e) =>{
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert("Book deleted successfully","success")
})