window.addEventListener('DOMContentLoaded', (event) => {

    const sideBarButton = document.getElementById('sidenav-activate');

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

    function openNav() {
        document.getElementById("sideBar").style.width = "300px";
    }
    
    function closeNav() {
        document.getElementById("sideBar").style.width = "0";
    }

});
