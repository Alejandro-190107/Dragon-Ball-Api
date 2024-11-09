function searchCharacter() {
    
    const characterName = document.getElementById('characterName').value.trim();
    //* API Dragon Ball
    const url = `https://dragonball-api.com/api/characters?name=${encodeURIComponent(characterName)}`;

    //! if no name is entered. request it to search.
    if (!characterName) {
        Swal.fire({
            title: "Error",
            text: "Please enter a character name.",
            icon: "warning",
            confirmButtonColor: '#D81B60',
        });
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Character not found.');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const character = data[0];

                //* Create HTML dynamically.
                const htmlContent = `
                    <div class="card-body">
                        <div class="row g-0">

                            <div class="col-md-4">
                                <p class="list-group-item my-1"><strong> ${character.name} </strong></p>
                                <img src="${character.image}" class="img-fluid rounded-start img-characterData" alt="character">
                            </div>
                            
                            <div class="col-md-8">
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item list-characterData"><strong> Race: </strong>${character.race}</li>
                                        <li class="list-group-item list-characterData"><strong> Base KI: </strong>${character.ki}</li>
                                        <li class="list-group-item list-characterData"><strong> Gender: </strong>${character.gender}</li>
                                        <li class="list-group-item list-characterData"><strong> Total KI: </strong>${character.maxKi}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            //* Insert the dynamic HTML into the container.
            document.getElementById('resultado').innerHTML = htmlContent;
            } else {
                Swal.fire({
                    title: "Character not found.",
                    text: "Try another name.",
                    icon: "error",
                    confirmButtonColor: '#D81B60',
                });
            }
        })
        .catch(error => { //! If the name is not found or the API does not work, the following will be displayed
            Swal.fire({
                title: "Error",
                text: "The character was not found or there was a problem with the search.",
                icon: "error",
                confirmButtonColor: '#D81B60',
            });
        });
}