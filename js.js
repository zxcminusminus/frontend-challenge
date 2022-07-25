const home = document.getElementById('home')
const liked = document.getElementById('liked')
const nav = document.getElementById('nav-tab')

nav.addEventListener('click', tabSwitcher);
home.addEventListener('click', likeFunction)
liked.addEventListener('click', dislikeFunction)

function dislikeFunction(event){
    let dislikedPic;
    if(event.target.classList.contains('like_pic')){
        dislikedPic=event.target.parentElement
        dislikedPic.remove()
    }
}
function likeFunction(event){
    let likedPic;
    if(event.target.classList.contains('like_pic')){
        likedPic=event.target.parentElement
        liked.innerHTML+=`
        <div class="cat">
                  <img class="cat_pic"  src="${likedPic.children[0].src}" alt="">  
                    <img class="like_pic" src="icons/like-active.svg">
                </div>`
    }
}
async function getCats(){
   return  await fetch("https://api.thecatapi.com/v1/images/search?limit=20", {
        headers: {
            "X-Api-Key": "165dba78-57d1-4b34-8492-c0fe7e5db653"
        }
    }).then(data => data.json())
}

function createCat(catData){
    let cat = document.createElement("div");
    cat.classList.add("cat");
    cat.setAttribute("id", catData.url.split("/")[4]);
    let catPic = document.createElement("img");
    catPic.setAttribute("src", catData.url);
    catPic.classList.add("cat_pic")
    let likeBtn = document.createElement("img");
    likeBtn.setAttribute("src", "icons/like.svg");
    likeBtn.classList.add("like_pic");

    cat.appendChild(catPic); cat.appendChild(likeBtn);

    return cat;
}
function showCats(arrayCats){
    arrayCats.forEach(c=>{
        home.appendChild(createCat(c));
    })
}
function upload(){
    let data = getCats();
    data.then(r=>showCats(r));
}

function tabSwitcher(event) {
    let activeTabs = document.querySelectorAll('.active');

    activeTabs.forEach(tab=> {
        tab.className = tab.className.replace('active', '');
    });

    event.target.parentElement.className += ' active';
    document.getElementById(event.target.href.split('#')[1]).className += ' active';
}
upload();
