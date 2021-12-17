const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let currentIndex = 0;
let isPlaying = false;

fetch("https://spotifystefan-skliarovv1.p.rapidapi.com/getTracks", {
  method: "POST",
  headers: {
    "x-rapidapi-host": "Spotifystefan-skliarovV1.p.rapidapi.com",
    "x-rapidapi-key": "1ff2e62e90msh1c26c02b29765a9p126a67jsn23446e0c18b6",
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });

const songName = $(".info-song__detail h2");
const songArtist = $(".info-song__detail sub");
const songImg = $(".cd-img img");
const songSrc = $("#audio");

const songplaying = $(".playlist__song__detail h2");
const songartist = $(".playlist__song__detail sub");
const songimg = $(".playlist__song__img img");
const player = $(".player");

const playBtn = $(".play");
const nextBtn = $(".next");
const shuffleBtn = $(".shuffle");
const repeatBtn = $(".repeat");
const prevBtn = $(".previous");
const pauseBtn = $(".pause");

const durationTime = $(".duration");
const currentTimer = $(".time-remaining");

const rangeBar = $(".range");

const Playlist = $(".playlist__list");
console.log(songSrc.currentTime)

const song = [
  {
    title: "Bước qua nhau",
    artist: "Vũ",
    src: "./assets/mp3/buoc_qua_nhau.mp3",
    img: "./assets/img/buoc_qua_nhau.jpg",
  },
  {
    title: "abcdefu",
    artist: "GAYLE",
    src: "./assets/mp3/abcdefu.mp3",
    img: "./assets/img/abcdefu.jpg",
  },
  {
    title: "Easy on me",
    artist: "Adele",
    src: "./assets/mp3/easy_on_me.mp3",
    img: "./assets/img/easy_on_me.jpg",
  },
  {
    title: "Cổ tích có thật",
    artist: "TBO, Baby Gang, Free",
    src: "./assets/mp3/co_tich_co_that.mp3",
    img: "./assets/img/co_tich_co_thatt.jpg",
  },
];

function render() {
  const html = song.map((item, index) => {
    return `<div class="playlist__list--item " data-index="${index}">
                    <div class="playlist__list--item-stt">
                        ${index + 1}
                    </div>
                    <div class="playlist__list--item-detail">

                            <h2 class='ca-si'>${item.title}</h2>
                            <sub>${item.artist}</sub>
                        
                    </div>
                </div>`;
  });
  Playlist.innerHTML = html.join("");

  $(".playlist__song__detail h2").innerHTML = getCurrentSong().title;
  $(".playlist__song__detail sub").innerHTML = getCurrentSong().artist;
}

function getCurrentSong() {
  return song[currentIndex];
}

function loadCurrentSong() {
  songName.innerHTML = getCurrentSong().title;
  songArtist.innerHTML = getCurrentSong().artist;
  songImg.src = getCurrentSong().img;
  songSrc.src = getCurrentSong().src;

  songplaying.innerHTML = getCurrentSong().title;
  songartist.innerHTML = getCurrentSong().artist;
  songimg.src = getCurrentSong().img;
}

function changeSong(index) {
  currentIndex = index;
  loadCurrentSong();
}

function handleEvent(e) {
  playBtn.onclick = function () {
    isPlaying = true;
    songSrc.play();
    player.classList.add("active");
    console.log(isPlaying);
    rangeBar.addEventListener("input", handleInputChange);
  };
  pauseBtn.onclick = function () {
    isPlaying = false;
    songSrc.pause();
    player.classList.remove("active");
    console.log(isPlaying);
  };
  nextBtn.onclick = function () {
    currentIndex++;
    if (currentIndex > song.length - 1) {
      currentIndex = 0;
    }
    changeSong(currentIndex);
    player.classList.add("active");
    songSrc.play();
  };
  prevBtn.onclick = function () {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = song.length - 1;
    }
    changeSong(currentIndex);
    songSrc.play();
    player.classList.add("active");
  };
  shuffleBtn.onclick = function () {
    shuffleBtn.classList.toggle("active");
    currentIndex = Math.floor(Math.random() * song.length);
    changeSong(currentIndex);
    songSrc.play();
    player.classList.add("active");
  };
  repeatBtn.onclick = function () {
    repeatBtn.classList.toggle("around");
    currentIndex = 0;
    changeSong(currentIndex);
    player.classList.add("active");
  };

  songSrc.addEventListener("timeupdate", displayTime);

  Playlist.addEventListener("click", (e) => {
    if (e.target.classList.contains("playlist__list--item")) {
      currentIndex = e.target.dataset.index;
      // currentIndex = e.target.dataset.index;
      changeSong(currentIndex);
      songSrc.play();
      player.classList.add("active");
      handleInputChange();
      displayTime();
    }
    
  });
}

function convertDuration(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${minutes}:${seconds}`;
}

function displayTime() {
  const { duration, currentTime } = songSrc;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = convertDuration(duration);
  }
  currentTimer.textContent = convertDuration(currentTime);
}

function handleInputChange() {
  const { duration } = songSrc;
  songSrc.currentTime = rangeBar.value;
  const min = rangeBar.min;
  const max = duration;

  rangeBar.style.backgroundSize = ((songSrc.currentTime - min) * 100) / (max - min) + "% 100%";
  setInterval(() => {
    console.log(songSrc.currentTime);
  }, 1000);
   if(isPlaying) {
    setInterval(() => {
      rangeBar.style.backgroundSize =
        ((songSrc.currentTime - min) * 100) / (max - min) + "% 100%";
      console.log(rangeBar.style.backgroundSize);
      if (songSrc.ended) {
        nextBtn.click();
        songSrc.play();
      }
     console.log(songSrc.currentTime)
    }, 1000);
   } 
  
  }
  

function start() {
  // Render playlist
  render();

  getCurrentSong();

  //Chạy bài hát hiện tại
  loadCurrentSong();

  // Xử lý các sự kiện UI
  handleEvent();

  // Hiển thị time line
  displayTime();

}

start();
