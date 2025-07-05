const inputColor = document.getElementById("input-color");
const colorMode = document.getElementById("color-mode");
const getColorBtn = document.getElementById("get-color");

let userMode = "monochrome";
let userColor = "#F55A5A";

document.addEventListener("input", (e) => {
    if (e.target === colorMode) {
        userMode = colorMode.value;
    } else if (e.target === inputColor) {
        userColor = inputColor.value;
    }
});

getColorBtn.addEventListener("click", () => {
    fetch(`https://www.thecolorapi.com/scheme?hex=${userColor.slice(1)}&mode=${userMode}&count=4`)
        .then((res) => res.json())
        .then((data) => {
        
        /*Collect the colors*/
            const userScheme = [userColor];
        
                for (let i = 0; i < data.colors.length; i++) {
                    userScheme.push(data.colors[i].hex.value);
                }
        
        /*Update the DOM with DOM API*/
            const outputContainer = document.getElementById("output-container");

            outputContainer.innerHTML = "";

            userScheme.forEach((hex, i) => {
                const innerDiv = document.createElement("div");

                const outputColorDiv = document.createElement("div");
                outputColorDiv.id = `color-${i}`;
                outputColorDiv.className = "output-color";
                outputColorDiv.style.backgroundColor = hex;

                const hexNumber = document.createElement("p");

                hexNumber.textContent = hex;

                innerDiv.append(outputColorDiv, hexNumber);

                outputContainer.append(innerDiv);
            });
        });
});
