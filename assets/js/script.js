const playIconContainers = document.querySelectorAll('#play-icon');
const seekSliders = document.querySelector('.seek-slider');
const durationContainers = document.querySelectorAll('.duration');
const currentTimeContainers = document.querySelectorAll('.current-time');
const vinyleContainers = document.querySelectorAll('.button-vinyle');
const audioFiles = document.querySelectorAll('.audio');
let playStates = ['play', 'play', 'play'];



const togglePlayAnimation = (playIconContainer, playState) => {
    if (playState === 'play') {
        playIconContainer.classList.remove('play');
        playIconContainer.classList.add('pause');
    } else {
        playIconContainer.classList.remove('pause');
        playIconContainer.classList.add('play');
    }
};

const togglePlayState = (audio, playState) => {
    if (playState === 'play') {
        audio.play();
        return 'pause';
    } else {
        audio.pause();
        return 'play';
    }
};

const playAudio = (event) => {
    const vinyleIndex = Array.from(vinyleContainers).indexOf(event.currentTarget);
    const audio = audioFiles[vinyleIndex];

    if (playStates[vinyleIndex] === 'play') {
        playStates[vinyleIndex] = togglePlayState(audio, playStates[vinyleIndex]);
        togglePlayAnimation(playIconContainers[vinyleIndex], playStates[vinyleIndex]);
    } else {
        audio.pause();
        playStates[vinyleIndex] = 'play';
        togglePlayAnimation(playIconContainers[vinyleIndex], playStates[vinyleIndex]);
    }
};


vinyleContainers.forEach((vinyleContainer) => {
    vinyleContainer.addEventListener('click', playAudio);
});



audioFiles.forEach((audio, index) => {
    audio.addEventListener('loadedmetadata', () => {
        durationContainers[index].textContent = calculateTime(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
        currentTimeContainers[index].textContent = calculateTime(audio.currentTime);
    });
});

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
};
