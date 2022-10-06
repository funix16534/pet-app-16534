"use strict";

const submitBtn = document.getElementById("submit-btn");
const deleteBtn = document.querySelectorAll(".btn-danger");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const sibebar = document.getElementById("sidebar");

// Additional Animation for Sidebar
const toggleActive = () => sibebar.classList.toggle("active");
sibebar.addEventListener("click", toggleActive);

//Definite variables and function
let findPet = [];
// Local Storage
function renderBreed() {
  let breeds = getFromStorage("listBreed");
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.innerHTML = genOption(breed);
    breedInput.appendChild(option);
  });
}

function genOption(option) {
  return `<option>${option.breed}</option>`;
}

renderBreed();

function renderTableData(pets) {
  //Delete old table
  tableBodyEl.innerHTML = "";
  //Generate new row
  pets.forEach((pet) => {
    getFromStorage("listPet");
    const row = document.createElement("tr");
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
}

function genRow(row) {
  return `
      <th scope="row">${row.id}</th>
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.type}</td>
      <td>${row.weight} kg</td>
      <td>${row.length} cm</td>
      <td>${row.breed}</td>
      <td>
          <i class="bi bi-square-fill" style="color: ${row.color}"></i>
      </td>
      <td><i class="bi ${
        row.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i></td>
      <td><i class="bi ${
        row.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i></td>
      <td><i class="bi ${
        row.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
      } "></i></td>
      <td>${row.date}</td>
  `;
}

//Submit event
findBtn.addEventListener("click", function () {
  //Input Form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  //Search data!
  getFromStorage("listPet");
  findPet = petArr.filter(
    (pet) =>
      pet.id.includes(data.id) &&
      pet.name.includes(data.name) &&
      (pet.type === data.type || data.type == "Select Type") &&
      (pet.breed === data.breed || data.breed == "Select Breed") &&
      (pet.vaccinated === data.vaccinated || data.vaccinated === false) &&
      (pet.dewormed === data.dewormed || data.dewormed === false) &&
      (pet.sterilized === data.sterilized || data.sterilized === false)
  );
  // Display data on screen
  renderTableData(findPet);
});
