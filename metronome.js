window.addEventListener('load', (event) => {
    let startButton = document.getElementById('start');
    let stopButton = document.getElementById('stop');
    let BPM = document.getElementById('BPM')
    let label = document.getElementById('label');
    BPM.addEventListener('input', function() {
        label.textContent = `BPM: ${BPM.value}`
    })

    stopButton.disabled = true;
    stopButton.style.display = 'none';

    startButton.addEventListener('click', startMetronome);
    stopButton.addEventListener('click', stopMetronome);
    
    let interval

    function startMetronome () {
        startButton.disabled = true
        startButton.style.display = 'none';
        stopButton.style.display = 'inline';
        stopButton.disabled = false
        // calculate BPM in miliseconds
        let BPM_ms = 1000 / (Number(BPM.value) / 60);
        let tick = new Audio('./metronome.wav');
        // set metronome animation
        BPM.style.animation = `metronome ${(BPM_ms / 500)}s linear`;
        // stops the animation after completing the beats
        BPM.style.animationIterationCount = BPM.value / 2;
        let ticks = 0
        // play the thick sound every N miliseconds
        interval = setInterval(function() {
            tick.play()
            ticks++
            console.log(ticks)
        }, BPM_ms);

        // clear the sound interval so the sound stops with the animation after 1 minute
        setTimeout(function() {
           initialState()
        }, 60000)
    }

    function stopMetronome () {
        initialState()
    }

    function initialState () {
        clearInterval(interval)
        BPM.style.animation = '';
        startButton.disabled = false;
        startButton.style.display = 'inline';
        stopButton.disabled = true;
        stopButton.style.display = 'none'
    }
})