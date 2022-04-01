document.addEventListener("DOMContentLoaded", function(){ openSea(); }, false);

var x = document.getElementById("instructions");
x.style.display = "none";
document.addEventListener('mousemove', function(){ mouse(); }, false);
var lock = true;

function openSea() {
    
    var collection = randomCollection();
    fetch('https://api.opensea.io/api/v1/assets?collection_slug=' + collection + '&order_direction=desc&limit=100&include_orders=false')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var dataLength = data['assets'].length;
        var selector = Math.floor(Math.random() * dataLength);
        var imgURL = data['assets'][selector]['image_url'];
        var assetName = data['assets'][selector]['collection']['name'];
        var tokenID = data['assets'][selector]['token_id'];
        var name = chooseName(assetName,tokenID);
        var osURL = data['assets'][selector]['permalink'];
        document.getElementById("imgURL").src = imgURL;
        // document.getElementById("tokenID").innerHTML = assetName + ' #' + tokenID;
        document.getElementById("tokenID").innerHTML = name;
        document.getElementById('osLink').href = osURL;
        document.getElementById('assetName').innerHTML = assetName;
        document.title = assetName;
        randomColor();
    })
}

function randomColor() {
        const randomColor = Math.floor(Math.random() * 360);
        document.body.style.backgroundColor = changeHue("#c0d6e4", randomColor);
}

function randomCollection() {
    var colArr = ['doodles-official','ronin-by-bushidos','bushidos','lofi-guy','the-weirdo-ghost-gang','swampverseofficial','acrocalypse','hapeprime','adworld','quirkiesoriginals','invisiblefriends','jungle-of-dreams','smilesssvrs','cryptopunks','official-v1-punks','mekaverse','trippytoadznft']
    var colLength = colArr.length
    var selector = Math.floor(Math.random() * colLength);
    var collection = colArr[selector];
    console.log(collection);
    return collection;
}

function chooseName(assetName,tokenID) {
    if(assetName == null) {
        return tokenID;
    } else {
        console.log(assetName + ' #' + tokenID);
        return assetName + ' #' + tokenID;
    }
}

function mouse() {
    var timeSet = 3000;
    var x = document.getElementById("instructions");
    if(lock == true) {
    lock = false;
    x.style.display = "flex";
    setTimeout(function () {
            x.style.display = "none";;
            lock = true;
    }, timeSet);
    }
}


document.dispatchEvent(new KeyboardEvent('keypress', {'key': 'r'}));


document.addEventListener('keypress', (event)=>{
    if(event.key == 'r') {
        openSea();
    }
});

