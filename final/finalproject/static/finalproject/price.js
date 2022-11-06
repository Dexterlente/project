document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#crypto').addEventListener('click', () => load_crypto);
    document.querySelector('#token').addEventListener('click', () => load_token);

  
    // By default, load the crypto
    load_crypto("",1);
  });


function load_crypto() {
  
    document.querySelector('#token-content').style.display = 'none';
    document.querySelector('#cryto-content').style.display = 'block';


    //const crypto_api = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&vs_currencies=php%2Cusd&include_24hr_change=true'
    const crypto_api ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    fetch(crypto_api)
    .then((response) => response.json())
    .then(data => {
          data.forEach(element => {
            console.log(element)

            

            const price_php = element.current_price.toLocaleString("en-US");
            const marketcap = element.market_cap.toLocaleString("en-US");
            const percent = parseFloat(element.market_cap_change_percentage_24h).toFixed(2);

            const cryptoes = document.createElement('div');
            cryptoes.className = 'd-flex justify-content-center p-1'
            cryptoes.innerHTML = `
            <div class="col-1 mr-1"><img src="${element.image}" width="35" height="35"></div>  <div class="col-2">${element.name}</div><div class="col-2 mx-2">₱${price_php}</div> <div class="col-2 ml-2">${percent}%</div> <div class="col-auto pl-1">₱${marketcap}</div>
            `;

            if (percent >= 0){
              cryptoes.style.color = "green"
            }
            else {
              cryptoes.style.color = "red"
            }
            

            document.querySelector("#cryto-view").append(cryptoes);
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
  document.querySelector('#token-content').style.display = 'block';
  document.querySelector('#cryto-content').style.display = 'none';


  //const crypto_api = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&vs_currencies=php%2Cusd&include_24hr_change=true'
  // const crypto_api ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  const token_api =''
  
  fetch(token_api)
  .then((response) => response.json())
  .then(data => {
        data.forEach(element => {
          console.log(element)

          

          // const price_php = element.current_price.toLocaleString("en-US");
          // const marketcap = element.market_cap.toLocaleString("en-US");
          // const percent = parseFloat(element.market_cap_change_percentage_24h).toFixed(2);

          // const cryptoes = document.createElement('div');
          // cryptoes.className = 'd-flex justify-content-center p-1'
          // cryptoes.innerHTML = `
          // <div class="col-1 mr-1"><img src="${element.image}" width="35" height="35"></div>  <div class="col-2">${element.name}</div><div class="col-2 mx-2">₱${price_php}</div> <div class="col-2 ml-2">${percent}%</div> <div class="col-auto pl-1">₱${marketcap}</div>
          // `;

          // if (percent >= 0){
          //   cryptoes.style.color = "green"
          // }
          // else {
          //   cryptoes.style.color = "red"
          // }
          

          document.querySelector("#token-view").append(cryptoes);
        });
      })
}