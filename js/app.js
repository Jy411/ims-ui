const apiUrl = "https://go-gin-hello-world-j65gpoz5r-j-projects3-3.vercel.app";

async function addItem() {
  const url = `${apiUrl}/items`;
  const nameField = document.getElementById("item-name");
  const descriptionField = document.getElementById("item-description");
  const priceField = document.getElementById("item-price");
  const quantityField = document.getElementById("item-quantity");
  const item = {
    name: nameField.value,
    description: descriptionField.value,
    price: parseFloat(priceField.value),
    quantity: parseInt(quantityField.value),
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    nameField.value = "";
    descriptionField.value = "";
    priceField.value = "";
    quantityField.value = "";
    renderTable();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

const button = document.getElementById("add-item");
button.addEventListener("click", addItem);

async function deleteItem(id) {
  const url = `http://localhost:9000/items/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    renderTable();
  } catch (error) {
    console.error(error.message);
  }
}

function cancelEdit(id, name, description, price, quantity) {
  // replace with original cell and values
  const nameCell = document.getElementById(`item-name-${id}`);
  const descriptionCell = document.getElementById(`item-description-${id}`);
  const priceCell = document.getElementById(`item-price-${id}`);
  const quantityCell = document.getElementById(`item-quantity-${id}`);

  nameCell.textContent = name;
  descriptionCell.textContent = description;
  priceCell.textContent = price;
  quantityCell.textContent = quantity;

  // replace save/cancel buttons with edit/delete buttons
  const saveButton = document.getElementById(`save-item-${id}`);
  const cancelButton = document.getElementById(`cancel-item-${id}`);

  const { editButton, deleteButton } = createEditAndDeleteButtons(id);

  saveButton.replaceWith(editButton);
  cancelButton.replaceWith(deleteButton);
}

async function saveItem(id) {
  // get updated values from input fields
  const nameInput = document.getElementById(`name-input-${id}`);
  const descriptionInput = document.getElementById(`description-input-${id}`);
  const priceInput = document.getElementById(`price-input-${id}`);
  const quantityInput = document.getElementById(`quantity-input-${id}`);

  const url = `${apiUrl}/items/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.valueAsNumber,
        quantity: quantityInput.valueAsNumber,
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    renderTable();
  } catch (error) {
    console.error(error.message);
  }
}

function editItem(id) {
  // replace cells with fields
  const nameCell = document.getElementById(`item-name-${id}`);
  const descriptionCell = document.getElementById(`item-description-${id}`);
  const priceCell = document.getElementById(`item-price-${id}`);
  const quantityCell = document.getElementById(`item-quantity-${id}`);

  const nameInput = document.createElement("input");
  nameInput.id = `name-input-${id}`;
  nameInput.value = nameCell.textContent;
  nameInput.type = "text";
  nameInput.className = "form-control";
  nameCell.replaceChild(nameInput, nameCell.firstChild);
  let previousNameValue = nameInput.value;

  const descriptionInput = document.createElement("input");
  descriptionInput.id = `description-input-${id}`;
  descriptionInput.value = descriptionCell.textContent;
  descriptionInput.type = "text";
  descriptionInput.className = "form-control";
  descriptionCell.replaceChild(descriptionInput, descriptionCell.firstChild);
  let previousDescriptionValue = descriptionInput.value;

  const priceInput = document.createElement("input");
  priceInput.id = `price-input-${id}`;
  priceInput.value = priceCell.textContent;
  priceInput.type = "number";
  priceInput.className = "form-control";
  priceCell.replaceChild(priceInput, priceCell.firstChild);
  let previousPriceValue = priceInput.value;

  const quantityInput = document.createElement("input");
  quantityInput.id = `quantity-input-${id}`;
  quantityInput.value = quantityCell.textContent;
  quantityInput.type = "number";
  quantityInput.className = "form-control";
  quantityCell.replaceChild(quantityInput, quantityCell.firstChild);
  let previousQuantityValue = quantityInput.value;

  // replace edit/delete buttons with save/cancel buttons
  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  saveButton.id = `save-item-${id}`;
  cancelButton.id = `cancel-item-${id}`;
  saveButton.textContent = "Save";
  cancelButton.textContent = "Cancel";
  saveButton.className = "btn btn-success";
  cancelButton.className = "btn btn-secondary";

  const editButton = document.getElementById(`edit-item-${id}`);
  const deleteButton = document.getElementById(`delete-item-${id}`);
  editButton.replaceWith(saveButton);
  deleteButton.replaceWith(cancelButton);

  // add event listeners to save/cancel buttons
  saveButton.addEventListener("click", () => saveItem(id));
  cancelButton.addEventListener("click", () =>
    cancelEdit(
      id,
      previousNameValue,
      previousDescriptionValue,
      previousPriceValue,
      previousQuantityValue,
    ),
  );
}

async function getData() {
  const url = `${apiUrl}/items`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

function createEditAndDeleteButtons(id) {
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  editButton.id = `edit-item-${id}`;
  deleteButton.id = `delete-item-${id}`;
  editButton.textContent = "Edit";
  deleteButton.textContent = "Delete";
  editButton.className = "btn btn-primary";
  deleteButton.className = "btn btn-danger";

  // add event listeners
  editButton.addEventListener("click", () => editItem(id));
  deleteButton.addEventListener("click", () => deleteItem(id));

  return { editButton, deleteButton };
}

async function renderTable() {
  const inventoryData = await getData();
  const tableBody = document.getElementById("table-body");

  tableBody.innerHTML = "";
  inventoryData.forEach((item) => {
    const row = document.createElement(`tr`);
    row.id = "item-row-" + item.id;
    const idCell = document.createElement("td");
    const nameCell = document.createElement("td");
    nameCell.id = "item-name-" + item.id;
    const descriptionCell = document.createElement("td");
    descriptionCell.id = "item-description-" + item.id;
    const priceCell = document.createElement("td");
    priceCell.id = "item-price-" + item.id;
    const quantityCell = document.createElement("td");
    quantityCell.id = "item-quantity-" + item.id;
    const controlCell = document.createElement("td");
    controlCell.id = "control-cell-" + item.id;
    controlCell.classList.add("d-flex", "gap-1");

    const { editButton, deleteButton } = createEditAndDeleteButtons(item.id);

    idCell.textContent = item.id;
    nameCell.textContent = item.name;
    descriptionCell.textContent = item.description;
    priceCell.textContent = item.price;
    quantityCell.textContent = item.quantity;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    controlCell.appendChild(editButton);
    controlCell.appendChild(deleteButton);
    row.appendChild(controlCell);

    tableBody.appendChild(row);
  });
}

renderTable();
