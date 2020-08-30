/* console.log("Test");

window.addEventListener("scroll", () => {
console.log(window.innerHeight)
}) */

const commentElement = document.querySelector(".commentElement");
const formReset = document.querySelector("#formReset");
const formLoad = document.querySelector("#formLoad");
const loadingMore = document.querySelector("#loadingMore");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const url = new URL(location.toString())
let skip = 1;
let limit = url.searchParams.get("limit") > 0 ? url_str.searchParams.get("limit") : 5;
let isLoading = false;

formReset.addEventListener("submit", (event) => {
    event.preventDefault();
    commentElement.innerHTML = '';
})

formLoad.addEventListener("submit", (event) =>{
    event.preventDefault();
    loadComment(skip);
    //skip++;
})

window.addEventListener('scroll', () => {
    
    const rect = loadingMore.getBoundingClientRect();
    
    if(rect.top < window.innerHeight && isLoading == false){
        isLoading = true
        loadComment();
    }
})

function isInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight
    );
}

async function loadComment() {
    isLoading = true
    progress.style.display = "flex";
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0%");
    for (let index = 1; index < limit + 1; index++) {
        await sleep(100);
        progressBar.style.width = 100 / limit * index + "%";
        progressBar.setAttribute("aria-valuenow", 100 / limit * index + "%");
        await fetch(`https://jsonplaceholder.typicode.com/todos/${skip}`)
        .then(response => response.json())
        .then(comments => {
            const title = comments.title;
            console.log(title);

            const row = document.createElement('div');
            row.className = "row";
            row.style = "margin-top: 10px; margin-bottom: 10px;";
            const col = document.createElement('div');
            col.className = "col";
            
            const card = document.createElement('div');
            card.className = "card";

            const card_header = document.createElement('div');
            card_header.className = "card-header";

            const card_body = document.createElement('div');
            card_body.className = "card-body";

            const blockquote = document.createElement('blockquote');
            blockquote.className = "blockquote mb-0";

            const header = document.createElement('h3');
            header.textContent = skip;

            const content = document.createElement('p');
            content.textContent = title;

            const blockquote_p = document.createElement('p');
            blockquote_p.textContent = title;
        
            row.appendChild(col);
            col.appendChild(card);
            card.appendChild(card_header);
            card_header.appendChild(header);
            card.appendChild(card_body);
            card_body.appendChild(blockquote);
            blockquote.appendChild(content);


            commentElement.appendChild(row);

            //var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;

            //window.scroll(0,_docHeight);
            
        });
        skip++;
    }
    //return new Promise(resolve => setTimeout(resolve, ms));
    progress.style.display = "none";
    isLoading = false

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function initialLoad(){
    const rect = loadingMore.getBoundingClientRect();
    
    while(rect.top < window.innerHeight && isLoading == false){
        isLoading = true
        loadComment();
    }
};
initialLoad();