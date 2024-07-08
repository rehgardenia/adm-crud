// Aqui eu coloquei em JS porque não sei qual linguagem vamos usar 
// Só uma demonstração de como ficaria o layout do menu
document.addEventListener('DOMContentLoaded', function () {
    const toggleMenu = document.getElementById('toggle-menu');
    const barraLateral = document.querySelector('aside');

    toggleMenu.addEventListener('click', function () {
        barraLateral.classList.toggle('expande');
    });
});
