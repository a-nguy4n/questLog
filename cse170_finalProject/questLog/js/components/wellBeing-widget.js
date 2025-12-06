
class WellBeingWidget extends HTMLElement{
    
    connectedCallback(){
        this.classList.add("wellbeing-widget");
        this.renderComponent();
        this.attachEvents();
    }
    
    renderComponent(){
        this.innerHTML = `
        
            <section class="wellbeing-card">
                <h1 class="wellbeing-title"> My Well-Being Status</h1>

                <div class="status-row" id="health-status">
                    <div class="status-header">
                        <h2 class="status-label"> Health </h2>
                        <span class="status-value" id="health-value"> 45 / 100 </span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill health" style="width: 50%;"></div>
                    </div>
                </div>

                <div class="status-row" id="motivation-status">
                    <div class="status-header">
                        <h2 class="status-label">Motivation</h2>
                        <span class="status-value" id="motivation-value"> 100 / 100</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill motivation"></div>
                    </div>
                </div>

                <button class="log-btn" id="log-wellbeingBtn">
                    <img src="/questLog/assets/images/dashIcons/editPencil-icon.svg" alt="Edit Icon">
                    Log My Well-Being
                </button>
            </section>
        `;
    }

    attachEvents(){
        const logBtn = this.querySelector("#log-wellbeingBtn");

        if(logBtn){
            logBtn.addEventListener("click", () =>{
                window.location.href = "/questLog/pages/wellBeingLog.html";
            });
        }
    }
}

customElements.define("wellbeing-widget", WellBeingWidget);