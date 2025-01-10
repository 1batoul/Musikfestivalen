// Hämta alla <li>-element
const listItems = document.querySelectorAll('li');

// Lägg till en eventlistener som ändrar färgen på varje <li> när du klickar
listItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.color = 'blue';
    });
});

