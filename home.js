document.querySelectorAll(".accordion").forEach(item => {
    item.addEventListener("click", function () {
        const parentCard = this.parentNode;
        parentCard.classList.toggle("active");
    });
});

document.querySelectorAll(".fa-solid").forEach(icon => {
    icon.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});