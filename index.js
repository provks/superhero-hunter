// ===========  Initial Setup before functions  ===========
let typingTimer;                //timer identifier
let doneTypingInterval = 600;  //time in ms (1 second = 1000)
let myInput = document.getElementById('searchBar');
const resultsContainer = document.getElementById('results'); // element to display results within

// ===========  Start the countdown on 'keyup'  ===========
myInput.addEventListener('keyup', async () => {
    removeAllChildNodes(resultsContainer);
    clearTimeout(typingTimer);
    if (myInput.value.length >= 3) {
        // status.innerHTML = 'Searching...';
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});

// ===========  User is "finished typing," do something  ===========
function doneTyping () {
    // fetch super hero data
    fetchSuperHeroes(myInput.value);
}

// ===========  Clear results container (remove previous search resutls)  ===========
function removeAllChildNodes(parent) {
    // console.log('Parent:: ', parent);
    document.querySelectorAll('.list-group-item').forEach(
        child => child.remove());
}

// ===========  Display matching results on DOM  ===========
function showResults(data) {
    let maxResultsToDisplay = 1;
    data.results.map(superHero => {
        // console.log(superHero);
        if (maxResultsToDisplay > 10) {
            return;
        }
        maxResultsToDisplay++;
        
        // 1. Create and Insert HTML
        let ul = document.createElement("ul");
        ul.className = "list-group";
        
        let anchorTag = document.createElement('a');
        anchorTag.className = "list-group-item list-group-item-action small";
        anchorTag.title = superHero.biography['full-name'];
        anchorTag.href = "superhero.html?id=" + superHero.id;
        
        let flexDiv = document.createElement('div');
        flexDiv.className = "d-flex";
        
        let imgContainer = document.createElement('div');
        
        let heroAvatar = document.createElement('img');
        heroAvatar.className = "img-fluid";
        heroAvatar.src = superHero.image.url;
        heroAvatar.alt = superHero.name + "'s thumbnail";
        heroAvatar.height = 30;
        heroAvatar.width = 50;
        
        let infoContainer = document.createElement('div');
        infoContainer.className = "ml-3";
        
        let characterName = document.createElement('div');
        characterName.innerHTML = superHero.name;
        characterName.className = "font-weight-bold";
        
        let realName = document.createElement('div');
        realName.className = "text-muted small";
        realName.innerHTML = superHero.biography['full-name'];
        
        let group = document.createElement('div');
        group.innerHTML = superHero.connections['group-affiliation'];
                
        ul.append(anchorTag);
        anchorTag.append(flexDiv);
        flexDiv.append(imgContainer, infoContainer);
        imgContainer.append(heroAvatar);
        infoContainer.append(characterName, realName, group);
        
        resultsContainer.append(ul); // adds all superheroes cards to DOM
    });
}

// ===========  No Matching results found  ===========
function noResult() {
    let ul = document.createElement("ul");
    ul.className = "list-group";
    
    let anchorTag = document.createElement('a');
    anchorTag.className = "list-group-item list-group-item-action small";
    anchorTag.href = "javascipt:void(0)";
    
    let span = document.createElement('span');
    span.innerHTML = "No match found!";
    
    ul.append(anchorTag);
    anchorTag.append(span);
    resultsContainer.append(ul);
}

//  ===========  Hit API and Fetch the matching characters  ===========
async function fetchSuperHeroes(input) {
    try {
        const response = await fetch(`https://www.superheroapi.com/api.php/2496364390592143/search/` + input)
        .then(response => response.json()) // converting response to json
        .then(
            function(data) {
                // to show the results on the page
                if (data.response == "success") {
                    showResults(data);
                } else
                    noResult();
            }
            );
    } catch (err) {
        console.log('Inside catch', err);
    }
}