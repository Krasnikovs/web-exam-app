window.addEventListener('DOMContentLoaded', (event) => {

    const sideBarButton = document.getElementById('sidenav-activate');
    const createCard = document.getElementById('create-card');
    const newProjectButton = document.getElementById('new-project');
    const existingProjectButton = document.getElementById('exist-project');
    const projectNameInput = document.getElementById('project-name-input');
    const projectNameError = document.getElementById('project-name-error');
    const componentList = document.getElementById('component-list');
    const addButton = document.getElementById('add');
    const componentListError = document.getElementById('component-list-error');
    const emptyBody = document.getElementById('empty-body');
    const cardHolder = document.getElementById('card-holder');
    const headerObject = document.getElementById('header-object');
    const headerButtonObject = document.getElementById('header-button-container');
    const headerList = document.getElementById('header-list');
    const sensorTable = document.getElementById('sensor-table');
    const componentTable = document.getElementById('component-table');
    const createCardMobile = document.getElementById('create-card-mobile');
    const cancleButton = document.getElementById('cancle');

    var sideBarPositionClosed = true;

    let nameLookup = {}

    e.forEach(component => {
        const listComponent = document.createElement('li');
        
        componentList.appendChild(listComponent);
        
        const componentDiv = document.createElement('div');
        const componentListLabel = document.createElement('label');
        const componentListRadio = document.createElement('input');
        const componentName = document.createElement('p');
        componentDiv.classList.add('component-list-item');

        componentListRadio.type = 'radio';
        componentListRadio.name = 'component-to-add';
        componentListRadio.id = `component-list-radio-${component.name}`;
        componentListLabel.htmlFor = `component-list-radio-${component.name}`;
        componentDiv.appendChild(componentListRadio);
        componentDiv.appendChild(componentListLabel);
        listComponent.appendChild(componentDiv);

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
            if (document.getElementById(`component-list-radio-${componentNames[i]}`).checked) {
                cardValue = componentNames[i];
                radioChecked = true;
                break;
            }
        }
        if (radioChecked) {
            console.log(cardValue);
            createCardFunc(cardValue);
        } else {
            componentListError.textContent = 'Error. No component chosen';
        }
    };

    function createCardFunc(cardValue) {
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

        for (let i = 0; i < e.length; i++) {
            if (e[i].name === cardValue) {
                sensor = e[i];
                break;
            }
        }
        if (sensor.type == 'flow') {
            const sensorCardData = document.createElement('p');
            sensorCardData.innerHTML = `flow rate: 0 ml`;
            sensorCardDataContainer.appendChild(sensorCardData);
        } else if (sensor.type == 'hall effect') {
            const sensorCardDataD = document.createElement('p');
            const sensorCardData = document.createElement('p');
            sensorCardDataD.innerHTML = `digital: 0`;
            sensorCardDataContainer.appendChild(sensorCardDataD);
            sensorCardData.innerHTML = `analog: 0`;
            sensorCardDataContainer.appendChild(sensorCardData);
        } else if (sensor.type == 'motion') {
            const sensorCardData = document.createElement('p');
            sensorCardData.innerHTML = `digital: 0`;
            sensorCardDataContainer.appendChild(sensorCardData);
        } else if (sensor.type == 'proximity') {
            const sensorCardData = document.createElement('p');
            sensorCardData.innerHTML = `analog: 0`;
            sensorCardDataContainer.appendChild(sensorCardData);
        } else if (sensor.type == 'force') {
            const sensorCardData = document.createElement('p');
            sensorCardData.innerHTML = `weight: 0 g`;
            sensorCardDataContainer.appendChild(sensorCardData);
        } else if (sensor.type == 'tempereture-humidity') {
            const sensorCardData = document.createElement('p');
            sensorCardData.innerHTML = `humidity: 0 %`;
            sensorCardDataContainer.appendChild(sensorCardData);
            const sensorCardDataT = document.createElement('p');
            sensorCardDataT.innerHTML = `tempreture: 0 c`;
            sensorCardDataContainer.appendChild(sensorCardDataT);
        } else if (sensor.type == 'sound') {
            const sensorCardData = document.createElement('p');
            sensorCardData.innerHTML = `decibles: 0 `;
            sensorCardDataContainer.appendChild(sensorCardData);
        } else if (sensor.type == 'gyroscope-accelerometer') {
            const sensorCardData = document.createElement('p');
            sensorCardData.innerHTML = `x: 0`;
            sensorCardDataContainer.appendChild(sensorCardData);
            const sensorCardDataY = document.createElement('p');
            sensorCardDataY.innerHTML = `y: 0`;
            sensorCardDataContainer.appendChild(sensorCardDataY);
            const sensorCardDataZ = document.createElement('p');
            sensorCardDataZ.innerHTML = `z: 0`;
            sensorCardDataContainer.appendChild(sensorCardDataZ);
        }


        const sensorCardName = document.createElement('h4');
        sensorCardName.innerHTML = `${cardValue}`;
        sensorCardNameContainer.appendChild(sensorCardName);
    
        if (projectNameSize && !projectNameInputClosed && (projectType == 'new' && !projectNameExists)) {
            projectName.push(projectNameInput.value);
            const sensorCardProjectName = document.createElement('p');
            sensorCardProjectName.innerHTML = `${projectNameInput.value}`;
            sensorCardNameContainer.appendChild(sensorCardProjectName);
        } else if (!projectNameInputClosed && (projectType == 'exist' && projectNameExists)) {
            const sensorCardProjectName = document.createElement('p');
            sensorCardProjectName.innerHTML = `${projectNameInput.value}`;
            sensorCardNameContainer.appendChild(sensorCardProjectName);
        } else {
            projectNameError.textContent = '';
            projectNameError.textContent = 'Name will be ignored';
        }
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

    createCard.addEventListener('click', () => {
        if (readingFormClosed) {
            document.getElementById('reading-form').style.display = 'block';
            readingFormClosed = false;
        } else {
            document.getElementById('reading-form').style.display = 'none';
            readingFormClosed = true;
        }
        
    });

    cancleButton.addEventListener('click', () => {
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

    let projectName = []
    let projectNameExists = false;
    let projectNameSize = false;

    projectNameInput.addEventListener('input', () => {
        projectNameError.textContent = '';
        projectNameExists = false;
        console.log(projectName);
        if (projectNameInput.value.length < 3) {
            projectNameError.textContent = 'Error. Name entered too short';
        } else {
            projectNameSize = true;
        }

        if (projectType === 'new') {
            for (let i = 0; i < projectName.length; i++) {
                if (projectName == projectNameInput.value) {
                    projectNameExists = true;
                    break;
                }
            }
            if (projectNameExists) {
                projectNameError.textContent = 'Error. Project already exists';
            }
        }
        if (projectType === 'exist') {
            for (let i = 0; i < projectName.length; i++) {
                if (projectName == projectNameInput.value) {
                    projectNameExists = true;
                    break;
                }
            }
            if (!projectNameExists) {
                projectNameError.textContent = 'Error. Project doesnt exist';
            }
        }

        
    });

    function openNav() {
        document.getElementById('side-bar').style.width = '100%';
    }
    
    function closeNav() {
        document.getElementById('side-bar').style.width = '0';
    }

    const isMobile = navigator.userAgentData.mobile;

    if (isMobile) {
        headerObject.style.display = 'none';
        headerButtonObject.style.display = 'block';
        headerList.style.width = '90%';
        sensorTable.style.justifyContent = 'center';
        componentTable.style.justifyContent = 'center';

        var readingFormClosed = true;

        createCardMobile.addEventListener('click', () => {
        if (readingFormClosed) {
            document.getElementById('reading-form').style.display = 'block';
            document.getElementById('reading-form').style.width = '100%';
            document.getElementById('reading-form').style.height = '100%';
            document.getElementById('reading-form').style.right = '0';
            document.getElementById('reading-form').style.overflow = 'hidden';
            document.getElementById('component-list').style.height = '550px';
            readingFormClosed = false;
        } else {
            document.getElementById('reading-form').style.display = 'none';
            readingFormClosed = true;
        }
        
    });

    }

});
