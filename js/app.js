const slideWidth = 210;
const slideHeight = 250;
const scrollSpeed = 5;
const buttonSize = 35;
let images = [
    `img/blue.png`,
    `img/black.png`,
    `img/green.png`,
    `img/red.png`
];
let imageIndex = 0;
let currentPixelOffset = 0;
let targetPixelOffset = 0;
let slideShowList = document.getElementById(`slideList`);
let allowSlideshowWrap = false;

window.onload = () =>
{
    document.getElementById(`ButtonLeft`).style.display = `none`;
    document.getElementById(`ButtonLeft`).onclick = function() {cycleSlideShow(-1);};
    document.getElementById(`ButtonRight`).onclick = function() {cycleSlideShow(1);};

    //add images dynamically
    for (let i = 0; i < images.length; i++)
    {
        let newImage = document.createElement(`img`);
        newImage.classList.add(`slide`);
        newImage.src = images[i];
        slideShowList.appendChild(newImage);
    }
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
    slideShowList.style.setProperty(`--width`, slideWidth * images.length + `px`);

    if (allowSlideshowWrap){
        document.getElementById(`ButtonLeft`).style.display = ``;
    }
};

//i decided to add the option to include an overlap,
//you can click left on the first element to go to the last or
//click right on the last element to go to the first.
let cycleSlideShow = (direction) =>
{
    imageIndex+= direction;
    document.getElementById(`ButtonLeft`).style.display = ``;
    document.getElementById(`ButtonRight`).style.display = ``;
    if (allowSlideshowWrap)
    {
        if (imageIndex===-1){
            imageIndex = images.length-1;
        }
        imageIndex = imageIndex % images.length;
    }
    else
    {
        if (imageIndex === 0){
            document.getElementById(`ButtonLeft`).style.display = `none`;
        }
        else if (imageIndex === images.length-1){
            document.getElementById(`ButtonRight`).style.display = `none`;
        }
    }

    targetPixelOffset = imageIndex * slideWidth;
    moveSlideTowardsCurrentImage();
};

//this probably isnt what you had in mind but fuck it
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
