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
        </ul>`;

    document.querySelector('#indexdex').addEventListener('click', () =>{
        clearSession();
    });
        document.querySelector('#archive-btn').addEventListener('click', () =>{
        updateSession("archiver");
        archived_article("");
    });
    document.querySelector('#cryptopediaload').addEventListener('click', () =>{
		clearSession();
});

    const form = document.getElementById('search-form')
    const searchInput = document.getElementById('search-input');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // searched_article();
        searched_article(searchInput.value); // Passing in what the user has entered.
    });
    let search_button = document.getElementById("search-btn")
    searchInput.addEventListener("input", () => {
        if(searchInput.value.length == 0) {
          search_button.disabled = true
      } else {
          search_button.disabled = false
      }
    })

    if(sessionStorage.getItem("articleID") !== null) {
        const itemId = sessionStorage.getItem("articleID");
        view_article(itemId);
    }
    if(sessionStorage.getItem("archiveID") !== null) {
        const itemId3 = sessionStorage.getItem("archiveID");
        view_article(itemId3);
    }
    if(sessionStorage.getItem("searchID") !== null) {
        const itemId4 = sessionStorage.getItem("searchID");
        view_article(itemId4);
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
        document.querySelector('#search-articles').style.display = 'none';
        document.querySelector('#articles-load').style.display = 'none';
        document.querySelector('#article-contents').style.display = 'block';
        document.querySelector('#pages').style.display = 'none';
        document.querySelector('#archived').style.display = 'none';
        document.querySelector('#archive-btn').style.display = 'none';
        document.querySelector('#img1').style.display = 'none';
        document.querySelector('#img2').style.display = 'none';
        document.querySelector('#img3').style.display = 'none';
        
        const article_viewers = document.createElement('div');
        article_viewers.innerHTML=
         `
             <div id="article-title">${article.title}</div>
             <div id="author-date">
             <div>By: ${article.author} </div>
             <div>${article.time_created}</div>
             <div>
             <div id="article-view-content">${article.content} </div>
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
  
// function show_profile(author_id) {
//     document.querySelector('#article-contents').style.display = 'none'; 
//     document.querySelector('#articles-load').style.display = 'none';
//     document.querySelector('#archived').style.display = 'none'; 
//     document.querySelector('#pages').style.display = 'none'; 
//     document.querySelector('#profile').style.display = 'block';  
//     document.querySelector('#archive-btn').style.display = 'none';

//     fetch(`/profile/${author_id}`)
//     .then(response => response.json())
//     .then(profile => {
//         console.log(profile);
//         console.log(HALOWORLD);
//         const profile_data = createElement("div")
//         profile_data.innerHTML=`
//         ${profile.profile_name}
//         `;
//         document.getElementById('profile').append(profile_data);
//     })
//     }
function searched_article(addon){
    document.querySelector('#search-articles').style.display = 'block';
    document.querySelector('#articles-load').style.display = 'none';
    document.querySelector('#article-contents').style.display = 'none';
    document.querySelector('#pages').style.display = 'none';
    document.querySelector('#archived').style.display = 'none';
    document.querySelector('#archive-btn').style.display = 'none';
    document.querySelector('#archive-btn').style.display = 'none';
    document.querySelector('#img1').style.display = 'none';
    document.querySelector('#img2').style.display = 'none';
    document.querySelector('#img3').style.display = 'none';

    console.log(addon)
    fetch(`/search?query=${addon}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        document.getElementById('search-articles').innerHTML="";
        data.searched.forEach(newData => {
           // console.log(newData)
           console.log(newData)

            // const searchedAr = document.createElement('div');
            // searchedAr.innerHTML = `
            // ${newData.title}
            // `;
            // document.querySelector("#search-articles").append(searchedAr);
            
            const mainSear = document.createElement('section');
            mainSear.className = "archive-container"
            const searchSear = document.createElement('article');
            searchSear.innerHTML = `<img src="${newData.image}">`

            const headerSear = document.createElement('div');
            headerSear.innerHTML = `<h2>${newData.title}</h2>
            <h2><a href = "#">Read Here <span>>></span></a></h2>`
            const bodySear = document.createElement('div')
            bodySear.innerHTML = `
            <p>${newData.author}</p>
            <p>${newData.time_created}</p>
             `;
            headerSear.append(bodySear);
            searchSear.append(headerSear);
            mainSear.append(searchSear);

            const updateSession4 = () =>
                sessionStorage.setItem("searchID", newData.id);
            headerSear.addEventListener("click", () => {
                updateSession4();
                view_article(newData.id);
        });
            document.querySelector("#search-articles").append(mainSear);
        })
    })
}

