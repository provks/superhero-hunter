var storedCharactersArray = JSON.parse(localStorage.getItem("characters"));
console.log('storedCharactersArray', storedCharactersArray);
// no favourites in the localStorage
if (storedCharactersArray == null || storedCharactersArray.length == 0) {
    document.getElementsByClassName('empty-list')[0].classList.remove('d-none');
    document.getElementsByClassName('card')[0].classList.add('d-none');
} else {
    showFavourites();
}

function showFavourites() {
    for (let i = 0; i < storedCharactersArray.length; i++) {
        let character = storedCharactersArray[i];
        addCharacterToDom(character);
    }
}

function addCharacterToDom(character) {
    // card
    let card = document.createElement('div');
    card.className = 'col-12 p-0 mr-2 my-2 mr-md-4 col-md-3 card';
    // avatar
    let characterAvatar = document.createElement('img');
    characterAvatar.src = character.image.url;
    characterAvatar.classList.add('card-img-top');
    characterAvatar.alt = character.name+"\'s portrait";
    characterAvatar.height = "350";
    characterAvatar.width = "170";
    // card-body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body p-2';
    // d-flex
    let dFlex = document.createElement('div');
    dFlex.className = "d-flex justify-content-between";
    // card-title container
    let titleContainer = document.createElement('div');
    // card-title
    let cardTitle = document.createElement('h5');
    cardTitle.className = "card-title mb-2";
    cardTitle.innerHTML = character.name;
    // favourite btn container
    let favContainer = document.createElement('div');
    // favourite btn
    let favBtn = document.createElement('a');
    favBtn.href = "javascript:void(0);";
    favBtn.className = "text-danger z-index-2";
    favBtn.id = "fav-btn";
    favBtn.title = "favourite";
    favBtn.dataset.id = character.id;
    // TODO
    favBtn.addEventListener('click',function(e){
        // console.log('this', this);
        removeFromFavourite(this);
    })
    // favourite icon
    let favIcon = document.createElement('i');
    favIcon.className = "fas fa-heart fa-lg";
    // d-flex1
    let dFlex1 = document.createElement('div');
    dFlex1.className = "d-flex justify-content-between";
    // subtitle container
    let subtitleContainer = document.createElement('div');
    // subtitle
    let subtitle = document.createElement('p');
    subtitle.className = "sub-title text-muted small m-0";
    subtitle.innerHTML = character.biography['full-name'];
    // publisher container
    let publisherContainer = document.createElement('div');
    // publisher
    let publisher = document.createElement('p');
    publisher.className = "publisher text-muted small m-0";
    publisher.innerHTML = character.biography.publisher;
    // appearance list
    let ul = document.createElement('ul');
    ul.className = "list-group list-group-horizontal small";
    // gender list item
    let gender = document.createElement('li');
    gender.className = "list-group-item small p-2 flex-fill";
    gender.innerHTML = "Gender"+"</br>"+character.appearance.gender;
    // race list item
    let race = document.createElement('li');
    race.className = "list-group-item small p-2 flex-fill";
    race.innerHTML = "Race"+"</br>"+character.appearance.race;
    // height list item
    let height = document.createElement('li');
    height.className = "list-group-item small p-2 flex-fill";
    height.innerHTML = "Height"+"</br>"+character.appearance.height[0];
    // weight list item
    let weight = document.createElement('li');
    weight.className = "list-group-item small p-2 flex-fill";
    weight.innerHTML = "Weight"+"</br>"+character.appearance.weight[1];
    // stretchedLink
    let stretchedLink = document.createElement('a'); 
    stretchedLink.className = "stretched-link";
    stretchedLink.href = "superhero.html?id="+character.id;

    // append
    card.append(characterAvatar, cardBody, ul, stretchedLink);
    cardBody.append(dFlex,dFlex1);
    dFlex.append(titleContainer, favContainer);
    titleContainer.append(cardTitle);
    favContainer.append(favBtn);
    favBtn.append(favIcon);
    dFlex1.append(subtitleContainer, publisherContainer);
    subtitleContainer.append(subtitle);
    publisherContainer.append(publisher);
    ul.append(gender, race, height, weight);
    // append in DOM
    document.getElementsByClassName('row')[0].append(card);

}

// Remove from favourite
function removeFromFavourite(element) {
    // console.log('inside removeFav');
    // console.log('element.dataset.id', element.dataset.id);
    // console.log('element', element);
    // 1.remove from DOM
    if(confirm("Remove " + element.parentElement.previousSibling.firstChild.innerHTML + " from favourites?")) {
        element.parentElement.parentElement.parentElement.parentElement.remove();
    }

    // 2.remove from localStorage
    // storedCharactersArray = JSON.parse(localStorage.getItem("characters"));
    let characterId = element.dataset.id;
    for (let i = 0; i < storedCharactersArray.length; i++) {
        console.log('removeFromFavourite Condition :: ', storedCharactersArray[i].id + ' == ' + characterId);
        console.log(storedCharactersArray[i].id == characterId);
        if (storedCharactersArray[i].id == characterId) {
            console.log("SPLICING");
            storedCharactersArray.splice(i,1);
            localStorage.setItem("characters", JSON.stringify(storedCharactersArray));
            alert(element.parentElement.previousSibling.firstChild.innerHTML + ' has been removed from favourites.');
        }
    }

}