let audioPlayer = new Audio();
let playing = false;
audioPlayer.addEventListener('ended', () => playing = false);

const useAudio = (url) => {

    const play = () => {
        if (playing) return;
        playing = true;
        audioPlayer.src = url;
        audioPlayer.load();
        audioPlayer.play();
    };

    return [play];
};

export default useAudio;