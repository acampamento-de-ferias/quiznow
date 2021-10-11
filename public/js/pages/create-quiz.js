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

const urlArrowDown = "./images/arrow-collapse-down.png";
const urlArrowRight = "./images/arrow-collapse-right.png";
function selectAccordion(event) {
    const element = event.children[0];

    if (element.classList.contains("arrow-down")) {
        element.setAttribute("src", urlArrowRight);
        element.setAttribute("alt", "Seta para direita");
        element.classList.remove('arrow-down');
        element.classList.add("arrow-right");
        return;
    }

    if (element.classList.contains("arrow-right")) {
        element.setAttribute("src", urlArrowDown);
        element.setAttribute("alt", "Seta para baixo");
        element.classList.remove('arrow-right');
        element.classList.add("arrow-down");
        return;
    }
}
