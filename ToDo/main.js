//Element references
const item = document.getElementById("item");
const dark = document.getElementById("dark");
const btnAdd = document.getElementById("btnAdd");
const itemList = document.getElementById("itemList");
const error = document.getElementById("error");
const totComNo = document.getElementById("totComNo");
const toDoNo = document.getElementById("toDoNo");
const totComLi = document.getElementById("totComLi");
const clrComLiBtn = document.getElementById("clrComLiBtn");

//Arrays
const toDoArr = [];
const doneArr = [];

//-------------------------------Dark Mode-------------------------------------------------------
//Check saved theme on page load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
} else if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("dark-mode");
}


//toggle dark mode function - no more need for class in body tag
//now saved across web forms
//adds dark mode class to body
function toggleDark() {
    document.body.classList.toggle("dark-mode");
    //save current theme state
    //var isDark which includes true/false state depending if dark-mode is in body tag
    const isDark = document.body.classList.contains("dark-mode");
    //is dark mode active?
    //Yes
    if (isDark) {localStorage.setItem("theme", "dark");} 
    //No
    else {localStorage.setItem("theme", "light");}
}
//--------------------------------------------------------------------------------------

//Event listeners
//Added ? so it only adds listener if element exists on current page
btnAdd?.addEventListener("click", addItem);
dark?.addEventListener("click", toggleDark);
clrComLiBtn?.addEventListener("click", ClrComLi);

//Enter key for add item
item?.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addItem();
    }
});

//Main render function for both lists 
//FIX - No need to run both
function renderList() {
    //Check if list element exists on page before trying to render
    if (!itemList || !totComLi) return;

    //Render To-Do Items
    itemList.innerHTML = "";
    for (let i = 0; i < toDoArr.length; i++) {
        const newListItem = document.createElement("li");
        newListItem.textContent = toDoArr[i] + " ";

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener("click", function() { deleteItem(i); });

        const btnDone = document.createElement("button");
        btnDone.textContent = "Done";
        btnDone.addEventListener("click", function() { doneItem(i); });

        newListItem.appendChild(btnDelete);
        newListItem.appendChild(btnDone);
        itemList.appendChild(newListItem);
    }
    //Render completed list
    totComLi.innerHTML = "";
    for (let i = 0; i < doneArr.length; i++) {
        const completedItem = document.createElement("li");
        completedItem.textContent = doneArr[i];
        totComLi.appendChild(completedItem);
    }
    //Update counters
    updateCounts();
}

//Add item function to To Do list
function addItem() {
    const itemText = item.value.trim();
    if (itemText !== "") {
        error.style.display = "none";
        toDoArr.push(itemText);
        item.value = "";
        renderList();
    } else {
        error.style.display = "block";
    }
}

//Delete item from To DO list
function deleteItem(i) {
    toDoArr.splice(i, 1);
    renderList();
}

//Set item to done, moving it to different array
function doneItem(i) {
    //Move item from active array to completed array
    const completedTask = toDoArr.splice(i, 1)[0];
    doneArr.push(completedTask);
    renderList();
}

//update counters for completed and total tasks
function updateCounts() {
    if (!toDoNo || !totComNo) return;
    toDoNo.textContent = `To Do: ${toDoArr.length}`;
    totComNo.textContent = `Completed: ${doneArr.length}`;
}

//clear completed list
function ClrComLi(){
    doneArr.length =0;
    renderList();
}
