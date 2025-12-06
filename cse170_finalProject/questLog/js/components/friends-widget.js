
class FriendsWidget extends HTMLElement{
    
    connectedCallback(){
        this.classList.add("friends-widget");
        this.renderComponent();
        this.attachEvents();
    }
    
    renderComponent(){
        this.innerHTML = `
        <section class="friends-card">
            <h1 class="friends-title">My Friends</h1>
            
            <div class="friends-list">
                <article class="friend-item">
                    <div class="friend-main">
                        <div class="friend-avatar">
                            <img src="/questLog/assets/images/characters/alien-char.svg" alt="Friend Avatar"/>
                        </div>
                        <div class="friend-text">
                            <p class="friend-name">Friend Name</p>
                            <p class="friend-meta"> Lvl 25 · Quests Done 1 / 7 ·
                                <span class="status status-active"> Active </span>
                            </p>
                        </div>
                    </div>

                    <button class="friend-nudge">
                        <img src="/questLog/assets/images/dashIcons/message-icon.svg" alt="Message Icon">
                    </button>

                </article>

                <article class="friend-item">
                    <div class="friend-main">
                        <div class="friend-avatar">
                            <img src="/questLog/assets/images/characters/dragon-char.svg" alt="Friend Avatar" />
                        </div>
                        <div class="friend-text">
                            <p class="friend-name">Username Friend Name</p>
                            <p class="friend-meta"> Lvl 5 · Quests Done 5 / 13 ·
                                <span class="status status-inactive"> Inactive </span>
                            </p>
                        </div>
                    </div>
                     <button class="friend-nudge">
                        <img src="/questLog/assets/images/dashIcons/message-icon.svg" alt="Message Icon">
                    </button>
                </article>
        
                <article class="friend-item">
                    <div class="friend-main">
                        <div class="friend-avatar">
                            <img src="/questLog/assets/images/characters/monkey-char.svg" alt="Friend Avatar" />
                        </div>
                        <div class="friend-text">
                            <p class="friend-name">Curious Studyer</p>
                            <p class="friend-meta"> Lvl 36 · Quests Done 14 / 21 ·
                                <span class="status status-focus"> Focus On </span>
                            </p>
                        </div>
                    </div>
                     <button class="friend-nudge">
                        <img src="/questLog/assets/images/dashIcons/message-icon.svg" alt="Message Icon">
                    </button>
                </article>

                <article class="friend-item">
                    <div class="friend-main">
                        <div class="friend-avatar">
                            <img src="/questLog/assets/images/characters/umbrella-char.svg" alt="Friend Avatar" />
                        </div>
                        <div class="friend-text">
                            <p class="friend-name">Locked In</p>
                            <p class="friend-meta"> Lvl 22 · Quests Done 8 / 12 ·
                                <span class="status status-inactive"> Inactive </span>
                            </p>
                        </div>
                    </div>
                     <button class="friend-nudge">
                        <img src="/questLog/assets/images/dashIcons/message-icon.svg" alt="Message Icon">
                    </button>
                </article>

                <article class="friend-item">
                    <div class="friend-main">
                        <div class="friend-avatar">
                            <img src="/questLog/assets/images/characters/rabbit-char.svg" alt="Friend Avatar" />
                        </div>
                        <div class="friend-text">
                            <p class="friend-name">Procrastinator</p>
                            <p class="friend-meta"> Lvl 6 · Quests Done 3 / 55 ·
                                <span class="status status-active"> Active </span>
                            </p>
                        </div>
                    </div>
                     <button class="friend-nudge">
                        <img src="/questLog/assets/images/dashIcons/message-icon.svg" alt="Message Icon">
                    </button>
                </article>
            </div>

            <div class="nudgeFriend-popup" id="nudgeFriend-popup">
                <div class="nudgeFriend-content">
                    <h2 class="nudge-title">Send a Nudge</h2>
                    <p class="nudge-to">To: 
                        <span id="nudge-targetName"></span>
                    </p>
                    <textarea id="nudge-message" rows="3" placeholder=" Type a quick message..."></textarea>
                    <div class="nudge-actions">
                        <button type="button" id="nudge-cancel"> Cancel </button>
                        <button type="button" id="nudge-send"> Send </button>
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    attachEvents(){
        const nudgeButtons = this.querySelectorAll(".friend-nudge");
        nudgeButtons.forEach(btn => {
            btn.addEventListener("click", (event) => this.openNudgeModal(event));
        });

        this.querySelector("#nudge-cancel").addEventListener("click", () => this.closeNudgeModal());
        this.querySelector("#nudge-send").addEventListener("click", () => this.handleSend());
    }

    openNudgeModal(event){
        const item = event.currentTarget.closest(".friend-item");
        
        let name = "Friend";
        const friendNameSelect = item.querySelector(".friend-name");
        if(friendNameSelect && friendNameSelect.textContent){
            name = friendNameSelect.textContent.trim();
        }

        this.querySelector("#nudge-targetName").textContent = name;
        this.querySelector("#nudge-message").value = "";
        this.querySelector("#nudgeFriend-popup").classList.add("open");
    }
    
    closeNudgeModal(){
        this.querySelector("#nudgeFriend-popup").classList.remove("open");
    }
    
    handleSend(){
        const name = this.querySelector("#nudge-targetName").textContent;
        const msg = this.querySelector("#nudge-message").value.trim();
        this.closeNudgeModal();
    }
}

customElements.define("friends-widget", FriendsWidget);