document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#crypto').addEventListener('click',() =>{
              updateSession("crypto");
              load_crypto();
  });
    
    document.querySelector('#token').addEventListener('click', () =>{
              updateSession("token");
              load_token();
    });

    	// By default, load the inbox
    if (sessionStorage.getItem("mail") !== null) {
        const item = sessionStorage.getItem("mail"); //hereeeeeeeeeeeeeeeeeeeeee
        if (item === "token") {
          load_token();
        } else {
          load_crypto();
        }
    } else {
      load_crypto();
    }
  });

const updateSession = (path) => {
    sessionStorage.setItem("mail", path);
  };

function load_crypto() {
  
    document.querySelector('#token-view').style.display = 'none';
    document.querySelector('#cryto-view').style.display = 'block';


    //const crypto_api = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&vs_currencies=php%2Cusd&include_24hr_change=true'
    const crypto_api ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    fetch(crypto_api)
    .then((response) => response.json())
    .then(data => {
      document.getElementById('cryto-view').innerHTML="";

      const crypto_card = document.createElement('div');
      crypto_card.className = "crypto_card";

      const title = document.createElement('div');
      title.className ="dailytitle"
      title.innerHTML = `<div>DAILY PRICE UPDATE</div>`;
      crypto_card.append(title);
      // timememe
      const now = new Date();
      const months = 
      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const teme = document.createElement('div');
      teme.className ="tememe"
      teme.innerHTML = `        
            <div id="via"> via coingecko </div>
            <ul>
                  <li>${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}</li>
                  <li>${dayNames[now.getDay()]} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li>
            </ul>
            `;
      crypto_card.append(teme);

      const crypto_headers = document.createElement('div');
      crypto_headers.className = "d-flex justify-content-center p-4 text-center font-weight-bold";
      crypto_headers.innerHTML = `
      <div class="col-3 px-4">Crypto</div><div class="col-2 mx-2 px-2">PHP</div> <div class="col-2 px-2">24hr</div> <div class="col-3 pl-2">Mkt Cap</div>
      `;
      crypto_card.append(crypto_headers);

          data.forEach(element => {
            
            const price_php = element.current_price.toLocaleString("en-US");
            const marketcap = element.market_cap.toLocaleString("en-US");
            const percent = parseFloat(element.market_cap_change_percentage_24h).toFixed(2);

            //const headers = ""
            const cryptoes = document.createElement('div');
            cryptoes.className = 'd-flex justify-content-center'
            cryptoes.innerHTML = `
            <div class="col-1 pb-4"><img src="${element.image}" width="30" height="30"></div>  <div class="col-2">${element.name}</div><div class="col-3 mx-2 pl-4">₱${price_php}</div> <div class="col-2 mx-2 pr-4">${percent}%</div> <div class="col-auto pl-1">₱${marketcap}</div>
            `;

            if (percent >= 0){
              cryptoes.style.color = "green"
            }
            else {
              cryptoes.style.color = "red"
            }
            
            crypto_card.append(cryptoes);
            document.querySelector("#cryto-view").append(crypto_card);
          });
        })
      }
          // let object = Object.entries(data)
          // console.log(object[0])
          // object.forEach(new_data => {

          //   let final = Object.values(new_data)
          //   console.log(final)


  //             const makeMessage = document.createElement('div')
  //             makeMessage.className = "d-flex justify-content-center"
  //             makeMessage.innerHTML= `
  //             ${final[0]} ${final[2]} ${final[3]} 
  //             `
  // //must print only the the value
             


            

   // );
  
        // new_data(data));
        // console.log(new_data);

    //document.querySelector('#crypto-content').innerHTML = `${data.bitcoin.php}`
     // }       
    //   data.crypto_api.forEach((new_data) => {
    //     console.log(data)
    //     console.log(new_data)
    //  });
// function new_data(data){
//   console.log(data)
//   console.log(data.bitcoin)
//   console.table(data.ethereum)
//   console.table(data.binancecoin)
//   console.table(data.ripple)
//   console.table(data.cardano)
//   console.table(data.solana)
//   console.table(data.dogecoin)
//   console.table(data.polkadot)
//   console.table(data.matic-network)
//   console.table(data.avalanche-2)
//   console.table(data.uniswap)
//   console.table(data.tron)
//   console.table(data.litecoin)
// }




function load_token() {
  document.querySelector('#token-view').style.display = 'block';
  document.querySelector('#cryto-view').style.display = 'none';


  //const crypto_api = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&vs_currencies=php%2Cusd&include_24hr_change=true'
  // const crypto_api ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  const token_api ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=smooth-love-potion%2Caxie-infinity%2Cthe-sandbox%2Cdecentraland%2Cwax%2Cguild-of-guardians%2Cmobox%2Cyield-guild-games%2Cgala%2Cilluvium%2Csplinterlands%2Cgods-unchained%2Cpegaxy-stone&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  fetch(token_api)
  .then((response) => response.json())
  .then(datas => {
        document.getElementById('token-view').innerHTML="";
        const tokoes_card = document.createElement('div');
        tokoes_card.className = "tokoes_card";
        
        const title = document.createElement('div');
        title.className ="dailytitle"
        title.innerHTML = `<div>DAILY PRICE UPDATE</div>`;
        tokoes_card.append(title);

        // timememe
        const now = new Date();
        const months = 
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const teme = document.createElement('div');
        teme.className ="tememe"
        teme.innerHTML = `        
              <div id="via"> via coingecko </div>
              <ul>
                    <li>${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}</li>
                    <li>${dayNames[now.getDay()]} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li>
              </ul>
              `;
        tokoes_card.append(teme);
  

        const tokoes_headers = document.createElement('div');
        tokoes_headers.className = "d-flex justify-content-center p-4 text-center font-weight-bold";
        tokoes_headers.innerHTML = `
        <div class="col-3 px-4">Token</div><div class="col-2 mx-2 px-3">PHP</div> <div class="col-2 px-2">24hr</div> <div class="col-3 pl-2">Mkt Cap</div>
        `;
        tokoes_card.append(tokoes_headers);

        datas.forEach(hakdog => {
          console.log(hakdog)

          const price_php2 = hakdog.current_price.toLocaleString("en-US");
          const marketcap2 = hakdog.market_cap.toLocaleString("en-US");
          const percent2 = parseFloat(hakdog.market_cap_change_percentage_24h).toFixed(2);
          
          //const token_card = document.innerHTML('div')

          const tokoes = document.createElement('div');
          tokoes.className = 'd-flex justify-content-center'
          tokoes.innerHTML = `
          <div class="col-1 pb-4"><img src="${hakdog.image}" width="30" height="30"></div>  <div class="col-3">${hakdog.name}</div><div class="col-2 mx-2">₱${price_php2}</div> <div class="col-2 mx-3">${percent2}%</div>  <div class="col-auto pl-1">₱${marketcap2}</div>
          `;

          if (percent2 >= 0){
            tokoes.style.color = "green"
          }
          else {
            tokoes.style.color = "red"
          }

          tokoes_card.append(tokoes);

          document.querySelector("#token-view").append(tokoes_card);
        });
      })
}




//bitcoin,ethereum,binancecoin,ripple,cardano,solana,dogecoin,polkadot,matic-network,avalanche-2,uniswap,tron,litecoin

//smooth-love-potion,axie-infinity,the-sandbox,decentraland,wax,wemix-token,guild-of-guardians,mobox,yield-guild-games,gala,illuvium,splinterlands,gods-unchained,pegaxy-stone