function load_articles(addon,page) {

    document.querySelector('#articles-load').style.display = 'block';

    if (addon.includes("?")) {
        addon+=`&page=${page}`;
    } else {
        addon+=`?page=${page}`;
    }
    console.log(`access ${addon}`);
    fetch(`/load${addon}`)
    .then(response => response.json())
    .then(loads => {
        console.log(loads);

        document.getElementById('articles-load').innerHTML="";
       // build_paginator(addon,page,loads.num_pages);

        const article_card = document.createElement('main');

        const left_section = document.createElement('section');
        left_section.className = "main-container-left"
        
        const container_topleft = document.createElement('div');
        container_topleft.className = "container-top-left";
        const image11 = document.getElementById('img1')
        container_topleft.innerHTML =`
        <article><b>NEWS FLASH</b></article>
        `;
        const container_topleft_body = document.createElement('div')
        container_topleft_body.innerHTML = `            
        <h3>Best Used Cars Under $20, 000 for families</h3>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ea sint, nisi rem earum fugit? Facere veritatis sapiente eveniet quibusdam.</p>

        <a href = "#">Read More <span>>></span></a>
        `;
        image11.append(container_topleft_body);
        container_topleft.append(image11);
        left_section.append(container_topleft);

        const container_bottomleft = document.createElement('div');
        container_bottomleft.className = "container-bottom-left";

        const image2 = document.createElement('article');
        const image22 = document.getElementById('img2')
        const image3 = document.createElement('article');
        
        const image33 = document.getElementById('img3')


        const container_bottomleftleft = document.createElement('div');
        container_bottomleftleft.innerHTML = 
        `
        <h3>Best smart speakers for the year</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi iure modi animi cupiditate. Explicabo, nihil?</p>

        <a href = "#">Read More <span>>></span></a>
        `;
        const container_bottomleftright = document.createElement('div');
        container_bottomleftright.innerHTML = 
        `
        <h3>iPad Pro, reviewed: Has the iPad become my main computer now?</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi iure modi animi cupiditate. Explicabo, nihil?</p>

        <a href = "#">Read More <span>>></span></a>
        `
        image22.append(container_bottomleftleft);
        image33.append(container_bottomleftright);
        image2.append(image22);
        image3.append(image33);
        container_bottomleft.append(image2);
        container_bottomleft.append(image3);
        left_section.append(container_bottomleft);
        article_card.append(left_section);

        
        const right_section = document.createElement('section');
        right_section.className = "main-container-right"
        right_section.innerHTML= `<h2>Latest Stories</h2>`
        //loops
 

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

            const updateSession2 = () =>
                sessionStorage.setItem("articleID", newMessage.id);
            right_anchor.addEventListener("click", () => {
                updateSession2();
                view_article(newMessage.id);
        });

        const clickable_author = document.createElement('p')
        clickable_author.innerHTML = `
        <a>By: ${newMessage.author}</a>
        `;

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
        
        document.querySelector("#articles-load").append(article_card);
        
       });       
    }
    
function archived_article(addon,page){
    document.querySelector('#articles-load').style.display = 'none';
    document.querySelector('#article-contents').style.display = 'none';
    document.querySelector('#pages').style.display = 'block';
    document.querySelector('#archived').style.display = 'block';
    document.querySelector('#archive-btn').style.display = 'none';
    document.querySelector('#img1').style.display = 'none';
    document.querySelector('#img2').style.display = 'none';
    document.querySelector('#img3').style.display = 'none';
    if (addon.includes("?")) {
        addon+=`&page=${page}`;
    } else {
        addon+=`?page=${page}`;
    }
    console.log(`access ${addon}`);
    fetch(`/archived${addon}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data);
        document.getElementById('archived').innerHTML="";
        build_paginator(addon,page,data.num_pages);
        data.articles.forEach(newData => {
            console.log(newData)
            const mainAr = document.createElement('section');
            mainAr.className = "archive-container"
            const archiveAr = document.createElement('article');
            archiveAr.innerHTML = `<img src="${newData.image}">`

            const headerAr = document.createElement('div');
            headerAr.innerHTML = `<h2>${newData.title}</h2>
            <h2><a href = "#">Read Here <span>>></span></a></h2>`
            const bodyAr = document.createElement('div')
            bodyAr.innerHTML = `
            <p>${newData.author}</p>
            <p>${newData.time_created}</p>
             `;
            headerAr.append(bodyAr);
            archiveAr.append(headerAr);
            mainAr.append(archiveAr);
            // ardata.addEventListener('click', function() {
            //     view_article(newData.id)
            //   });
            const updateSession3 = () =>
                sessionStorage.setItem("archiveID", newData.id);
            headerAr.addEventListener("click", () => {
                updateSession3();
                view_article(newData.id);
            });

            document.querySelector("#archived").append(mainAr);
        })
    })
}

function build_paginator(addon,page,num_pages) {
    page_list = document.getElementById('pagination');  // if page is 1, disable the previous button if not decrement on the page number
    page_list.innerHTML="";
    const previous = document.createElement('li');
    if(page==1){
        previous.className = "page-item disabled";    
    } else {
        previous.className = "page-item";    
        previous.addEventListener('click', () => archived_article(addon,page-1));
    }
    const previous_page = document.createElement('a');
    previous_page.className="page-link";

    previous_page.href="#";
    previous_page.innerHTML="Previous";
    previous.append(previous_page);    
    page_list.append(previous);
    
    // page counter and page number = activate page
    for (let thing=1; thing<=num_pages; thing++) {
        const page_icon = document.createElement('li');        
        if(thing==page) {
            page_icon.className = "page-item active";
        } else {
            page_icon.className = "page-item";    
            page_icon.addEventListener('click', () => archived_article(addon,thing));
        }   
        const page_a = document.createElement('a');
        page_a.className="page-link";
        page_a.href="#";
        page_a.innerHTML=thing;
        page_icon.append(page_a);

        page_list.append(page_icon);
    }

    const next = document.createElement('li');        //if the active page is equals to the total number of page 
    if(page==num_pages){                                // disable the next button if not increment the page number
        next.className = "page-item disabled";    
    } else {
        next.className = "page-item";    
        next.addEventListener('click', () => archived_article(addon,page+1));
    }   
    const next_page = document.createElement('a');
    next_page.className="page-link"; 
    next_page.href="#";
    next_page.innerHTML="Next";
    next.append(next_page);
    page_list.append(next); 
}