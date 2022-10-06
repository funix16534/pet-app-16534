"use strict";
//Em chỉ thao khảo code do trang hướng dẫn học hoặc mentor chỉ. Nếu code của em có chỗ còn chưa clean xin phản ánh giúp em trong mail chấm điểm. Em xin chân thành cảm ơn!

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
const sibebar = document.getElementById("sidebar");

// Additional Animation for Sidebar
const toggleActive = () => sibebar.classList.toggle("active");
sibebar.addEventListener("click", toggleActive);

//Definite necessary variable and function
let dataPet;

//Generate new option
function genOption(option) {
  return `<option>${option.breed}</option>`;
}

function renderBreed() {
  //Get breed from the storage and filter by type (dog/cat)
  let breeds = getFromStorage("listBreed");
  breedInput.innerHTML = "<option>Select Breed</option>";
  breeds
    .filter((breed) => breed.type == typeInput.value)
    .forEach((breed) => {
      //Make new option
      const option = document.createElement("option");
      option.innerHTML = genOption(breed);
      breedInput.appendChild(option);
    });
}

function renderTableData(pets) {
  //Delete old table
  tableBodyEl.innerHTML = "";
  //Add new row with each object in Pet array
  pets.forEach((pet) => {
    getFromStorage("listPet");
    const row = document.createElement("tr");
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
}

//Generate new row
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
          <button type="button" class="btn btn-danger btn-delete"
          id="btn-delete" data-id="${row.id}">Delete</button>
      </td>
  `;
}

renderTableData(petArr);

//When change value of type, breed changes too.
typeInput.addEventListener("change", renderBreed);

//Add event to submit button
submitBtn.addEventListener("click", function () {
  //Input form
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
  // Validate data
  let checkId = true;
  if (data.id === "") {
    alert("Please input Id!");
    checkId = false;
  }
  //ID must different
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("Id must unique!");
      checkId = false;
    }
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
    //Reset form
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
    //Save new data, copy data to display data on screen
    dataPet = Object.assign({}, data);
    petArr.push(dataPet);
    saveToStorage("listPet", petArr);
    renderTableData(petArr);
  }
});

//Add event for Delete button, Show healthy buttons don't require in this assignment so I don't add this here
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;
  const petId = e.target.getAttribute("data-id");
  // Xác nhận người dùng muốn xóa
  if (!petId) return;
  const isConfirm = confirm("Are you sure?");
  if (!isConfirm) return;
  console.log(`Delete pet with id = ${petId}`);
  //bỏ dữ liệu thú cưng theo id cùng hàng với nút Delete người dùng ấn
  petArr.splice(
    petArr.findIndex((pet) => pet.id == petId),
    1
  );
  //bảng theo mảng mới
  saveToStorage("listPet", petArr);
  renderTableData(petArr);
});
