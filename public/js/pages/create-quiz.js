let categorySelected = document.querySelector('.option');

function selectCategory(className) {
    if (categorySelected.classList.contains(className)) {
        return;
    }

    categorySelected.classList.remove("active-option");
    const element = document.getElementsByClassName(className)[0];
    element.classList.add("active-option");
    categorySelected = element;
}