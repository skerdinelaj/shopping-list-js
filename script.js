const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const filter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");
const formBtn = itemForm.querySelector(".btn");
let isEditMode = false;

const displayItems = () => {
    const items = getItemsFromStorage();
    items.forEach((item) => addItemToDOM(item));
    checkUI();
};

const onAddItemSubmit = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === "") {
        alert("Please add an item");
        return;
    }

    if (isEditMode) {
        const itemToEdit = itemList.querySelector(".edit-mode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false; 
        }else if (checkIfItemExists(newItem)) {
        alert("That item already exists");
        return;
    }

    addItemToDOM(newItem);
    addItemToLocalStorage(newItem);
    checkUI();
    itemInput.value = ""; 
};

const addItemToDOM = (item) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);
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

const addItemToLocalStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();
    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    itemsFromStorage.push(item);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
    let itemsFromStorage;
    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
   return itemsFromStorage;
}

const onClickItem = (e) => {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        console.log(e.target);
        setItemToEdit(e.target)
        console.log(isEditMode);
    };
};

const checkIfItemExists = (item) => {
    const itemsFromStorage = getItemsFromStorage();
    if (itemsFromStorage.indexOf(item) !== -1) {
        return true;
    } else {
        return false;
    }
}

const setItemToEdit = (item) => {
    isEditMode = true;
    itemList.querySelectorAll("li").forEach((i) => i.classList.remove("edit-mode"));
    item.classList.add("edit-mode");
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent
}

const removeItem = (item) => {
    if (confirm("Are you sure?")) {
        item.remove()
        removeItemFromStorage(item.textContent);
        checkUI();
    }
};

const removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((storageItem) => storageItem !== item);

    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

const removeItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem("items");
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
    itemInput.value = "";
    const items = document.querySelectorAll("li");
    if(items.length === 0) {
        clearBtn.style.display = "none";
        filter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        filter.style.display = "block";
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = "#333";

    isEditMode = false;
};

const init = () => {
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", removeItems);
    filter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);
    checkUI();
}

init();