//create a function to make a virtual keyboard in the div .keyboard
function createKeyboard() {
    let keyboard = document.querySelector(".keyboard");
    keyboard.innerHTML = "";
    let keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "Enter"];
    let keysLength = keys.length;
    for (let i = 0; i < keysLength; i++) {
        let key = document.createElement("button");
        key.classList.add("key");
        key.setAttribute("id", keys[i]);
        key.innerHTML = keys[i];
        if (keys[i] == "Enter") {
            key.onmousedown = function () {
                jogo.resetGame()
                this.classList.add("pressed");
                setTimeout(() => {
                    this.classList.remove("pressed");
                }, 300);


            }
        } else {
            key.onmousedown = function () {
                jogo.tentaPalavra(this.id)
                this.classList.add("pressed");
                setTimeout(() => {
                    this.classList.remove("pressed");
                }, 300);

            }
        }


        ;
        keyboard.appendChild(key);
    }
}