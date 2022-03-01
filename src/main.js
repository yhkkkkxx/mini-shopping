
function loadItems() {
    return fetch("data/data.json")
    .then(response => response.json())
    .then(json => json.items);
}

function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>    
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null){
        return;
    }

    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
}

function setEventListener(items) {
    const logo = document.querySelector('.logo');
    const btns = document.querySelector('.btns');
    
    logo.addEventListener('click', () => displayItems(items));
    btns.addEventListener('click', event => onButtonClick(event, items));
}

loadItems()
.then(items => {
    displayItems(items);
    setEventListener(items);
});