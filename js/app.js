/*Makes it so that the code waits until the DOM is fully loaded before running.
defends against script tag placement.*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrar');
    const input = form.querySelector('input');
    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('invitedList');


    //Creating a new div element to hold label and checkbox.
    const div = document.createElement('div');
    //creating a new label.
    const filterLabel = document.createElement('label');
    //creating the checkbox for the label.
    const filterCheckbox = document.createElement('input');
    //setting the display text for the label.
    filterLabel.textContent = "Hide those who haven't responded";
    //setting the input type to  checkbox.
    filterCheckbox.type = 'checkbox';
    //appedning label and checkbox to the div.
    div.appendChild(filterLabel);
    div.appendChild(filterCheckbox);
    //inserting the new div and ul elements before the mainDiv.
    mainDiv.insertBefore(div, ul);
    filterCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const lis = ul.children;
        //This branch fires is the hide checkbox is checked.
        if (isChecked) {
            //loops over all the list items (guests).
            for (let i = 0; i < lis.length; i++) {
                let li = lis[i];
                if (li.className === 'responded') {
                    //the empty string allows it to keep previous styles.
                    li. style.display = '';
                    //hides the list item (guest) if not responded.
                } else {
                    li.style.display = 'none';
                }
            }
        //This branch fires if the hide checkbox is not checked.    
        } else {
            //loops over all the list items (guests).
            for (let i = 0; i < lis.length; i++) {
                let li = lis[i];
                //the empty string allows it to keep previous styles.
                li.style.display = '';
            }
        }
    })


    function createLI(text) {
        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLI(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        }

        //creates a new li element.
        const li = document.createElement('li');
        //calls to the appendToLI func to create/append the span, label & checkbox.
        appendToLI('span', 'textContent', text);
        appendToLI('label', 'textContent', 'Confirmed')
            .appendChild(createElement('input', 'type', 'checkbox'));
       //calls to the appendToLI func to create/append the edit button.
        appendToLI('button', 'textContent', 'edit');
        //calls to the appendToLI func to create/append the remove button.
        appendToLI('button', 'textContent', 'remove');
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


    //Event listener for the remove, edit & save buttons.
    ul.addEventListener('click', (e) => {
        //runs if the target element is a button.
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            //travels up the dom tree to the grandparent node.
            const li = button.parentNode;
            const ul = li.parentNode;
            const action = button.textContent;
            const nameActions = {
                //removes the element from the parent ul.
                remove: () => {
                    ul.removeChild(li);
                },
                //puts the program into an edit state upon click.
                edit: () => {
                    const span = li.firstElementChild;
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = span.textContent;
                    li.insertBefore(input, span);
                    li.removeChild(span);
                    button.textContent = 'save';
                },
                //handles the save button events.
                save: () => {
                    const input = li.firstElementChild;
                    const span = document.createElement('span');
                    span.textContent = input.value;
                    li.insertBefore(span, input);
                    li.removeChild(input);
                    button.textContent = 'edit';
                }  
            };
            //select and run action in button's name.
            nameActions[action]();
        }
    });
});