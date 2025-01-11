window.addEventListener('DOMContentLoaded', (event) => {

    const sideBarButton = document.getElementById('sidenav-activate');
    const readingButton = document.getElementById('create-card');
    const newProjectButton = document.getElementById('new-project');
    const existingProjectButton = document.getElementById('exist-project');
    const projectNameInput = document.getElementById('project-name-input');
    const projectNameError = document.getElementById('project-name-error');

    var sideBarPositionClosed = true;

    sideBarButton.addEventListener('click', () =>{

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
