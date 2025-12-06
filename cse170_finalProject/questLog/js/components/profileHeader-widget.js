
class ProfileHeaderWidget extends HTMLElement{
    
    connectedCallback(){
        this.classList.add("profile-widget");
        this.renderComponent();
        this.attachEvents();
    }

    renderComponent(){
        this.innerHTML = `
        <section class="profile-card">
            <div class="profile-left">
                <div class="avatar-circle">
                    <img src="/questLog/assets/images/characters/rabbit-char.svg" alt="User avatar">
                </div>
                <p class="profile-name">Procrastinator</p>
            </div>

            <div class="profile-right">
                <div class="xp-section">
                    <div class="xp-header">
                        <span class="level-label">Level 1</span>
                        <span class="xp-value">325 / 1000 XP</span>
                    </div>

                    <div class="xp-track">
                        <div class="xp-fill"></div>
                    </div>
                </div>

                <div class="profile-actions">
                    <span id="streaks" class="streaks-stat">
                        <div class="streaks-top">
                            <span class="streak-number">1</span>
                            <img src="/questLog/assets/images/dashIcons/streaks-icon.svg" alt="Streaks icon" class="streaks-icon">
                        </div>
                        <span class="profile-actionLabel">Streaks</span>
                    </span>

                    <button class="action-btn" id="rewards">
                        <img src="/questLog/assets/images/dashIcons/rewards-icon.svg" alt="Rewards Icon">
                        <span class="profile-actionLabel">View Rewards</span>
                    </button>

                    <button class="action-btn" id="daily-recap">
                        <img src="/questLog/assets/images/dashIcons/recap-icon.svg" alt="Daily Recap Icon">
                        <span class="profile-actionLabel">Daily Recap</span>
                    </button>

                    <button class="action-btn" id="settings">
                        <img src="/questLog/assets/images/dashIcons/settings-icon.svg" alt="Settings Icon">
                        <span class="profile-actionLabel">Settings</span>
                    </button>
                </div>
            </div>
        </section>
        `;
    }

    attachEvents(){
        const rewardsButton = this.querySelector("#rewards");
        const dailyRecapButton = this.querySelector("#daily-recap");
        const settingsButton = this.querySelector("#settings");

        if(rewardsButton){
            rewardsButton.addEventListener("click", () => {
                window.location.href = "/questLog/pages/rewards.html";
            });
        }

        if(dailyRecapButton){
            dailyRecapButton.addEventListener("click", () => {
                window.location.href = "/questLog/pages/recap.html";
            });
        }

        if(settingsButton){
            settingsButton.addEventListener("click", () => {
                window.location.href = "/questLog/pages/settings.html";
            });
        }
    }
}

customElements.define("profile-widget", ProfileHeaderWidget);