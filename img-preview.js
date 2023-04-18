const images = document.querySelectorAll('img[id^="image-"]')
const fullscreen = document.getElementById('fullscreen')
const fullscreenElements = fullscreen.firstElementChild;
const closeBtn = document.getElementById('close')
const left = document.getElementById('arrow-left')
const right = document.getElementById('arrow-right')
const htmlElement = document.getElementsByTagName('html')[0];
const bodyElement = document.getElementsByTagName('body')[0];

const preventDefaultEventActions = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

const createNewImageElement = (image) => {
    let fullscreenImage = document.createElement("img");
    fullscreenImage.id = image.id;
    fullscreenImage.src = image.src;
    fullscreenImage.alt = image.alt;

    return fullscreenImage;
}

images.forEach(image => {
    image.addEventListener('click', (e) => {
        e.stopPropagation();
        var fullscreenImage = createNewImageElement(image);
        fullscreenElements.appendChild(fullscreenImage);
        fullscreen.classList.add("visible");

        htmlElement.style.overflow = "hidden";
        htmlElement.style["scrollbar-gutter"] = "unset";
    });
});

const closeImage = () => {
    fullscreen.classList.remove('visible');
    fullscreenElements.removeChild(fullscreenElements.lastChild);
    htmlElement.style.overflow = "auto";
    htmlElement.style["scrollbar-gutter"] = "stable";
}

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeImage();
});

const findImageIndex = (currentImageId) => {
    for (let i = 0; i < images.length; i++) {
        if (images[i].id === currentImageId) return i;
    }
}

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const isPositionValid = (position) => position && (position === LEFT || position === RIGHT);

const iterateImage = (position) => {
    const currentImageId = fullscreenElements.lastChild.id;
    let currentImageIndex = findImageIndex(currentImageId);
    if (!isPositionValid(position) && !currentImageIndex && currentImageIndex !== 0) {
        closeImage();
    }
    let nextImageIndex = position === LEFT ? images.length - 1 : 0;
    if (position === LEFT) {
        if (currentImageIndex - 1 >= 0) {
            nextImageIndex = currentImageIndex - 1;
        }
    } else { // Due to the isPositionValid check, we are sure the only other option is RIGHT
        if (currentImageIndex + 1 < images.length) {
            nextImageIndex = currentImageIndex + 1;
        }
    }
    fullscreenElements.removeChild(fullscreenElements.lastChild);
    let nextImage = images[nextImageIndex];
    let fullscreenImage = createNewImageElement(nextImage);

    fullscreenImage.ontouchstart = preventDefaultEventActions;
    fullscreenImage.onclick = preventDefaultEventActions;
    fullscreenImage.ondrag = preventDefaultEventActions;
    fullscreenImage.ondragstart = preventDefaultEventActions;

    fullscreenElements.appendChild(fullscreenImage);
}

left.addEventListener('click', (e) => {
    e.stopPropagation();
    iterateImage(LEFT);
});

right.addEventListener('click', (e) => {
    e.stopPropagation();
    iterateImage(RIGHT);
});

document.addEventListener('keydown', (e) => {
    const code = e.which || e.keyCode;
    // On Escape key press
    if (code === 27 && fullscreen.classList.contains('visible')) {
        closeImage();
    }
    // On left arrow/a key press
    if ((code === 37 || code === 65) && fullscreen.classList.contains('visible')) {
        iterateImage(LEFT);
    }
    // On right arrow/d key press
    if ((code === 39 || code === 68) && fullscreen.classList.contains('visible')) {
        iterateImage(RIGHT);
    }
});

fullscreen.addEventListener("click", (e) => {
    if (e.target === fullscreen || e.target.tagName !== "IMG") {
        closeImage();
    }
});
