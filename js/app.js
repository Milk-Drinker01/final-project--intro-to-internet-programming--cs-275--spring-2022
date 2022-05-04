let images = [
    `img/blue.png`,
    `img/black.png`,
    `img/green.png`
];
let imageIndex = 0;
let transitionDuration = 0;

window.onload = () =>
{
    document.getElementById(`ButtonLeft`).onclick = function() {cycleSlideShow(-1);};
    document.getElementById(`ButtonRight`).onclick = function() {cycleSlideShow(1);};
};

let cycleSlideShow = (direction) =>
{
    console.log(document.getElementById(`ButtonLeft`).style.display);
    imageIndex+= direction;
    document.getElementById(`ButtonLeft`).style.display = ``;
    document.getElementById(`ButtonRight`).style.display = ``;
    if (imageIndex === 0){
        document.getElementById(`ButtonLeft`).style.display = `none`;
    }
    else if (imageIndex === images.length-1){
        document.getElementById(`ButtonRight`).style.display = `none`;
    }
    imageIndex = imageIndex % images.length;
    slideShow();
};


function slideShow() {
    document.getElementById(`slideShow`).className += `fadeOut`;
    setTimeout(function() {
        document.getElementById(`slideShow`).src = images[imageIndex];
        document.getElementById(`slideShow`).className = ``;
    },1000);

    setTimeout(slideShow, transitionDuration);
}
slideShow();
