const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

const searchByCenter = document.querySelector("[data-center]");
const searchByCity = document.querySelector("[data-city]");
const searchByState = document.querySelector("[data-state]");
const searchReset = document.querySelector("[data-reset]");

let users = [];

searchByState.addEventListener("click", performStateSearch);
searchByCity.addEventListener("click", performCitySearch);
searchByCenter.addEventListener("click", performCenterSearch);
searchReset.addEventListener("click", resetSearch);

function performStateSearch() {
  const value = searchInput.value.toLowerCase();
  users.forEach((user) => {
    const isVisible = user.state.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
}

function performCitySearch() {
  const value = searchInput.value.toLowerCase();
  users.forEach((user) => {
    // const isVisible = user.Place.toLowerCase().includes(value);
    const isVisible = user.place.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
}

function performCenterSearch() {
  const value = searchInput.value.toLowerCase();
  users.forEach((user) => {
    const isVisible = user.name.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
}

function resetSearch() {
  const value = "";
  users.forEach((user) => {
    const isVisible = user.name.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
}

// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   users.forEach((user) => {
//     const isVisible =
//       user.name.toLowerCase().includes(value) ||
//       user.state.toLowerCase().includes(value) ||
//       user.place.toLowerCase().includes(value);
//     user.element.classList.toggle("hide", !isVisible);
//   });
// });

fetch("https://isro.vercel.app/api/centres")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    users = data.centres.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const subtitle = card.querySelector("[data-subtitle]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.State;
      subtitle.textContent = user.Place;
      body.textContent = user.name;
      userCardContainer.append(card);
      return {
        name: user.name,
        state: user.State,
        place: user.Place,
        element: card,
      };
    });
  });
