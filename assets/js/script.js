const playIconContainers = document.querySelectorAll('#play-icon');
const durationContainers = document.querySelectorAll('.duration');
const currentTimeContainers = document.querySelectorAll('.current-time');
const vinyleContainers = document.querySelectorAll('.button-vinyle');
const audioFiles = document.querySelectorAll('.audio');


let playStates = ['play', 'play', 'play'];


const togglePlayAnimation = (playIconContainer, playState) => {
    if (playState === 'play') {
        playIconContainer.classList.remove('pause');
        playIconContainer.classList.add('play');
    } else {
        playIconContainer.classList.remove('play');
        playIconContainer.classList.add('pause');
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
    let targetIndex;
    if (event.currentTarget.classList.contains('button-vinyle')) {
        targetIndex = Array.from(vinyleContainers).indexOf(event.currentTarget);
    } else if (event.currentTarget.id === 'play-icon') {
        targetIndex = Array.from(playIconContainers).indexOf(event.currentTarget);
    } else {
        return; 
    }

    for (let i = 0; i < audioFiles.length; i++) {
        if (i !== targetIndex && !audioFiles[i].paused) {
            audioFiles[i].pause();
            playStates[i] = 'play';
            togglePlayAnimation(playIconContainers[i], playStates[i]);
        }
    }
    
    const audio = audioFiles[targetIndex];

    if (playStates[targetIndex] === 'play') {
        playStates[targetIndex] = togglePlayState(audio, playStates[targetIndex]);
        togglePlayAnimation(playIconContainers[targetIndex], playStates[targetIndex]);
    } else {
        audio.pause();
        playStates[targetIndex] = 'play';
        togglePlayAnimation(playIconContainers[targetIndex], playStates[targetIndex]);
    }
};



vinyleContainers.forEach((vinyleContainer) => {
    vinyleContainer.addEventListener('click', playAudio);
});


playIconContainers.forEach((buttonControl) => {
    buttonControl.classList.add('play')
    buttonControl.addEventListener('click' , playAudio)
})

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
