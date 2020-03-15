window.addEventListener('load', (event) => {
    let startButton = document.getElementsByClassName('start-button')[0];
    let stopButton = document.getElementsByClassName('stop-button')[0];
    let BPM = document.getElementsByClassName('BPM')[0]
    let label = document.getElementsByTagName('label')[0];
    let tick = new Audio('./metronome.wav');
    let interval;

    //attach event listeners to the buttons
    startButton.addEventListener('click', startMetronome);
    stopButton.addEventListener('click', stopMetronome);

    function startMetronome () {
        startButton.disabled = true;
        stopButton.disabled = false;
        BPM.disabled = true;
        let BPM_ms = 60000 / Number(BPM.value);

        BPM.classList.add('animation');
        BPM.style.setProperty('--miliseconds', `${(BPM_ms / 500)}s`);

        tick.play();
        interval = setInterval(function () {
            tick.currentTime = 0;
            tick.play();
        }, BPM_ms);
    };

    function stopMetronome () {
        clearInterval(interval);
        BPM.classList.remove('animation');
        BPM.style.setProperty('--miliseconds', `0s`);
        startButton.disabled = false;
        stopButton.disabled = true;
        BPM.disabled = false;
    }

     // Update label with the input value
     BPM.addEventListener('input', function() {
        label.textContent = `${BPM.value} BPM`
    });
});