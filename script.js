window.addEventListener('DOMContentLoaded', (event) => {

    const sideBarButton = document.getElementById('sidenav-activate');
    const readingButton = document.getElementById('create-card');
    const newProjectButton = document.getElementById('new-project');
    const existingProjectButton = document.getElementById('exist-project');
    const projectNameInput = document.getElementById('project-name-input');
    const projectNameError = document.getElementById('project-name-error');
    const filterButton = document.getElementById('filter');
    const componentList = document.getElementById('component-list');
    const addButton = document.getElementById('add');
    const componentListError = document.getElementById('component-list-error');
    const emptyBody = document.getElementById('empty-body');
    const cardHolder = document.getElementById('card-holder');


    var sideBarPositionClosed = true;

    let nameLookup = {}

    e.forEach(component => {
        const listComponent = document.createElement('li');
        
        componentList.appendChild(listComponent);
        
        const componentDiv = document.createElement('div');
        const componentListLabel = document.createElement('label');
        const componentListRadio = document.createElement('input');
        // const componentImg = document.createElement('img');
        const componentName = document.createElement('p');
        componentDiv.classList.add('component-list-item');

        componentListRadio.type = 'radio';
        componentListRadio.name = 'component-to-add';
        componentListRadio.id = `component-list-radio-${component.name}`;
        componentListLabel.htmlFor = `component-list-radio-${component.name}`;
        componentDiv.appendChild(componentListRadio);
        componentDiv.appendChild(componentListLabel);
        listComponent.appendChild(componentDiv);

        // componentImg.src = component.img;
        // componentListLabel.appendChild(componentImg);

        componentName.innerHTML = component.name;
        componentListLabel.appendChild(componentName);



        if (!(component.name in nameLookup)) {
            nameLookup[component.name] = 1;
        }
    })

    const componentNames = Object.keys(nameLookup).sort();

    let radioChecked = false;

    addButton.addEventListener('click', () => {
        componentListError.textContent = '';
        cardAdd();
    });

    function cardAdd() {
        for (let i = 0; i < componentNames.length; i++) {
            // console.log(componentNames[i])
            if (document.getElementById(`component-list-radio-${componentNames[i]}`).checked) {
                cardValue = componentNames[i];
                radioChecked = true;
                break;
            }
        }
        if (radioChecked) {
            console.log(cardValue);
            createCard(cardValue);
        } else {
            componentListError.textContent = 'Error. No component chosen';
        }
    }

    function createCard(cardValue) {
        emptyBody.style.display = 'none';

        const sensorCard = document.createElement('div');
        sensorCard.classList.add('sensor-card');
        cardHolder.appendChild(sensorCard);
        
        const sensorCardDataContainer = document.createElement('div');
        sensorCardDataContainer.classList.add('sensor-card-data-container');

        const sensorCardNameContainer = document.createElement('div');
        sensorCardNameContainer.classList.add('sensor-card-name-container');

        sensorCard.appendChild(sensorCardDataContainer);
        sensorCard.appendChild(sensorCardNameContainer);

        const sensorCardData = document.createElement('p');
        for (let i = 0; i < e.length; i++) {
            if (e[i].name === cardValue) {
                sensor = e[i];
            }
        }
        
        const sensorCardName = document.createElement('h4');
        sensorCardName.innerHTML = `${cardValue}`;
        sensorCardNameContainer.appendChild(sensorCardName);
    }
    

    sideBarButton.addEventListener('click', () => {

        if (sideBarPositionClosed) {
            openNav();
            sideBarPositionClosed = false;
        } else {
            closeNav();
            sideBarPositionClosed = true;
        }
    });

    var readingFormClosed = true;

    readingButton.addEventListener('click', () => {
        if (readingFormClosed) {
            document.getElementById('reading-form').style.display = 'block';
            readingFormClosed = false;
        } else {
            document.getElementById('reading-form').style.display = 'none';
            readingFormClosed = true;
        }
        
    });

    var projectNameInputClosed = true;
    var projectType = null;

    newProjectButton.addEventListener('click', () => {
        if (projectType === null) {
            projectType = 'new';
            document.getElementById('project-name').style.display = 'block';
            projectNameInputClosed = false;
        } else if (projectType === 'new' && projectNameInputClosed === false) {
            document.getElementById('project-name').style.display = 'none';
            projectType = null;
            projectNameInputClosed = true;
        } else if (projectType === 'exist') {
            projectType = 'new';
        }
    });

    existingProjectButton.addEventListener('click', () => {
        if (projectType === null) {
            projectType = 'exist';
            document.getElementById('project-name').style.display = 'block';
            projectNameInputClosed = false;
        } else if (projectType === 'exist' && projectNameInputClosed === false) {
            document.getElementById('project-name').style.display = 'none';
            projectType = null;
            projectNameInputClosed = true;
        } else if (projectType === 'new') {
            projectType = 'exist';
        }
    });

    projectName = []

    projectNameInput.addEventListener('input', () => {
        projectNameError.textContent = '';
        if (projectNameInput.value.length < 3) {
            projectNameError.textContent = 'Error. Name entered too short';
        }

        if (projectType === 'new') {
            for (let i = 0; i < projectName.length; i++) {
                if (projectName == projectNameInput.value) {
                    projectNameError.textContent = 'Error. Project already exists';
                }
            }
        } 
        if (projectType === 'exist') {
            for (let i = 0; i < projectName.length; i++) {
                if (projectName != projectNameInput.value) {
                    projectNameError.textContent = 'Error. Project doesnt exist';
                }
            }
        }
    });


    function openNav() {
        document.getElementById("sideBar").style.width = "300px";
    }
    
    function closeNav() {
        document.getElementById("sideBar").style.width = "0";
    }

});
