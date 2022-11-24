let slider = document.querySelector(".slider-contenedor")/*se crea variable y se selecciona un claas o un id*/
let sliderIndividual = document.querySelectorAll(".contenido-slider")
let contador = 1;
let width = sliderIndividual[0].clientWidth;/*la posicion del slider empieza en 0 y toma el width del primer slider*/
let intervalo = 5000;/*tiempo de intervalo entre sliders*/

window.addEventListener("resize", function(){
    width = sliderIndividual[0].clientWidth;
}) /*para trabajar responsive*/

setInterval(function(){
    slides();
},intervalo);/*cada que pase esta funcion y que cada 5 segundos se ejecute slider*/ 



function slides(){
    slider.style.transform = "translate("+(-width*contador)+"px)";/* esto permite el movimiento del slider */ 
    slider.style.transition = "transform .6s";/*difinir transicion y evitar que no caiga de golpe*/ 
    contador++;

    if(contador == sliderIndividual.length){/*dice cuantos elementos tengo */ 
        setTimeout(function(){/* cuando llegue a posicion final me lleves al punto original*/
            slider.style.transform = "translate(0px)";
            slider.style.transition = "transform 0s";
            contador=1;
        },1500)
    }
}





const container = document.getElementById('container');
const loading = document.querySelector('.loading');

getPost();
getPost();
getPost();

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight });
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		// show the loading animation
		showLoading();
	}
});

function showLoading() {
	loading.classList.add('show');
	
	// load more data
	setTimeout(getPost, 1000)
}

async function getPost() {
	const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNr()}`);
	const postData = await postResponse.json();
	
	const userResponse = await fetch('https://randomuser.me/api');
	const userData = await userResponse.json();
	
	const data = { post: postData, user: userData.results[0] };
	
	addDataToDOM(data);
}

function getRandomNr() {
	return Math.floor(Math.random() * 100) + 1;
}

function addDataToDOM(data) {
	const postElement = document.createElement('div');
	postElement.classList.add('blog-post');
	postElement.innerHTML = `
		<h2 class="title">${data.post.title}</h2>
		<p class="text">${data.post.body}</p>
		<div class="user-info">
			<img src="${data.user.picture.large}" alt="${data.user.name.first}" />
			<span>${data.user.name.first} ${data.user.name.last}</span>
		</div>
	`;
	container.appendChild(postElement);
	
	loading.classList.remove('show');
}