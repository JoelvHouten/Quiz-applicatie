// Startscherm verbergen en quiz tonen
document.getElementById("btn-start").addEventListener("click", () => {
    document.getElementById("welkom").style.display = "none";
    document.getElementById("quiz").style.display = "block";
});
