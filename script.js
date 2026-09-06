const photos = [
 "./46 days.png",
"./47 days.png",
"./48 days.png",
"./49 days.png",
"./50 days.png",
"./51 days.png",
"./52 days.png",
"./53 days.png",
"./54 days.png",
];

const featureImage = document.querySelector("#featureImage");
const featureTitle = document.querySelector("#featureTitle");
const photoStack = document.querySelector("#photoStack");
const stackButton = document.querySelector(".stack-button");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

const getDayCount = (src) => {
  const match = src.match(/(\d+)\s*days?/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const toTitle = (src) => {
  const fileName = decodeURIComponent(src.split("/").pop() || "");
  return fileName.replace(/\.[^.]+$/, "").replace(/-/g, " ");
};

const orderedPhotos = [...photos].sort((a, b) => getDayCount(a) - getDayCount(b));
let currentIndex = 0;

function showPhoto(index) {
  currentIndex = (index + orderedPhotos.length) % orderedPhotos.length;
  const currentPhoto = orderedPhotos[currentIndex];

  featureImage.src = currentPhoto;
  featureImage.alt = `${toTitle(currentPhoto)} countdown artwork`;
  featureTitle.textContent = toTitle(currentPhoto);

  renderStack();
}

function renderStack() {
  photoStack.innerHTML = "";

  const sidePhotos = orderedPhotos.filter((_, index) => index !== currentIndex);
  sidePhotos.slice(0, 5).forEach((photo, index) => {
    const card = document.createElement("span");
    card.className = "stack-card";
    card.style.transform = `translateX(${index * -9}px) translateY(${index * 8}px) rotateZ(${index * -3 - 2}deg)`;
    card.style.zIndex = String(10 - index);
    card.style.opacity = String(1 - index * 0.12);

    const image = document.createElement("img");
    image.src = photo;
    image.alt = "";
    card.append(image);
    photoStack.append(card);
  });
}

function moveNext() {
  showPhoto(currentIndex + 1);
}

function movePrevious() {
  showPhoto(currentIndex - 1);
}

stackButton.addEventListener("click", moveNext);
prevButton.addEventListener("click", movePrevious);
nextButton.addEventListener("click", moveNext);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    movePrevious();
  }

  if (event.key === "ArrowRight") {
    moveNext();
  }
});

showPhoto(0);
