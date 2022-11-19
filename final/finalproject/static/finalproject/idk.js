window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("history") != null) {
        // Retrieve item code here, and load the mailbox
        //   load_mailbox(sessionStorage.getItem('history'));
    }
}); // This only runs when the document is done loading

let page1;
let page2;
let page3;

window.addEventListener('click', ()=> {
    const page = event.dataset.id
    load_mailbox(page) // Ur normal load page function, and upon loading it, you update ur session storage.
    sessionStorage.setItem('history', page)
})


// ph

[{"email": "john@mail.com"}, {"email": "rhea@mail.com"}]

let retrieveEmails = JSON.parse(sessionStorage.getItem('mail'));

var  parentContainer = document.querySelector("#parentContainer");

retrieveEmails.forEach((mail) => {
  var mailText = mail.email;
  var mailContainer = document.createElement("div");
  mailContainer.append(mailText);
  
  parentContainer.append(mailContainer);
})

               //here
                // const updateSession = sessionStorage.setItem("postt", JSON.stringify(newData));
		// updateSession is being used as a function when its not a function. I've changed it to an arrow function now though!
		// const updateSession = () => sessionStorage.setItem("postt", JSON.stringify(newData));
        //         console.log(JSON.stringify(newData));
        //         ardata.addEventListener('click', () => {
        //             updateSession("viewPost");
        //             view_post(newData.id);
        //         })

        //         document.querySelector("#post-load").append(ardata);

