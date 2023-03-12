const form = document.querySelector("form");
const inputText = document.querySelector("#text");
const todoParent = document.querySelector(".todo");
const countValue = document.querySelector(".count");

form.addEventListener("submit", submitFunc);
let countNum = 0;
let count = 0;
let warning = document.querySelector(".warning");
// the plural for items function

function pluralUpdate() {
  if (count === 0) {
    countValue.innerHTML = "";
  } else if (count === 1) {
    countValue.innerHTML = count + " item left";
  } else {
    countValue.innerHTML = count + " items left";
  }
}

function submitFunc(e) {
  e.preventDefault();

  if (inputText.value === "") {
    warning.innerHTML = "<p>Please add a to-do!</p>";

    setTimeout(myFunc, 2000);

    function myFunc() {
      warning.remove();
    }
  } else {
    let todoMain = document.createElement("div");
    todoMain.innerHTML = `
    <div class="todo-content">
      <div class="circle">
          <p>V</p>
      </div>
      <p class="ptags">${inputText.value}</p>
      <button class="close">X</button>
    </div>
    <hr />
  </div>`;

    count++;

    todoParent.appendChild(todoMain);
    inputText.value = "";
    pluralUpdate();

    // for the close

    const closeBtn = todoMain.querySelector(".close");

    closeBtn.addEventListener("click", closeFunc);

    function closeFunc() {
      todoMain.remove();
      count--;
      pluralUpdate();
    }

    // for the check toggle

    const check = todoMain.querySelector(".circle");
    check.addEventListener("click", checkFunc);

    function checkFunc() {
      check.classList.toggle("active-circle");
      todoMain.children[0].children[1].classList.add("line-through");
      count;

      if (!check.classList.contains("active-circle")) {
        todoMain.children[0].children[1].classList.remove("line-through");
      }
    }

    // for the clear button

    const clear = document.querySelector(".clear");
    clear.addEventListener("click", clearCompleted);
    function clearCompleted() {
      todoMain.innerHTML = "";
      count = 0;
      pluralUpdate();
    }

    // for the completed function
    const ptags = todoMain.querySelectorAll(".ptags");
    let arr = [];

    ptags.forEach((element) => {
      arr.push({
        name: element.innerText,
        class: element.classList.contains("active-circle"),
        // number:
      });
    });
    // console.log(countNum);

    // arr.filter((elem) {

    // })

    // declaring the ps for statuses

    const all = document.querySelector(".all");
    all.addEventListener("click", allFunc);

    const active = document.querySelector(".active");
    active.addEventListener("click", activeFunc);

    const completedButton = document.querySelector(".completed");
    completedButton.addEventListener("click", completeFunc);

    function completeFunc() {
      active.style.color = "#777";
      completedButton.style.color = "hsl(220, 98%, 61%)";
      all.style.color = "#777";
      let completeCheck =
        ptags[0].previousElementSibling.classList.contains("active-circle");

      if (completeCheck) {
        todoMain.style.display = "flex";
      } else {
        todoMain.style.display = "none";
      }
    }

    function allFunc() {
      active.style.color = "#777";
      completedButton.style.color = "#777";
      all.style.color = "hsl(220, 98%, 61%)";

      todoMain.style.display = "flex";
    }

    function activeFunc() {
      let completeCheck =
        ptags[0].previousElementSibling.classList.contains("active-circle");

      if (!completeCheck) {
        todoMain.style.display = "flex";
        active.style.color = "hsl(220, 98%, 61%)";
        completedButton.style.color = "#777";
        all.style.color = "#777";
      } else {
        todoMain.style.display = "none";
      }
    }
  }
}
