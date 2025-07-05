const inputColor = document.getElementById("input-color");
const colorMode = document.getElementById("color-mode");
const getColorBtn = document.getElementById("get-color");
const outputContainer = document.getElementById("output-container");

let userMode = "monochrome";
let userColor = "#F55A5A";

document.addEventListener("input", (e) => {
    if (e.target === colorMode) {
        userMode = colorMode.value;
    } else if (e.target === inputColor) {
        userColor = inputColor.value;
    }
});

/*Copy to Clipboard*/

outputContainer.addEventListener("click", (e) => {
    console.log("Clicked");

    if (e.target.id.startsWith("color-")) {
        const index = e.target.id.split("-")[1];

        //console.log(document.getElementById(`color-${index}`).nextElementSibling.textContent);

        const copyHex = document.getElementById(`color-${index}`).nextElementSibling.textContent;

        navigator.clipboard.writeText(copyHex);
        alert("Copied");
    }
});

/*Fetch Data from Color API*/

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
