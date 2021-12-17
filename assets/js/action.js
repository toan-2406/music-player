const playlistBtn = document.querySelector(".playlistBtn");
const playlist = document.querySelector(".playlist");
const closeBtn = document.querySelector(".closeBtn");


playlistBtn.addEventListener('click', (e) => {
    playlist.classList.add('active');

})
closeBtn.addEventListener('click', (e) => {
    playlist.classList.remove('active');

})