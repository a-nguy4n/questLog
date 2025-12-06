class FocusWidget extends HTMLElement{
    
    connectedCallback(){
        this.classList.add("focus-widget");
        this.renderComponent();
        this.attachEvents();
        this.timer = null;
        this.paused = false; 
        this.timeLeft = null; 
    }
    
    renderComponent(){
        this.innerHTML = `
        <section class="focus-card">
            <h1 class="focus-title">Focus-Mode</h1>

            <div class="focus-timer">
                <span class="time-box">
                    <input type="number" id="hours" class="time-input" min="0" max="23" value="00"/>
                    <p class="time-label"> Hours </p>
                </span>

                <span class="colon">:</span>

                <span class="time-box">
                    <input type="number" id="minutes" class="time-input" min="0" max="59" value="00"/>
                    <p class="time-label"> Minutes </p>
                </span>

                <span class="colon">:</span>

                <span class="time-box">
                    <input type="number" id="seconds" class="time-input" min="0" max="59" value="00"/>
                    <p class="time-label"> Seconds </p>
                </span>
            </div>

            <button class="startBtn" id="focus-startBtn">
                <img src="/questLog/assets/images/dashIcons/play-icon.svg" class="play-icon" id="start-img" alt="Play Icon">
                <span id="startBtn-label"> Start </span>
            </button>

            <hr class="focusDivider">

            <div class="break-info">
                <p class="break-row">NEXT <span>in 40m</span></p>
                <p class="break-row">LAST <span>2h 15m ago</span></p>
                <p class="break-row">5 Breaks Taken <span>= 3h 17m total</span></p>
            </div>
        </section>
        `;
    }

    attachEvents(){
        this.querySelector("#focus-startBtn").addEventListener("click", () => this.toggleTimer());
    }

    toggleTimer(){
        if(!this.timer && !this.paused){
            this.startTimer(); 
        } 
        else if(this.timer && !this.paused){
            this.pauseTimer(); 
        } 
        else if(this.paused){
            this.resumeTimer(); 
        }
    }

    startTimer(){
        const hours = parseInt(this.querySelector("#hours").value);
        const minutes = parseInt(this.querySelector("#minutes").value);
        const seconds = parseInt(this.querySelector("#seconds").value);

        this.remainingSeconds = hours * 3600 + minutes * 60 + seconds;

        if(this.remainingSeconds <= 0){
            alert("Please enter a valid time before starting the timer.");
            return;
        }

        this.paused = false;
        this.updateButton("Pause", "/questLog/assets/images/dashIcons/pause-icon.svg");

        this.runTimer();
    }

    runTimer(){
        this.timer = setInterval(() => {
            this.remainingSeconds--;
            this.updateDisplay();

            if(this.remainingSeconds <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.paused = false;
                alert("Time is up!");
                this.updateButton("Start", "/questLog/assets/images/dashIcons/play-icon.svg");
            }
        }, 1000);
    }

    pauseTimer(){
        clearInterval(this.timer);
        this.timer = null;
        this.paused = true;
        this.updateButton("Resume", "/questLog/assets/images/dashIcons/play-icon.svg");
    }

    resumeTimer(){
        if (this.remainingSeconds <= 0) return;
        this.paused = false;
        this.updateButton("Pause", "/questLog/assets/images/dashIcons/pause-icon.svg");
        this.runTimer();
    }

    updateDisplay(){
        let hours = Math.floor(this.remainingSeconds / 3600);
        let minutes = Math.floor((this.remainingSeconds % 3600) / 60);
        let seconds = this.remainingSeconds % 60;

        this.querySelector("#hours").value = String(hours).padStart(2, "0");
        this.querySelector("#minutes").value = String(minutes).padStart(2, "0");
        this.querySelector("#seconds").value = String(seconds).padStart(2, "0");
    }

    updateButton(text, iconPath){
        const startLabel = this.querySelector("#startBtn-label");
        const startIcon = this.querySelector("#start-img");
        const startButton = this.querySelector("#focus-startBtn");

        startLabel.textContent = text;
        startIcon.src = iconPath; 

        if(this.paused){
            startButton.style.backgroundColor = "#11BE11";
        }
        else{
            startButton.style.backgroundColor = "#F7D527";
        }
    }
}

customElements.define("focus-widget", FocusWidget);