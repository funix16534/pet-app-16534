"use strict";

//Retrieve the required DOM
const sibebar = document.getElementById("sidebar");
const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

// Additional Animation for Sidebar
const toggleActive = () => sibebar.classList.toggle("active");
sibebar.addEventListener("click", toggleActive);

//Definite necessary variable and function
let dataBreed;
function renderTableData(pets) {
  //Delete old table
  tableBodyEl.innerHTML = "";
  //Generate new row with each object in Breed array
  pets.forEach((pet) => {
    getFromStorage("listBreed");
    const row = document.createElement("tr");
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
}
function genRow(row) {
  return `
        <td>${breedArr.indexOf(row) + 1}</td>
        <td>${row.breed}</td>
        <td>${row.type}</td>
        <td>
            <button type="button" class="btn btn-danger btn-delete"
            id="btn-delete" data-id="${row.breed}">Delete</button>
        </td>
    `;
}
renderTableData(breedArr);

//Gán sự kiện vào nút Submit
submitBtn.addEventListener("click", function () {
  //Input form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // Validate data
  if (data.type === "Select Type") {
    alert("Please select Type!");
  }
  if (data.breed === "Input Breed") {
    alert("Please select Breed!");
  }
  if (data.type !== "Select Type" && data.breed !== "Input Breed") {
    //Reset form
    typeInput.value = "Select Type";
    breedInput.value = "";
    //Save data to stoage, copy it to display data on screen
    dataBreed = Object.assign({}, data);
    breedArr.push(dataBreed);
    saveToStorage("listBreed", breedArr);
    renderTableData(breedArr);
  }
});

//Add event to Delete button
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;
  const breed = e.target.getAttribute("data-id");
  //Confirm delete
  if (!breed) return;
  const isConfirm = confirm("Are you sure?");
  if (!isConfirm) return;
  console.log(`Delete breed '${breed}'`);
  //Delete object and save data
  breedArr.splice(
    breedArr.findIndex((pet) => pet.breed == breed),
    1
  );
  saveToStorage("listBreed", breedArr);
  renderTableData(breedArr);
});
