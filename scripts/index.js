let bagItems;
onLoad();

function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemsOnHomePage();
    displayBagIcon();
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();

    // Show popup message
    showPopupMessage("Item added to cart");
}

function displayBagIcon() {
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if (bagItems.length > 0) {
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    } else {
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage() {
    let itemsContainerElement = document.querySelector('.items-container');
    if (!itemsContainerElement) return;

    let innerHtml = '';
    items.forEach(item => {
        innerHtml += `
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="item image">
            <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`;
    });
    itemsContainerElement.innerHTML = innerHtml;
}

// Logout functionality
document.getElementById('logout-button').addEventListener('click', function () {
  // Clear user session or authentication tokens (if any)
  localStorage.removeItem('userSession'); // Adjust key name if needed

  // Redirect to login page
  window.location.href = 'login.html';
});

function showPopupMessage(message) {
    const popup = document.getElementById('popup-message');
    popup.textContent = message;
    popup.classList.add('show');

    // Hide popup after 2 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}
