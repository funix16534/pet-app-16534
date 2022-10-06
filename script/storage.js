"use strict";
let breedArr = [];
breedArr = localStorage.getItem("listBreed")
  ? JSON.parse(localStorage.getItem("listBreed"))
  : [];
let petArr = [];
petArr = localStorage.getItem("listPet")
  ? JSON.parse(localStorage.getItem("listPet"))
  : [];
// Lấy ra các DOM cần thiết
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
