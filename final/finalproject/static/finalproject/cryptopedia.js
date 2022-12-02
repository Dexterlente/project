document.addEventListener("DOMContentLoaded", function () {
	let now = new Date();
	let months =
	["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	// console.log(
	//     now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	//   );
	 document.getElementById('time').innerHTML = `
	    <ul>
	            <li>${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}</li>
	            <li>${dayNames[now.getDay()]} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li>
	    </ul>`
	// By default, load the inbox
	document.querySelector('#indexdex').addEventListener('click', () =>{
        clearSession();
    });
    document.querySelector('#cryptopediaload').addEventListener('click', () =>{
		clearSession();
});

	if (sessionStorage.getItem("postID") !== null) {
		const itemId = sessionStorage.getItem("postID");
		view_post(itemId);
	} else {
		load_post("");
	}
});
const clearSession = () => sessionStorage.clear()

function view_post(id) {
	fetch(`/post/${id}`)
		.then((response) => response.json())
		.then((posts) => {
			//print view post
			//console.log(post);
			document.querySelector("#post-contents").style.display = "block";
			document.querySelector("#profile").style.display = "none";
			document.querySelector("#post-load").style.display = "none";
			const post_viewers = document.createElement("div");
			post_viewers.innerHTML = 
		`
		<div id="article-title">${posts.title_post}</div>
		<div id="author-date">
		<div>By: ${posts.author_post} </div>
		<div>${posts.time_created_post}</div>
		<div>
		<div id="article-view-content">${posts.content_post} </div>
        `;
			document.querySelector("#post-contents").append(post_viewers);

			// const updateSession = sessionStorage.setItem('postes', JSON.stringify(posts));
			console.log(JSON.stringify(posts));
		});
}
function load_post(addon) {
	document.querySelector("#post-load").style.display = "block";
	document.querySelector("#profile").style.display = "none";
	fetch(`/post${addon}`)
		.then((response) => response.json())
		.then((res) => {
			console.log(res);

			res.posted.forEach((newData) => {
				console.log(newData);
				console.log(newData)
				const mainAr = document.createElement('section');
				mainAr.className = "archive-container"
				const archiveAr = document.createElement('article');
				archiveAr.innerHTML = `<img src="${newData.image_post}">`
	
				const headerAr = document.createElement('div');
				headerAr.innerHTML = `<h2>${newData.title_post}</h2>
				<h2><a href = "#">Read Here <span>>></span></a></h2>`
				const bodyAr = document.createElement('div')
				bodyAr.innerHTML = `
				<p>${newData.author_post}</p>
				<p>${newData.time_created_post}</p>
				 `;
				headerAr.append(bodyAr);
				archiveAr.append(headerAr);
				mainAr.append(archiveAr);

				const updateSession = () =>
					sessionStorage.setItem("postID", newData.id);
				headerAr.addEventListener("click", () => {
					updateSession();
					view_post(newData.id);
				});

				document.querySelector("#post-load").append(mainAr);
			});
		});
}