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
    document.querySelector('#indexdex').addEventListener('click', () =>{
        clearSession();
    });
        document.querySelector('#archive-btn').addEventListener('click', () =>{
        updateSession("archiver");
        archived_article("");
    });
    //archived_article("");
    //load_articles("");
    if(sessionStorage.getItem("articleID") !== null) {
        const itemId = sessionStorage.getItem("articleID");
        view_article(itemId);
    }
    if(sessionStorage.getItem("authorID") !== null) {
        const itemId2 = sessionStorage.getItem("authorID");
        show_profile(itemId2);
    }
    if (sessionStorage.getItem("article") !== null) {
        const item = sessionStorage.getItem("article"); //hereeeeeeeeeeeeeeeeeeeeee
        if (item === "archiver") {
            archived_article("");
        }else {
            load_articles("");
        }
    } else {
        load_articles("");
    }


  });

const updateSession = (path) => {
    sessionStorage.setItem("article", path);
    };
const clearSession = () => sessionStorage.clear()

function view_article(id){
    fetch(`/load/${id}`)
    .then(response => response.json())
    .then(article => {
        //print view article
        //console.log(article);
        document.querySelector('#articles-load').style.display = 'none';
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#article-contents').style.display = 'block';
        document.querySelector('#pages').style.display = 'none';
        document.querySelector('#archived').style.display = 'none';
        document.querySelector('#archive-btn').style.display = 'none';
        
        const article_viewers = document.createElement('div');
        article_viewers.innerHTML=
         `
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> ${article.title}</li>
            <li class="list-group-item">By: ${article.author}</li>
            <li class="list-group-item">${article.time_created}</li>
            <li class="list-group-item py-5">${article.content} </li>
        </ul>
        `;
        document.querySelector('#article-contents').append(article_viewers);

        const archive_button = document.createElement('button');
        archive_button.innerHTML = article.archived ? "Unarchive" : "Archive";
        archive_button.className = article.archived ? "btn btn-success" : "btn btn-danger";
        archive_button.addEventListener('click', function() {
          fetch(`/load/${article.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: !article.archived
            })
          }) 
          .then(() => { archived_article})
        });
        document.querySelector('#archiver-btn').append(archive_button);
        //document.querySelector('#article-contents').append(archive_button);
        });

    };
  

function show_profile(author_id) {
    load_articles(`?profile=${author_id}`,1);
    document.querySelector('#article-contents').style.display = 'none'; 
    document.querySelector('#articles-load').style.display = 'none';
    document.querySelector('#archived').style.display = 'none'; 
    document.querySelector('#pages').style.display = 'none'; 
    document.querySelector('#profile').style.display = 'block';  
    document.querySelector('#archive-btn').style.display = 'none';

    fetch(`/profile/${author_id}`)
    .then(response => response.json())
    .then(profile => {
        console.log(profile);
        console.log(HALOWORLD);
        const profile_data = createElement("div")
        profile_data.innerHTML=`
        ${profile.profile_name}
        `;
        document.getElementById('profile_username').append(profile_data);
    })
    }
    
function load_articles(addon,page) {

    document.querySelector('#articles-load').style.display = 'block';

    if (addon.includes("?")) {
        addon+=`&page=${page}`;
    } else {
        document.querySelector('#profile').style.display = 'none';
        addon+=`?page=${page}`;
    }
    console.log(`access ${addon}`);
    fetch(`/load${addon}`)
    .then(response => response.json())
    .then(loads => {
        console.log(loads);
    // loop foreach email messages
        document.getElementById('articles-load').innerHTML="";

        const article_card = document.createElement('main');

        const left_section = document.createElement('section');
        left_section.className = "main-container-left"
        
        const container_topleft = document.createElement('div');
        container_topleft.className = "container-top-left";
        container_topleft.innerHTML =`
        <article>
        <img src = "images/top-left.jpg">

        <div>
            <h3>Best Used Cars Under $20, 000 for families</h3>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ea sint, nisi rem earum fugit? Facere veritatis sapiente eveniet quibusdam.</p>

            <a href = "#">Read More <span>>></span></a>
        </div>
        </article>
        `;
        left_section.append(container_topleft);

        const container_bottomleft = document.createElement('div');
        container_bottomleft.className = "container-bottom-left";
        container_bottomleft.innerHTML = `
        <article>
        <img src = "images/bottom-left-1.jpg">
            <div>
                <h3>Best smart speakers for the year</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi iure modi animi cupiditate. Explicabo, nihil?</p>

                <a href = "#">Read More <span>>></span></a>
            </div>
        </article>

        <article>
            <img src = "images/bottom-left-2.jpg">
                <div>
                    <h3>iPad Pro, reviewed: Has the iPad become my main computer now?</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi iure modi animi cupiditate. Explicabo, nihil?</p>

                    <a href = "#">Read More <span>>></span></a>
                </div>
        </article>
        `;
        left_section.append(container_bottomleft);
        article_card.append(left_section);

        
        const right_section = document.createElement('section');
        right_section.className = "main-container-right"
        right_section.innerHTML= `<h2>Latest Stories</h2>`
        //loops
        build_paginator(addon,page,loads.num_pages);

        loads.articles.forEach(newMessage => {
            //divimarts loops throu HOOOEPES

        const right_article = document.createElement('article');
        right_article.innerHTML =
        `      
            <img src="${newMessage.image}">
        `;
        const right_article_div = document.createElement('div');
        right_article_div.innerHTML = `
        <div>
            <h2>${newMessage.title}</h2>
        </div>
        `;
        
        const right_anchor = document.createElement('div')
        right_anchor.className = "click_article"
        right_anchor.innerHTML = 
        `<a href = "#">Read Here <span>>></span></a>`;

           // const clickable_article = document.getElementsByClassName('click_article');
            const updateSession2 = () =>
                sessionStorage.setItem("articleID", newMessage.id);
            right_anchor.addEventListener("click", () => {
                updateSession2();
                view_article(newMessage.id);
        });

        const clickable_author = document.createElement('p')
        clickable_author.innerHTML = `
        <a href = '#'>By: ${newMessage.author}</a>
        `;
        const updateSession3 = () =>
            sessionStorage.setItem("authorID", newMessage.author);
        clickable_author.addEventListener("click", () => {
            updateSession3();
            show_profile(newMessage.author);
        });
        const datedate = document.createElement('p')
        datedate.innerHTML = `
        ${newMessage.time_created}`;
        
        right_article_div.append(right_anchor);
        right_article_div.append(clickable_author);
        right_article_div.append(datedate);
        right_article.append(right_article_div);   
        right_section.append(right_article);
        article_card.append(right_section);
        })
        
        // const button_archived = document.createElement('button');
        // button_archived.innerHTML = "Archived News"
        // button_archived.className =  "btn btn-dark mt-4";
        // button_archived.addEventListener('click', () => archived_article(""));

        // right_section.append(button_archived);
        
        document.querySelector("#articles-load").append(article_card);
        
       });       
    }

function archived_article(addon){
    document.querySelector('#articles-load').style.display = 'none';
    document.querySelector('#profile').style.display = 'none';
    document.querySelector('#article-contents').style.display = 'none';
    document.querySelector('#pages').style.display = 'none';
    document.querySelector('#archived').style.display = 'block';
    document.querySelector('#archive-btn').style.display = 'none';

    fetch(`/archived${addon}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data);

        data.archived.forEach(newData => {
            console.log(newData)
            const ardata = document.createElement('div');
            ardata.className = "list-group-item";
            ardata.innerHTML = `
            <h6>${newData.title}</h6>
            <h5>By: ${newData.author}<h5>
            <p>${newData.time_created}</p>
            `;
            ardata.addEventListener('click', function() {
                view_article(newData.id)
              });
            document.querySelector("#archived").append(ardata);
        })
    })
}


function build_paginator(addon,page,num_pages) {
    page_list = document.getElementById('pagination');  // if page is 1, disable the previous button if not decrement on the page number
    //const page_list = document.createElement('div');
    page_list.innerHTML="";

    const previous = document.createElement('li');
    if(page==1){
        console.log(previous)
        previous.className = "page-item disabled";    
    } else {
        previous.className = "page-item";    
        previous.addEventListener('click', () => load_articles(addon,page-1));
    }
    const previous_page = document.createElement('a');
    previous_page.className="page-link";

    previous_page.href="#";
    previous_page.innerHTML="<";
    previous.append(previous_page);    
    page_list.append(previous);
    
    // page counter and page number = activate page
    for (let item=1; item<=num_pages; item++) {
        const page_icon = document.createElement('li');        
        if(item==page) {
            page_icon.className = "page-item active";
        } else {
            page_icon.className = "page-item";    
            page_icon.addEventListener('click', () => load_articles(addon,item));
        }   
        const page_a = document.createElement('a');
        page_a.className="page-link";
        page_a.href="#";
        page_a.innerHTML=item;
        page_icon.append(page_a);

        page_list.append(page_icon);
    }

    const next = document.createElement('li');        //if the active page is equals to the total number of page 
    if(page==num_pages){                                // disable the next button if not increment the page number
        next.className = "page-item disabled";    
    } else {
        next.className = "page-item";    
        next.addEventListener('click', () => load_articles(addon,page+1));
    }   
    const next_page = document.createElement('a');
    next_page.className="page-link"; 
    next_page.href="#";
    next_page.innerHTML=">";
    next.append(next_page);
    page_list.append(next);

    
}

