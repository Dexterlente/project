document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#crypto').addEventListener('click', () => load_crypto);
   // document.querySelector('#token').addEventListener('click', () => load_token);

  
    // By default, load the crypto
    load_crypto("",1);
  });


function load_crypto() {
  
    document.querySelector('#token-content').style.display = 'none';
    document.querySelector('#cryto-content').style.display = 'block';


    const crypto_api = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&vs_currencies=php%2Cusd&include_24hr_change=true'
    
    fetch(crypto_api)
    .then((response) => response.json())
    .then(data => {
          let object = Object.entries(data)
          object.forEach(new_data => {
            
          let last_object = Object.values(new_data)
          last_object.forEach(last_data =>{

              console.log(last_data)

              const makeMessage = document.createElement('div')
              makeMessage.className = "cryptopotatoes"
              makeMessage.innerHTML= `
              ${last_data.php} ${last_data.usd} ${last_data.usd_24h_change}
              `
  //must print only the the value
             document.querySelector('#crypto-view').append(makeMessage);

            })
            
          })
    }
    );
  
        // new_data(data));
        // console.log(new_data);

    //document.querySelector('#crypto-content').innerHTML = `${data.bitcoin.php}`
      }       
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