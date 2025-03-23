document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");

    fetch(baseUrl)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });
    function displayCharacter(character) {
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      voteCount.textContent = character.votes;
      imageElement.dataset.id = character.id;
    }

    votesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const votesInput = document.getElementById("votes");
      const newVotes = parseInt(votesInput.value) || 0;
      const currentVotes = parseInt(voteCount.textContent);
      voteCount.textContent = currentVotes + newVotes;
      votesInput.value = "";
    });
})