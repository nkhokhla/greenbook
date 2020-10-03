var prScrPos = window.pageYOffset; //previous scroll position

const menu = document.querySelector(".menu-wrapper");

window.onscroll = function () {
	var cScrPos = window.pageYOffset; //current scroll position
	if ((cScrPos < prScrPos) || (cScrPos < 82)) {		
		menu.style.top = "0";													
	} else {
		menu.style.top = "-82px";
	}
	prScrPos = cScrPos;
}


const formCarousel = document.querySelector("#form-carousel");
const modalButton = document.querySelector("#modal-button");
const alertBlock = document.querySelector("#alert-block");
const signUpForm = document.querySelector("#sign-up");
const logInForm = document.querySelector("#log-in");
const logInOutTab = document.querySelector("#log-in-out-tab");
const navLinkLogIn = document.querySelector("#nav-link-log-in");
const navLinkSignUp = document.querySelector("#nav-link-sign-up");

var disableSignUp = false;
var disableLogIn = false;

//slideNum = 0;
LIcarouselItemHeight = "220px"; //log in carousel item height
SUcarouselItemHeight ="550px";
$("#form-carousel").on('slide.bs.carousel', function() {
	let slideNum = $("#form-carousel .carousel-inner .active").index();
	if (slideNum == 1){
		modalButton.innerHTML = "Log in";
		$("#nav-link-log-in").addClass("active");
		$("#nav-link-log-in span").addClass("disabled");
		$("#nav-link-sign-up").removeClass("active");
		$("#nav-link-sign-up span").removeClass("disabled");
		$("#form-carousel .carousel-item").css("height",window.LIcarouselItemHeight);
		
		if (disableLogIn == true){
			$("#modal-button").attr("disabled", true);
		} else {
			$("#modal-button").attr("disabled", false);
		}

	} else {
		modalButton.innerHTML = "Sign up";
		$("#nav-link-log-in").removeClass("active");
		$("#nav-link-log-in span").removeClass("disabled");
		$("#nav-link-sign-up").addClass("active");
		$("#nav-link-sign-up span").addClass("disabled");
		$("#form-carousel .carousel-item").css("height",window.SUcarouselItemHeight);
		$("#exampleModalLong").css("height","100%");

		if (disableSignUp == true){
			$("#modal-button").attr("disabled", true);
		} else {
			$("#modal-button").attr("disabled", false);
		}
	}
});
$("#exampleModalLong").on("hidden.bs.modal", function(){
	$("#form-carousel").carousel(0);
	//$("#form-carousel").carousel("pause");
});

function CreateObject(arr){
	let userData = {};

	arr.forEach((param) =>{
		if (param.name){
			if (param.value){
				userData[param.name] = param.value;
			} else if (param.selectedIndex) {
				index = param.selectedIndex;
				userData[param.name] = param.options[index].value;
			}
		}
	})

	return userData
}

localStorage.setItem("loggedInUser", null);

function signUp() {
	let slideNum = $("#form-carousel .carousel-inner .active").index();
	if (slideNum == 0){
		let state = false;
		allUsers = JSON.parse(localStorage.allUsers);
		allUsers.forEach(element => {
			if (element.email == logInForm.elements["email"].value){
				state = true;
				userIndex = allUsers.indexOf(element);
			}
		})
		if (state == false){
			alertBlock.innerText = "You are not a user. Sign up first!";
			$("#form-carousel .carousel-item").css("height","247px");
			LIcarouselItemHeight = "247px";
			alertBlock.style.display = "block";
		} else {
			if (allUsers[userIndex].password == logInForm.elements["password"].value) {
				logInForm.style.display = "none";
				alertBlock.innerText = "You have successfully logged in";
				$("#modal-button").attr("disabled", true);
				$("#volunteer button").attr("data-target", "");
				$("#volunteer button").attr("disabled", true);
				// $("#volunteer button").addClass("unclickable");
				window.disableLogIn = true;
				$("#form-carousel .carousel-item").css("height","80px");
				LIcarouselItemHeight = "80px";
				alertBlock.style.display = "block";
				logInOutTab.innerText = "Log out";
				logInOutTab.setAttribute("data-target", "#logOutModal");
				localStorage.setItem("loggedInUser", JSON.stringify(allUsers[userIndex]));
				$("#user-name").text(`User: ${allUsers[userIndex].email}`);
			} else {
				$("#form-carousel .carousel-item").css("height","247px");
				LIcarouselItemHeight = "247px";
				alertBlock.innerText = "Wrong password";
				alertBlock.style.display = "block";
			}
	}

	} else {
		let userData = CreateObject([...signUpForm]);
		//transformLocalStorageData(userData);
		/*$("#sign-up").css("display", "none")
		$("#form-carousel .carousel-item").css("height", "80px");
		SUcarouselItemHeight = "80px";
		$("#response-block").css("display", "block");*/
		
		if (signUpForm.checkValidity()){
			transformLocalStorageData(userData);
			$("#sign-up").css("display", "none")
			$("#form-carousel .carousel-item").css("height", "80px");
			SUcarouselItemHeight = "80px";
			$("#response-block").text("You have successfully signed up. Only one user per device is permitted.")
			$("#response-block").css("display", "block");
			$("#modal-button").attr("disabled", true);
			window.disableSignUp = true;
		} else {
			$("#form-carousel .carousel-item").css("height", "577px");
			SUcarouselItemHeight = "577px";
			$("#response-block").text("Invalid data entered.");
			$("#response-block").css("display", "block"); 
		}
	}
}


function transformLocalStorageData(newUser){
	let allLocalUsers = localStorage.getItem("allUsers");
	allLocalUsers = JSON.parse(allLocalUsers);
	let localArr = (allLocalUsers && allLocalUsers.length!=0)? allLocalUsers  : [];

	if(newUser){
		localArr.push(newUser);
		localStorage.setItem("allUsers", JSON.stringify(localArr))
	}
}

function logOut() {
	$("#form-carousel").carousel("pause");

	logInOutTab.innerText = "Log in";
	logInOutTab.setAttribute("data-target", "#exampleModalLong");
	localStorage.setItem("loggedInUser", null);
	$("#modal-button").attr("disabled", false);
	
	$("#form-carousel .carousel-item").css("height","247px");
	logInForm.style.display = "block";
	LIcarouselItemHeight = "247px";
	alertBlock.style.display = "none";
	$("#log-in").trigger("reset");

	window.disableLogIn = false;

}

//just dont mind
setInterval(function() {
	$("#form-carousel").carousel("pause");
}, 1)