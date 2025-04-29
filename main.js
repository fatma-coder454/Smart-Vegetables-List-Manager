let vegetables = [];

const addItemButton = document.getElementById('add-item');
const vegetableList = document.getElementById('vegetables-list');
const totalQuantityElement = document.getElementById('quantity-value');
const sortItemsButton = document.getElementById('sort-items');
const filterItemsButton = document.getElementById('filter-items');
const filterWindow = document.getElementById('filter-window');
const closeFilterWindow = document.querySelector('.close');
const applyFilterButton = document.getElementById('apply-filter');
const filterInput = document.getElementById('filter-input');

function updateTotalQuantity() {
    const totalQuantity = vegetables.reduce((total, vegetable) => total + vegetable.quantity, 0);
    totalQuantityElement.textContent = totalQuantity;
}

function renderList() {
    vegetableList.innerHTML = '';
    vegetables.forEach((vegetable, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <table >
                <tr>
                    <td > <span>  Name: </span> ${vegetable.name} </td>
                    <td ><span>  Quantity: </span>   ${vegetable.quantity}</td>
                    <td : center;">
                        <i class="fas fa-times-circle" onclick="removeItem(${index})" style="color: red; cursor: pointer;"></i>
                    </td>
                </tr>
            </table>
        `;
        vegetableList.appendChild(listItem);
    });
    updateTotalQuantity();
}


addItemButton.addEventListener('click', () => {
    const nameInput = document.getElementById('item-name');
    const quantityInput = document.getElementById('item-quantity');

    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);

    if (name && quantity > 0) {
        vegetables.push({ name, quantity });
        nameInput.value = '';
        quantityInput.value = '';
        renderList();
    }
});

function removeItem(index) {
    vegetables.splice(index, 1);
    renderList();
}

sortItemsButton.addEventListener('click', () => {
    vegetables.sort((a, b) => a.quantity - b.quantity);
    renderList();
});

filterItemsButton.addEventListener('click', () => {
    filterWindow.style.display = 'block';
});

closeFilterWindow.addEventListener('click', () => {
    filterWindow.style.display = 'none';
});

applyFilterButton.addEventListener('click', () => {
    const filterText = filterInput.value.trim().toLowerCase();
    const filteredVegetables = vegetables.filter((vegetable) =>
        vegetable.name.toLowerCase().includes(filterText)
    );

    vegetableList.innerHTML = '';
    filteredVegetables.forEach((vegetable, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${vegetable.name} - ${vegetable.quantity}
                <i class="fas fa-times-circle"    onclick="removeItem(${index})"></i>
        `;
        vegetableList.appendChild(listItem);
    });

    updateTotalQuantity();
    filterWindow.style.display = 'none';
});
