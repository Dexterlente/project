document.addEventListener('DOMContentLoaded', function() {

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
        load_post("");
  });

  function load_post(addon){
    document.querySelector('#post-load').style.display = 'block';
    document.querySelector('#profile').style.display = 'none';
        fetch(`/post${addon}`)
        .then(response => response.json())
        .then(res => { 
            console.log(res);
            console.log("helloword");
            
            res.posted.forEach(newData => {
                console.log(newData)
                const ardata = document.createElement('div');
                ardata.className = "list-group-item";
                ardata.innerHTML = `
                <h6>${newData.title_post}</h6>
                <h5>By: ${newData.author_post}<h5>
                <p>${newData.time_created_post}</p>
                `;

                document.querySelector("#post-load").append(ardata);
        })
    })}