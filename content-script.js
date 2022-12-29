const hamzaImgArray = [
  "https://i.ibb.co/2yfY2Jq/hamza1.png",
  "https://i.ibb.co/FYVx4t0/hamza2.png",
  "https://i.ibb.co/VQ0xK9j/hamza3.png",
  "https://i.ibb.co/qYjK8qg/hamza4.png",
  "https://i.ibb.co/jRJM6fT/hamza5.png"
];

const pickRandomHamzaImage = () => {
  const randomIndex = Math.floor(Math.random() * hamzaImgArray.length);
  console.log('randomIndex', randomIndex);
  return hamzaImgArray[randomIndex];
}

const handleCounter = (newDiv, body) => {
  const hostname = window.location.hostname;
  let count = 1;
  chrome.storage.sync.get([hostname], function (result) {
    if (result[hostname]) count = result[hostname] + 1;
    chrome.storage.sync.set({ [hostname]: count }, function () {
      console.log('Number of times this website was opened ' + count);
      const counterWrapperDiv = document.createElement("div");
      const counterH2 = document.createElement("h2");
      counterH2.innerHTML = `You have opened this website ${count} times!!`;
      counterWrapperDiv.appendChild(counterH2);

      counterWrapperDiv.setAttribute("style", "background: #ff6c00; position: absolute; bottom: 0; left: 0; right: 0; text-align: center; font-family: sans-serif;");
      counterH2.setAttribute("style", "color: white; font-size: 3rem; padding: 10px;")

      newDiv.appendChild(counterWrapperDiv);
      body.innerHTML = newDiv.outerHTML;
    });
  });
}

window.onload = async function () {
  const body = document.getElementsByTagName("body")[0];

  const newDiv = document.createElement("div");
  const newImg = document.createElement("img");
  newImg.src = pickRandomHamzaImage();

  newDiv.appendChild(newImg);

  newDiv.setAttribute("style", "background: #181818; height: 100vh; width: 100%; margin: 0;");
  newImg.setAttribute("style", "margin: auto; height: 100%; width: 100%;");

  await handleCounter(newDiv, body);
}