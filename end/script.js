var points = localStorage.getItem("points");

if (points) {
  $(".points").text(points);
} else {
  localStorage.setItem("points", 0);
  points = localStorage.getItem("points");
  $(".points").text(points);
}
