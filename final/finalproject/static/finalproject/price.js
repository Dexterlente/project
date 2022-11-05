document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_prices('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_prices('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_prices('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);
  
    // By default, load the crypto
    load_prices('inbox');
  });


function load_prices(mailbox) {
  
    document.querySelector('#token-content').style.display = 'none';
    document.querySelector('#cryto-content').style.display = 'none';
  
    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
    // get logged user messages
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      // loop foreach email messages
      emails.forEach(newMessage => {
        console.log(emails)
        console.log(newMessage)
          // create divs for each messages
        const makeMessage = document.createElement('div');
        makeMessage.className = "list-group-item";
        makeMessage.innerHTML = `
        <h6>Sender: ${newMessage.sender}</h6>
        <h5>Subject: ${newMessage.subject}<h5>
        <p>${newMessage.timestamp}</p>
        `;

        document.querySelector("#emails-view").append(makeMessage);
      })
    });
    }