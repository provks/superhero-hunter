/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function getParams(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

// Get parameters from the current URL
const characterId = getParams(window.location.href).id;
var character;

// retrieve data from local storage
var storedCharactersArray = JSON.parse(localStorage.getItem("characters"));

// Get superhero details
fetchSuperHeroes(characterId);

// ===========  Hit API and Fetch the matching id character  ===========
async function fetchSuperHeroes(id) {
    try {
        const response = await fetch(`https://www.superheroapi.com/api.php/2496364390592143/` + id)
        .then(response => response.json()) // converting response to json
        .then(
            // data => console.log(data)
            function(data) {
                // console.log('data.response', data.response);
                // console.log('data', data);
                // to show the results on the page
                if (data.response == "success") {
                    // status.innerHTML = ((data.results.length > 1) ? `Matches` :`Match`) + ` found : ${data.results.length}`;
                    character = data;
                    showResults(data);
                } else
                    noResult();
            }
            );
    } catch (err) {
        console.log('INSIDE CATCH', err);
    }
}

function noResult() {
    document.body.innerHTML = "OOPS! Something went wrong."
    setTimeout(window.location.replace("index.html"), 100000);
}

// ===========  Show result to user  ===========
function showResults(data) {
    // Character name and full name
    document.getElementsByClassName('card-title')[0].innerHTML = data.name;
    document.getElementsByClassName('text-muted m-0')[0].innerHTML = data.biography['full-name'];
    // Avatar
    heroAvatar = document.getElementsByClassName('card-img')[0];
    heroAvatar.src = data.image.url;
    heroAvatar.alt = data.name + "'s thumbnail";
    // Powerstats
    document.getElementById('intelligence').innerHTML = data.powerstats.intelligence;
    document.getElementById('strength').innerHTML = data.powerstats.strength;
    document.getElementById('speed').innerHTML = data.powerstats.speed;
    document.getElementById('durability').innerHTML = data.powerstats.durability;
    document.getElementById('power').innerHTML = data.powerstats.power;
    document.getElementById('combat').innerHTML = data.powerstats.combat;
    // Biography
    document.getElementById('full-name').innerHTML = data.biography['full-name'];
    document.getElementById('alter-egos').innerHTML = data.biography['alter-egos'];
    document.getElementById('aliases').innerHTML = data.biography.aliases;
    document.getElementById('place-of-birth').innerHTML = data.biography['place-of-birth'];
    document.getElementById('first-appearance').innerHTML = data.biography['first-appearance'];
    document.getElementById('publisher').innerHTML = data.biography.publisher;
    document.getElementById('alignment').innerHTML = data.biography.alignment;
    initialFavStatus();

}

// ===========  Initial favourite status  ===========
function initialFavStatus() {
    if (storedCharactersArray.length > 0) {
        // console.log('storedCharactersArray', storedCharactersArray);
        let favIcon = document.getElementById('fav-btn').firstChild.classList;
        if (isFavourite(character.id, storedCharactersArray)) {
            favIcon.remove('far');
            favIcon.add('fas');
            // console.log('initialFavStatus inside if');
        }
    }
    // console.log('AUTORUN');
}

// ===========  Toggle favourite  ===========
function favourite(anchor) {
    // console.log('inside fav');

    // check browser support for localStorage and sessionStorage
    if (typeof(Storage) == "undefined") {
        window.alert("Sorry! No Web Storage support..");
        return;
    }

    storedCharactersArray = JSON.parse(localStorage.getItem("characters"));
    let favIcon = anchor.firstChild.classList;
    // console.log('storedCharactersArray: ', storedCharactersArray);
    // Handle First favourite character case
    if (storedCharactersArray == null || storedCharactersArray.length == 0) {
        var characters = [];
        characters.push(character);
        // add to local storage
        localStorage.setItem("characters", JSON.stringify(characters));
        // change icon
        favIcon.remove("far");
        favIcon.add("fas");
        // alert message
        window.alert(character.name + " is added to favourites.");
    } else {  // handle favourite characters exists
        // check if current character is already favourite
        if (isFavourite(character.id, storedCharactersArray)) {
            // remove from favourites
            if (confirm("Remove " + character.name + " from favourites?")) {
                let isRemoved = removeFromFavourite(character.id, storedCharactersArray);
                if (isRemoved){
                    localStorage.setItem("characters", JSON.stringify(storedCharactersArray));
                    // change icon
                    favIcon.remove("fas");
                    favIcon.add("far");
                    // alert message
                    window.alert(character.name + " has been removed from favourites");
                } else {
                    window.alert("OOPS! Something went wrong!");
                }
            }

        } else { // current character is not a Favourite character hence "Add to favrourites"
            try {
                storedCharactersArray.push(character);
                // add to local storage
                localStorage.setItem("characters", JSON.stringify(storedCharactersArray));
                // change icon
                favIcon.remove("far");
                favIcon.add("fas");
                // alert message
                window.alert(character.name + " added to favourites");    
            } catch (error) {
                window.alert("OOPS! Something went wrong!");
            }
            
        }
    }
}

// ===========  Check if character is already favourite  ===========
function isFavourite(characterId, storedCharactersArray) {
    for (let i = 0; i < storedCharactersArray.length; i++) {
        if (storedCharactersArray[i].id == characterId) {
            // console.log("isFavourite = TRUE");
            return true;
        }
    }
    return false;
}

// ===========  Remove character from the favourites  ===========
function removeFromFavourite(characterId, storedCharactersArray) {
    // console.log("inside Remove Favourite");
    for (let i = 0; i < storedCharactersArray.length; i++) {
        // console.log('removeFromFavourite Condition :: ', storedCharactersArray[i].id + ' == ' + characterId);
        // console.log(storedCharactersArray[i].id == characterId);
        if (storedCharactersArray[i].id == characterId) {
            // console.log("SPLICING");
            storedCharactersArray.splice(i,1);
            return true;
        }
    }
    return false;
}