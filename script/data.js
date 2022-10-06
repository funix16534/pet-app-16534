"use strict";

// Retrieve the required DOM
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");

//Function create link to export
function exportToJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = "data.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

exportBtn.addEventListener("click", function () {
  exportToJsonFile(JSON.parse(localStorage.getItem("listPet")));
});

importBtn.addEventListener("click", function () {
  //input file
  var file = document.getElementById("input-file").files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      localStorage.setItem("listPet", evt.target.result);
    };
  }
});
