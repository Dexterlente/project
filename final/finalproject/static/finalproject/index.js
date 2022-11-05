document.addEventListener('DOMContentLoaded', function() {
    /*const url = window.location.href
    const searchForm = document.getElementById("search-form")
    const searchInput = document.getElementById("search-input")
    
    const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value
    console.log(csrf); 
    
    document.querySelector('#btnsubmit').addEventListener('submit', () => searched_article("",1));

    console.log()*/
    // fetch('http://worldtimeapi.org/api/timezone/Asia/Manila')
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data)
    //     document.getElementById('time').innerHTML = `
    //     <ul>
    //             <li> ${data.datetime} </li>
    //             <li> ${data.unixtime} ${data.timezone} </li>
    //     </ul>`
    //     }
    // ); i dont know why did i use api, there is a build in js for time LOLOL
        
    let now = new Date();
    let months = 
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(months[now.getMonth()]);
    console.log(now.getDate());

    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // console.log(
    //     now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    //   );
     document.getElementById('time').innerHTML = `
        <ul>
                <li>${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}</li>
                <li>${dayNames[now.getDay()]} ${now.toLocaleTimeString('en-US')}</li>
        </ul>`


    document.querySelector('#profile').style.display ="none";
    document.querySelector('#article-contents').style.display ="none";


    load_articles("",1);
  });
 
function view_article(id){
    fetch(`/load/${id}`)
    .then(response => response.json())
    .then(article => {
        //print view article
        console.log(article);
        document.querySelector('#articles-load').style.display = 'none';
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#article-contents').style.display = 'block';
        document.querySelector('#pages').style.display = 'none';

        document.querySelector('#article-contents').innerHTML = `
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> ${article.title}</li>
            <li class="list-group-item">By: ${article.author}</li>
            <li class="list-group-item">${article.time_created}</li>
            <li class="list-group-item py-5">${article.content} </li>
        </ul>
        `
        
        });
    }
// function searched_article(id) {


//     document.querySelector('#articles-load').style.display = 'none';
//     document.querySelector('#profile').style.display = 'none';
//     document.querySelector('#article-contents').style.display = 'none';
//     document.querySelector('#pages').style.display = 'none';
//     document.querySelector('#search-articles').style.display = 'block';

//     fetch(`/load/search${id}`)
//     .then(response => response.json())
//     .then(article => { 

//         console.log(article, "helloworld")
//         document.getElementById('search-articles').innerHTML="";
//         build_paginator(addon,page,loads.num_pages);
//         loads.articles.forEach(newMessage => {
//             console.log(loads)
//             // create divs for each messages

//             const article_card = document.createElement('div');
//             article_card.className = "article_card";

//             const article_image = document.createElement('div');
//             article_image.className = "image-div";
//             article_image.innerHTML = `
//             <img src="${newMessage.image}">`;
//             article_card.append(article_image);

//             const makeMessage = document.createElement('div');
//             makeMessage.className = "article_format";
//             makeMessage.innerHTML = `
//             <div><h2>${newMessage.title}<h2>
//             <p>${newMessage.time_created}</p></div>
//             `;
//             article_card.append(makeMessage);
//             makeMessage.addEventListener('click', function() {
//                 view_article(newMessage.id)
//               });

//             const author_prof = document.createElement('div');
//             author_prof.className = "author-div";
//             author_prof.innerHTML = `
//             <div>By: ${newMessage.author}</div>
//             `;

//             article_card.append(author_prof);
//             author_prof.addEventListener('click', () => show_profile(newMessage.author));

//             document.querySelector("#search-articles").append(article_card);
//         })


//         });
//     }       

function show_profile(author_id) {
    load_articles(`?profile=${author_id}`,1);
    document.querySelector('#article-contents').style.display = 'none'; 
    document.querySelector('#articles-load').style.display = 'none'; 
    document.querySelector('#profile').style.display = 'block';  
    fetch(`/profile/${author_id}`)
    .then(response => response.json())
    .then(profile => {
        document.getElementById('profile_username').innerHTML=profile.profile_username;
    })
    window.scrollTo(0,0);
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
        build_paginator(addon,page,loads.num_pages);
        loads.articles.forEach(newMessage => {
            console.log(loads)
            // create divs for each messages

            const article_card = document.createElement('div');
            article_card.className = "article_card";

            const article_image = document.createElement('div');
            article_image.className = "image-div";
            article_image.innerHTML = `
            <img src="${newMessage.image}">`;
            article_card.append(article_image);

            const makeMessage = document.createElement('div');
            makeMessage.className = "article_format";
            makeMessage.innerHTML = `
            <div><h2>${newMessage.title}<h2>
            <p>${newMessage.time_created}</p></div>
            `;
            article_card.append(makeMessage);
            makeMessage.addEventListener('click', function() {
                view_article(newMessage.id)
              });

            const author_prof = document.createElement('div');
            author_prof.className = "author-div";
            author_prof.innerHTML = `
            <div>By: ${newMessage.author}</div>
            `;

            article_card.append(author_prof);
            author_prof.addEventListener('click', () => show_profile(newMessage.author));

            document.querySelector("#articles-load").append(article_card);
        })

       });       
    }

function build_paginator(addon,page,num_pages) {
    page_list = document.getElementById('pagination');  // if page is 1, disable the previous button if not decrement on the page number
    page_list.innerHTML="";

    const previous = document.createElement('li');
    if(page==1){
        previous.className = "page-item disabled";    
    } else {
        previous.className = "page-item";    
        previous.addEventListener('click', () => load_articles(addon,page-1));
    }

    const previous_page = document.createElement('a');
    previous_page.className="page-link";

    previous_page.href="#";
    previous_page.innerHTML="Previous";
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
    next_page.innerHTML="Next";
    next.append(next_page);
    page_list.append(next);

}
