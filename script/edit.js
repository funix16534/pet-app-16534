"use strict";

// Retrieve the required DOM
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
const heathBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");
const row = document.createElement("tr");
const tableBodyEl = document.getElementById("tbody");
const form = document.getElementById("container-form");
const sibebar = document.getElementById("sidebar");

// Additional Animation for Sidebar
const toggleActive = () => sibebar.classList.toggle("active");
sibebar.addEventListener("click", toggleActive);

//Definite functions and variables

let dataPet;
// Local Storage
function renderBreed() {
  let breeds = getFromStorage("listBreed");
  breedInput.innerHTML = "<option>Select Breed</option>";
  breeds
    .filter((breed) => breed.type == typeInput.value)
    .forEach((breed) => {
      const option = document.createElement("option");
      option.innerHTML = genOption(breed);
      breedInput.appendChild(option);
    });
}
function genOption(option) {
  return `<option>${option.breed}</option>`;
}

function renderTableData(pets) {
  //Delete old table
  tableBodyEl.innerHTML = "";
  //Generate new rơ
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
      <td>
          <button type="button" class="btn btn-warning btn-delete"
          id="btn-edit" data-id="${row.id}">Edit</button>
      </td>
  `;
}
renderTableData(petArr);
typeInput.addEventListener("change", renderBreed);
//Add event to Edit button
tableBodyEl.addEventListener("click", function (e) {
  const petId = e.target.getAttribute("data-id");
  //Active form
  form.classList.remove("hide");
  //Check to edit with id
  const editSelect = petArr.findIndex((pet) => pet.id == petId);
  getFromStorage("listPet");
  idInput.value = petArr[editSelect].id;
  nameInput.value = petArr[editSelect].name;
  ageInput.value = petArr[editSelect].age;
  typeInput.value = petArr[editSelect].type;
  weightInput.value = petArr[editSelect].weight;
  lengthInput.value = petArr[editSelect].length;
  colorInput.value = petArr[editSelect].color;
  renderBreed();
  //Select breed by type
  breedInput.value = petArr[editSelect].breed;
  vaccinatedInput.checked = petArr[editSelect].vaccinated;
  dewormedInput.checked = petArr[editSelect].dewormed;
  sterilizedInput.checked = petArr[editSelect].sterilized;
  submitBtn.addEventListener("click", function () {
    //Input Form
    const data = {
      id: idInput.value,
      name: nameInput.value,
      age: parseInt(ageInput.value),
      type: typeInput.value,
      weight: parseInt(weightInput.value),
      length: parseInt(lengthInput.value),
      color: colorInput.value,
      breed: breedInput.value,
      vaccinated: vaccinatedInput.checked,
      dewormed: dewormedInput.checked,
      sterilized: sterilizedInput.checked,
      date: new Date().toLocaleDateString("en-GB"),
    };
    // Validate dữ liệu trong bảng!
    let checkId = true;
    if (data.id === "") {
      alert("Please input Id!");
      checkId = false;
    }
    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
    }
    if (data.weight < 1 || data.age > 15) {
      alert("Weight must be between 1 and 15");
    }
    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100");
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
    }
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
    }
    if (
      checkId === true &&
      data.age >= 1 &&
      data.age <= 15 &&
      data.weight >= 1 &&
      data.weight <= 15 &&
      data.length >= 1 &&
      data.length <= 15 &&
      data.type !== "Select Type" &&
      data.breed !== "Select Breed"
    ) {
      //Save data, display data on screen
      dataPet = Object.assign({}, data);
      petArr[editSelect] = dataPet;
      saveToStorage("listPet", petArr);
      renderTableData(petArr);
      form.classList.add("hide");
    }
  });
});
