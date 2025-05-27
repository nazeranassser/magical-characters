

const cardContainer = document.getElementById("cardContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const houseFilter = document.getElementById("houseFilter");
const defaultImage = "./images/not-found.png"; 

let characters = [];
let currentIndex = 0;
const step = 16;

function fetchData() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      characters = data;
      renderData();
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      cardContainer.innerHTML = "<p>Error loading characters.</p>";
      console.log("test");
      
      
    });
}

function renderData() {
  const selectedHouse = houseFilter.value;
  let filtered = characters;

  if (selectedHouse !== "All") {
    filtered = characters.filter(char => char.house === selectedHouse);
  }

  const sliceToShow = filtered.slice(currentIndex, currentIndex + step);
  sliceToShow.forEach((char) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${char.image || defaultImage}" alt="Character Image" onerror="this.src='${defaultImage}'">
      <div class="card-content">
        <p><strong>Name:</strong> ${char.name}</p>
        <p><strong>House:</strong> ${char.house || "Unknown"}</p>
        <p><strong>Date of Birth:</strong> ${char.dateOfBirth || "Unknown"}</p>
      </div>
    `;
    cardContainer.appendChild(card);
  });

  currentIndex += step;

  if (currentIndex >= filtered.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

houseFilter.addEventListener("change", () => {
  currentIndex = 0;
  cardContainer.innerHTML = "";
  renderData();
});

loadMoreBtn.addEventListener("click", renderData);

fetchData();
