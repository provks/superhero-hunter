// Toggle favourite
function favourite(anchor) {
    // console.log('inside fav')
    // let elementClassList = anchor.firstChild.classList;
    // if (elementClassList.contains('fas')){
    //     // remove from localstorage

    //     localStorage.removeItem(characterId);

    //     anchor.firstChild.classList.remove("fas")
    //     anchor.firstChild.classList.add("far");
    // }
    var retrievedObject = localStorage.getItem('testObject');

    console.log('fav retrievedObject: ', JSON.parse(retrievedObject));
}