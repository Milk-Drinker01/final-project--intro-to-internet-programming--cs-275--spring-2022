const slideWidth = 520;
const slideHeight = 300;
const scrollSpeed = 5;
const buttonSize = 35;
let imageIndex = 0;
let currentPixelOffset = 0;
let targetPixelOffset = 0;
let slideShowList = document.getElementById(`slideList`);
let numSlides = slideShowList.childElementCount;

window.onload = () =>
{
    document.addEventListener(`keydown`, function(event) {
        if (event.keyCode == 37 && imageIndex !== 0) {
            cycleSlideShow(-1);
        }
        else if (event.keyCode == 39 && imageIndex !== numSlides-1) {
            cycleSlideShow(1);
        }
    }, true);

    document.getElementById(`ButtonLeft`).style.display = `none`;
    document.getElementById(`ButtonLeft`).onclick = function() {cycleSlideShow(-1);};
    document.getElementById(`ButtonRight`).onclick = function() {cycleSlideShow(1);};

    //initialize button positions and size
    let leftButton = document.getElementById(`ButtonLeft`);
    let rightButton = document.getElementById(`ButtonRight`);
    rightButton.style.setProperty(`--marginLeft`, slideWidth - buttonSize + `px`);
    rightButton.style.setProperty(`--marginTop`, (slideHeight - buttonSize)/2+ `px`);
    rightButton.style.setProperty(`--buttonSize`, buttonSize+ `px`);
    leftButton.style.setProperty(`--marginTop`, (slideHeight - buttonSize)/2+ `px`);
    leftButton.style.setProperty(`--buttonSize`, buttonSize+ `px`);
    //initialize margin
    slideShowList.style.setProperty(`--marginLeft`, -currentPixelOffset + `px`);
    slideShowList.style.setProperty(`--width`, slideWidth * numSlides + `px`);
};

let cycleSlideShow = (direction) =>
{
    imageIndex+= direction;
    document.getElementById(`ButtonLeft`).style.display = ``;
    document.getElementById(`ButtonRight`).style.display = ``;
    if (imageIndex === 0){
        document.getElementById(`ButtonLeft`).style.display = `none`;
    }
    else if (imageIndex === numSlides - 1){
        document.getElementById(`ButtonRight`).style.display = `none`;
    }

    targetPixelOffset = imageIndex * slideWidth;
    moveSlideTowardsCurrentImage();
};

//theres probably an easier way to do this but fuck it
let moveSlideTowardsCurrentImage = () =>
{
    let sign = clamp(targetPixelOffset - currentPixelOffset, -1, 1);
    let maxDelta = Math.abs(targetPixelOffset - currentPixelOffset);
    currentPixelOffset = currentPixelOffset + sign * clamp(scrollSpeed, 0, maxDelta);
    slideShowList.style.setProperty(`--marginLeft`, -currentPixelOffset + `px`);
    if (targetPixelOffset != currentPixelOffset)
    {
        setTimeout(moveSlideTowardsCurrentImage, 1);
    }
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
