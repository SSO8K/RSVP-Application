const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

function createLI(text) {
    //creates the new li and sets it's text.
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);
    //creates the label and sets text.
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    //creates checkbox 
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    //appends the elements to the ul "invitedList"
    label.appendChild(checkbox);
    li.appendChild(label);
    
    //creates edit button element and sets text.
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    //appends the button to the li.
    li.appendChild(editButton);

    //creates remove button element and sets text.
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    //appends the button to the li.
    li.appendChild(removeButton);
    return li;
}


//Listens for the "Invite Someone" input field to be submitted.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //sets the text to match the input field.
    const text = input.value;
    //resets the input value to blank after submit.
    input.value = '';
    //calls the createLI func.
    const li = createLI(text);
    //appends the returned value to the dom.
    ul.appendChild(li);
} )


//Listens for when the checkboxes state has changed.
ul.addEventListener('change', (e) => {
    //checks to see the value of checkbox, returns true or false.
    const checkbox = event.target;
    //stores the value of the checkbox as checked.
    const checked = checkbox.checked;
    //listItem is checkboxes grandparent. Once to the label, again to listItem.
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
        listItem.className = 'responded';
    } else {
        listItem.className = '';
    }
});

//Event listener for the remove and edit buttons.
ul.addEventListener('click', (e) => {
    //runs if the target element is a button.
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        //travels up the dom tree to the grandparent node.
        const li = button.parentNode;
        const ul = li.parentNode;
        //examines the text content of the button.
        if (button.textContent === 'remove') {
            //removes the element from the parent ul.
            ul.removeChild(li);
        //puts the program into an edit state upon click.
        } else if (button.textContent === 'edit') {
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'save';
         //handles the save button events.   
        } else if (button.textContent === 'save') {
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textContent = 'edit';
        } 
    }
});