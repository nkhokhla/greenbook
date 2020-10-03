//   allNews   - масив з об'єктами всі новини в цій папці файл news-database.js
const newsFeeld = document.querySelector("#news-area");      // 


function createObject(tag,newsStyleClass,newsText){ 
	let localObject = document.createElement(tag)
	localObject.className = newsStyleClass;
	localObject.innerHTML = newsText;
	return localObject
}


function displayObject(parentObject,placendObject){
	parentObject.appendChild(placendObject)
}


function initialNewsRender(newsArea, cardStyleClass){
	if(newsArea && newsFeeld){
		newsFeeld.innerHTML = "";
		for(let i in newsArea){
			console.log(newsArea[i])
	        let cardText= `<img src="${newsArea[i].img}" class="card-img-top" alt="...">
	              <div class="card-body">
	                <h5 class="card-title">${newsArea[i].name}</h5>
	                <p class="card-text">${newsArea[i].fullText.substring(0, 120)}...</p>
	                <a href="${newsArea[i].linkToSinglepage}" class="btn btn-success">Go somewhere</a>
	              </div>`;
			let newsCard = createObject("div",cardStyleClass ,cardText);
			displayObject(newsFeeld,newsCard)
		}
	}
}
initialNewsRender(allNews, "card cards-width col-md-4 col-sm-12 ");

//  =====================   Single page 

let currentPageInfo = {};

let headerImg = document.querySelector("#header-img");
let newsName = document.querySelector("#news-name");
let newsPicture = document.querySelector("#news-picture");
let pictureDescription = document.querySelector("#picture-description");
let mainDescription = document.querySelector("#main-description");
let otherPictures = document.querySelector("#other-pictures");
let originalLink = document.querySelector("#original-link");


function getPageId(){
	let localLink = location.search;
	localLink = localLink.split("id=");
	localLink = localLink[localLink.length-1];
	if(localLink){
		findNews(localLink);
	}
}
getPageId()


function findNews(id){
	let result = allNews.find( obj => {
		return obj.id == parseInt(id)
	})
	if(result){
		currentPageInfo = result;
		displaySingleNews()
	}
}

function displaySingleNews(){
	if(currentPageInfo){
		headerImg.src = currentPageInfo.img;
		newsName.innerHTML = `<h1>${currentPageInfo.name}</h1>`;
		newsPicture.src = currentPageInfo.newsPicture;
		pictureDescription.innerHTML = currentPageInfo.picturesDescription;
		mainDescription.innerHTML = currentPageInfo.fullText;

		originalLink.innerHTML = `<a href="${currentPageInfo.originalLink}">${currentPageInfo.originalLink}</a>`;

		currentPageInfo.otherPictures.forEach( obj => {
			let newPic = document.createElement("img");
			newPic.src = obj;
			newPic.className = "other-pictures-bottom";
			
			displayObject(otherPictures, newPic);
		})
		initialNewsRender(allNews, "card cards-single ");
	}
}

/*
ppfpsdpf


asdasdasdd

asdasdasdasdas
as
dassdsad
asdasd
*/