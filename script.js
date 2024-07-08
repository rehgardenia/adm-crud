// Aqui eu coloquei em JS porque não sei qual linguagem vamos usar 
// Só uma demonstração de como ficaria o layout do menu
document.addEventListener('DOMContentLoaded', () => {
    const aside = document.querySelector('aside');
    const toggleMenu = document.getElementById('toggle-menu');

    toggleMenu.addEventListener('click', () => {
        aside.classList.toggle('expande');
    });
});
