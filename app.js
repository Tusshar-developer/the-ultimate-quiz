document.querySelector(".toggle-button").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("oof");
  document.querySelector(".links").classList.toggle("active");
  document.querySelector(".toggle-button").classList.toggle("closingMode");
});
