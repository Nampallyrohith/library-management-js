let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let searchResultsEl = document.getElementById("searchResults");
let url = "https://apis.ccbp.in/book-store";

let searchInputVal = ""
let bookList = [];

function createAndAppendResult(data){
    let { title, author, imageLink} = data;
        
        // lets create the container in searchResultsEl
        // searchResultsEl.classList.add("book-card", "text-center", "col-12", "col-md-6", "mr-auto", "ml-auto");
        
        let columnEl = document.createElement("div");
        columnEl.classList.add("book-card", "col-md-6", "mr-auto", "ml-auto");
        searchResultsEl.appendChild(columnEl);

        // Create the book card container
        let bookCardEl = document.createElement("div");
        bookCardEl.classList.add("book-card", "text-center");
        columnEl.appendChild(bookCardEl);


        let imgEl = document.createElement("img");
        imgEl.src = imageLink;
        imgEl.classList.add("w-100", "img");
        bookCardEl.appendChild(imgEl);

        //create container for title and author

        let detailsContainer = document.createElement("div");
        bookCardEl.appendChild(detailsContainer);

        //lets add title below the img

        let titleEl = document.createElement("p");
        titleEl.textContent = title;
        titleEl.classList.add("text-black", "mt-3")
        detailsContainer.appendChild(titleEl);

        let authorName = document.createElement("p");
        authorName.textContent = author;
        authorName.classList.add("author");
        detailsContainer.appendChild(authorName);
        
        let overlayContainer = document.createElement('div');
        overlayContainer.classList.add("overlay");
        columnEl.appendChild(overlayContainer);

        let textContainer = document.createElement("div");
        textContainer.classList.add('text');
        overlayContainer.appendChild(textContainer);

        let addToCart = document.createElement('a')
        addToCart.textContent = "Add to Cart";
        addToCart.classList.add('cart');
        textContainer.appendChild(addToCart);
    
    
}


function displayAndAppend(bookList){
    for (let data of bookList){
        let booktitle = (data.title).toLowerCase();

        // if (searchInputVal === null){
        //     createAndAppendResult(data);
        // }

        if(booktitle.includes(searchInputVal.toLowerCase())){
            createAndAppendResult(data);
        }
        
    }

}


function getResponse(event){
    if (event.key === "Enter"){
        let options = {
            method: "GET",
        };
        searchResultsEl.textContent = "";
        let newUrl = url+"?title="+searchInputVal
        // spinner.classList.remove("d-none");
        fetch(newUrl, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData){
                console.log(newUrl)
                let eachData = jsonData.search_results
                console.log(eachData)
                bookList = eachData
                displayAndAppend(bookList);
                spinnerEl.classList.add("d-none");
            });
    }
    else{
        let options = {
            method: "GET",
        };
        // spinner.classList.remove("d-none");
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData){
                let eachData = jsonData.search_results
                bookList = eachData
                displayAndAppend(bookList);
                spinnerEl.classList.add("d-none");
            });
    }
}


function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    getResponse(event);
}


getResponse(searchInputVal);
searchInputEl.addEventListener("keydown", onChangeSearchInput);