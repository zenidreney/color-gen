const inputColor = document.getElementById("input-color");
const colorMode = document.getElementById("color-mode");
const getColorBtn = document.getElementById("get-color");

let userMode = "monochrome";
let userColor = "F55A5A";

colorMode.addEventListener("input", () => {
    console.log(colorMode.value);
    userMode = colorMode.value;
});

inputColor.addEventListener("input", () => {
    userColor = inputColor.value.slice(1);
    console.log(userColor);
});

getColorBtn.addEventListener("click", () => {
    fetch(`https://www.thecolorapi.com/scheme?hex=${userColor}&mode=${userMode}&count=4`)
        .then((res) => res.json())
        .then((data) => {
            console.log(userMode, data);

            const userScheme = [userColor];
            //console.log(userColor);

            for (let i = 0; i < data.colors.length; i++) {
                userScheme.push(data.colors[i].hex.value);
            }
            console.log(userScheme);

            const outputContainer = document.getElementById("output-container");

            //console.log(outputContainer, userColor, data.colors[0].hex.value);

            outputContainer.innerHTML = "";

            userScheme.forEach((hex, i) => {
                const innerDiv = document.createElement("div");
                const outputColorDiv = document.createElement("div");
                outputColorDiv.className = "output-color";
                outputColorDiv.id = `color-${i}`;

                const hexNumber = document.createElement("p");
                hexNumber.id = `hex-${i}`;
                hexNumber.textContent = hex;

                innerDiv.append(outputColorDiv, hexNumber);

                outputContainer.append(innerDiv);

                document.getElementById(`color-${i}`).style.backgroundColor = hex;
            });
        });
});
