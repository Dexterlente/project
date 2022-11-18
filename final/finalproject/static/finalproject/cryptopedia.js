document.addEventListener("DOMContentLoaded", function () {
	// let now = new Date();
	// let months =
	// ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	// // console.log(
	// //     now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	// //   );
	//  document.getElementById('time').innerHTML = `
	//     <ul>
	//             <li>${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}</li>
	//             <li>${dayNames[now.getDay()]} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li>
	//     </ul>`
	// By default, load the inbox
	if (sessionStorage.getItem("postID") !== null) {
		const itemId = sessionStorage.getItem("postID");
		view_post(itemId);
	} else {
		load_post("");
	}
});

//   const updateSession = (path) => {
// 	JSON.stringify(sessionStorage.setItem("postt", path));
// };

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
			post_viewers.innerHTML = `
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> ${posts.title_post}</li>
            <li class="list-group-item">By: ${posts.author_post}</li>
            <li class="list-group-item">${posts.time_created_post}</li>
            <li class="list-group-item py-5">${posts.content_post} </li>
        </ul>
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
				const ardata = document.createElement("div");
				ardata.className = "list-group-item";
				ardata.innerHTML = `
                <h6>${newData.title_post}</h6>
                <h5>By: ${newData.author_post}<h5>
                <p>${newData.time_created_post}</p>
                `;

				//here
				const updateSession = () =>
					sessionStorage.setItem("postID", newData.id);
				ardata.addEventListener("click", () => {
					updateSession("viewPost");
					view_post(newData.id);
				});

				document.querySelector("#post-load").append(ardata);
			});
		});
}

