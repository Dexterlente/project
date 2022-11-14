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