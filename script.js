

const SearchBitCoin = document.getElementById("searchBitCoin");
const Mkt = document.getElementById("mkt");
const Percentage = document.getElementById("percentage");



let coinData = [];


fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then((response) => response.json())
.then((data) => {
    coinData = data;
    displayCoins(coinData);
    console.log("CoinData" , coinData);
}).catch((error) => console.error("Error in the Code" , error));


function displayCoins(coins){

    const Tbody = document.getElementById("tbody");

    Tbody.innerHTML = '';

   coins.forEach((coin) => {

        let column = document.createElement("tr");
        column.classList.add("Item");

        column.setAttribute("data-name", coin.name.toLowerCase());
        column.setAttribute("data-symbol", coin.symbol.toLowerCase());

        let imageItem = document.createElement("td");
        imageItem.innerHTML = `<img src="${coin.image}" alt="${coin.name}" width="50"> ${coin.name}` ;
         
        imageItem.classList.add("imageName");


        const nameItem = document.createElement("td");
        nameItem.textContent = coin.name;
            
        const symbolItem = document.createElement("td");
        symbolItem.textContent = coin.symbol.toUpperCase();

        const currentPriceItem = document.createElement("td");
        currentPriceItem.textContent = `$${coin.current_price}`;

        const totalVolumeItem = document.createElement("td");
        totalVolumeItem.textContent = ` ${coin.total_volume}`;

        const priceChangeItem = document.createElement("td");
        priceChangeItem.textContent = ` ${coin.price_change_percentage_24h.toFixed(2)}%`;

        const marketCapItem = document.createElement("td");
        marketCapItem.textContent = `Mkt Cap: ${coin.market_cap.toLocaleString()}`;

        column.appendChild(imageItem)
        column.appendChild(symbolItem)
        column.appendChild(currentPriceItem)
        column.appendChild(totalVolumeItem)
        column.appendChild(priceChangeItem)
        column.appendChild(marketCapItem)

        Tbody.append(column);



   })

}

SearchBitCoin.addEventListener("input" , (e) =>  {

    const searchValue = e.target.value.toLowerCase();
    const lists = document.querySelectorAll("tr.Item");


    lists.forEach((list) => {
        const name = list.getAttribute("data-name");
        const symbol = list.getAttribute("data-symbol");

        if (name.includes(searchValue) || symbol.includes(searchValue)) {
            list.style.display = ""; // Show the list
            list.nextElementSibling.style.display = ""; // Show the line
        } else {
            list.style.display = "none"; // Hide the list
            list.nextElementSibling.style.display = "none"; // Hide the line
        }
    })

})


 // Sort by Market Cap
 Mkt.addEventListener("click", () => {
    coinData.sort((a, b) => b.market_cap - a.market_cap);
    displayCoins(coinData);
});

// Sort by Percentage Change
Percentage.addEventListener("click", () => {
    coinData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    displayCoins(coinData);
});