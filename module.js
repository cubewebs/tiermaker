const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

const imageInput = $('#image-input');
const selectorItems = $('#selector-items');

imageInput.addEventListener('change', (event) => {
    const [file] = event.target.files;

    if(file) {
        const reader = new FileReader();

        reader.onload = (eventReader) => {
            const imageElement = document.createElement('img');
            imageElement.draggable = true;
            imageElement.src = eventReader.target.result;
            imageElement.classList.add('item-image');

            imageElement.addEventListener('dragstart', handleDragStart)

            imageElement.addEventListener('dragend', handleDragEnd)

            selectorItems.appendChild(imageElement)
        }

        reader.readAsDataURL(file);
    }
})

let draggedElement = null;
let sourceContainer = null;

function handleDragStart(event) {
    console.log('drag Start -> ', event.target)
    draggedElement = event.target;
    const sourceContainer = draggedElement.parentNode;
    sourceContainer.classList.add('dragging');
    event.dataTransfer.setData('text/plain', draggedElement.id);
    event.dataTransfer.setDragImage(draggedElement, 0, 0);
}

function handleDragEnd() {
    console.log('drag End -> ', event.target)
    const sourceContainer = draggedElement.parentNode;
    sourceContainer.classList.remove('dragging');
    draggedElement = null;
}