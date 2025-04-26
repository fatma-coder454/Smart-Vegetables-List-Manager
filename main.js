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

const updateTotalQuantity = () => {
    const totalQuantity = vegetables.reduce((total, vegetable) => total + vegetable.quantity, 0);
    totalQuantityElement.textContent = totalQuantity;
};

function renderList(filtered = null) {
    vegetableList.innerHTML = '';
    const list = filtered || vegetables;

    if (list.length === 0) {
        vegetableList.innerHTML = '<li>No vegetables to display.</li>';
        totalQuantityElement.textContent = 0;
        return;
    }

    list.forEach((vegetable, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span><strong>Name:</strong> ${vegetable.name}</span>
            <span><strong>Quantity:</strong> ${vegetable.quantity}</span>
            <i class="fas fa-times-circle" onclick="removeItem(${index})"></i>
        `;
        vegetableList.appendChild(listItem);
    });

    const total = list.reduce((sum, item) => sum + item.quantity, 0);
    totalQuantityElement.textContent = total;
}

const removeItem = function(index) {
    vegetables.splice(index, 1);
    renderList();
};

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

sortItemsButton.addEventListener('click', () => {
    vegetables.sort((a, b) => a.quantity - b.quantity);
    renderList();
});

const showFilterWindow = function() {
    filterWindow.style.display = 'block';
};
filterItemsButton.addEventListener('click', showFilterWindow);

closeFilterWindow.addEventListener('click', () => {
    filterWindow.style.display = 'none';
});

applyFilterButton.addEventListener('click', () => {
    const filterText = filterInput.value.trim().toLowerCase();
    const filteredVegetables = vegetables.filter((vegetable) =>
        vegetable.name.toLowerCase().includes(filterText)
    );
    renderList(filteredVegetables);
    filterWindow.style.display = 'none';
});
