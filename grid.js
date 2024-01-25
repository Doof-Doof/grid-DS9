document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid-container');
    const gridSize = 6;

    // Replace these image URLs with your own
    const images = [
        'Images/Multimedia.png',
        'Images/Books.png',
        'Images/Cycling.png',
        'Images/Café.png'
        // Add more image URLs as needed
    ];


    function shuffleAndDuplicate(array, times) {
        const duplicatedArray = [];
        for (let i = 0; i < times; i++) {
            duplicatedArray.push(...array);
        }
        duplicatedArray.sort(() => Math.random() - 0.5);
        return duplicatedArray;
    }

    function placeImages() {
        const duplicatedImages = shuffleAndDuplicate(images, gridSize * gridSize);
        for (let i = 0; i < Math.min(gridSize * gridSize, duplicatedImages.length); i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.style.backgroundImage = `url('${duplicatedImages[i]}')`;
            gridItem.draggable = true;
            gridItem.addEventListener('dragstart', handleDragStart);
            gridItem.addEventListener('dragover', handleDragOver);
            gridItem.addEventListener('drop', handleDrop);
            gridContainer.appendChild(gridItem);
        }
    }

    // Add event listeners for sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.style.backgroundImage);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const target = e.target;

        // Check if the drop target is a grid item
        if (target.className === 'grid-item') {
            const draggedImage = e.dataTransfer.getData('text/plain');
            target.style.backgroundImage = draggedImage;
        }
    }

    function handleGridItemClick(gridItem) {
        console.log(`Clicked on ${gridItem.style.backgroundImage}`);
    }

    placeImages();
});
