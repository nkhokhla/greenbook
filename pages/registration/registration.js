delayHiding = false; //view index.js 


const form = document.querySelector("#sign-up");

function CreateObject(arr){
	let object = {};

	arr.forEach((param) =>{
		if (param.name){
			if (param.value){
				object[param.name] = param.value;
			} else if (param.selectedIndex) {
				index = param.selectedIndex;
				object[param.name] = param.options[index].value;
			}
		}
	})

	console.log(object);
}

form.addEventListener("submit", function(event){
	event.preventDefault();
	CreateObject([...form])
})