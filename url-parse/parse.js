document.addEventListener("DOMContentLoaded", function(){ parse(); }, false);

function parse() {
    const url = window.location.href;
    const queryString = window.location.search;

    // let queryString = '?user=vance'

    console.log('href =' + url);
    console.log('queryString =' + queryString);
    
    const urlParams = new URLSearchParams(queryString);
    const user = urlParams.get('user')
    console.log(user);
    openSea(user);
}

function openSea(user) {
    // var user = '0x361a5054a89f09c449d31c0925ffd8a3714668f5';
    var collection = 'ronin-by-bushidos';
    fetch('https://api.opensea.io/api/v1/assets?owner=' + user + '&order_direction=desc&limit=100&include_orders=false')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var imgUrl = data['assets'][0]['image_url'];
        display(imgUrl);
    })
}

function display(imgUrl) {
    document.getElementById('nft').src = imgUrl;
}

