const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const filter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");


const addItem = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === "") {
        alert("Please add an item");
        return;
    }

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newItem));
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);
    checkUI();
    itemInput.value = "";
    
    
};

const createButton = (classes) => {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
};

const createIcon = (classes) => {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
};

const removeItem = (e) => {
    if (e.target.parentElement.classList.contains("remove-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
        }
    };
    checkUI();
};

const removeItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
};

const filterItems = (e) => {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll("li");
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
};

const checkUI = () => {
    const items = document.querySelectorAll("li");
    if(items.length === 0) {
        clearBtn.style.display = "none";
        filter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        filter.style.display = "block";
    }
};

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", removeItems);
filter.addEventListener("input", filterItems);

checkUI();