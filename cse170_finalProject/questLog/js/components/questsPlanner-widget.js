
const QUESTS_TYPE_DATA = {
    main: {
        label: "Main",
        completed: 0,
        total: 5,
        items: [
            { name: "Complete Assignment #6", xp_value: 50 },
            { name: "Programming Assignment", xp_value: 250 },
            { name: "Essay for Class Something Something", xp_value: 200 },
            { name: "HW #1 on PrairieLearn", xp_value: 100 },
            { name: "Class Readings", xp_value: 130 },
        ]
    },

    daily:{
        label: "Daily",
        completed: 0,
        total: 3,
        items: [
            { name: "Hit the gym", xp_value: 100 },
            { name: "Go to class", xp_value: 50 },
            { name: "water the plants", xp_value: 50 },
        ]
    },

    side:{
        label: "Side",
        completed: 0,
        total: 7,
        items: [
            { name: "Read Book (3 chapters a day)", xp_value: 50 },
            { name: "Groceries", xp_value: 50 },
            { name: "Do laundry", xp_value: 30 },
            { name: "Put up decorations", xp_value: 30 },
            { name: "Return Item", xp_value: 25 },
            { name: "Shop for gifts", xp_value: 75 },
            { name: "Call the repairman", xp_value: 40 },
        ]
    }
}

class QuestsPlannerWidget extends HTMLElement{
    
    connectedCallback(){
        this.classList.add("questsPlanner-widget");
        this.questsMap = QUESTS_TYPE_DATA;
        this.currentTab = 'main';

        this.renderComponent();
        this.attachEvents();
        this.showQuestContent(this.currentTab);
    }
        
    renderComponent(){
        this.innerHTML = `
        <section class="quest-card">
            <h1 class="quest-title">Today’s Quests</h1>

            <div class="quest-tabs">
                <button class="quest-tab quest-tab-active" id="main-tab"> Main Quests </button>
                <button class="quest-tab" id="daily-tab"> Daily Quests </button>
                <button class="quest-tab" id="side-tab"> Side Quests </button>
            </div>
            
            <div class="quest-list" id="quest-list">
               
            </div>

            <div class="quest-footer">
                <div class="quest-total">
                    <span id="tab-name"> Main </span> 
                    Quests Completed 
                    <span id="complete-count"> 0 </span> / <span id="total-count"> 5 </span> 
                </div>
                
                <button class="questOpen-btn" id="questOpen-btn">
                    <img src="/questLog/assets/images/dashIcons/editQuestPlanner-icon.svg" alt="Open Planner Icon"/>
                    Open Quest Planner
                </button>
            </div>
        </section>
        `;
    }

    attachEvents(){
        this.querySelector("#main-tab").addEventListener("click", () => this.showQuestContent("main"));
        this.querySelector("#daily-tab").addEventListener("click", () => this.showQuestContent("daily"));
        this.querySelector("#side-tab").addEventListener("click", () => this.showQuestContent("side"));

        const openQuestPlannerButton = this.querySelector("#questOpen-btn");
        if(openQuestPlannerButton ){
            openQuestPlannerButton .addEventListener("click",() =>{
                window.location.href = "/questLog/pages/questPlanner.html";
            });
        }
    }

    showQuestContent(activeTab){
        this.currentTab = activeTab;   

        this.updateActiveTab(activeTab);
        this.updateQuestList(activeTab);
        this.updateFooter(activeTab);
        this.checkboxListener();
    }

    updateActiveTab(activeTab){
        const mainTab = this.querySelector("#main-tab");
        const dailyTab = this.querySelector("#daily-tab");
        const sideTab = this.querySelector("#side-tab");

        mainTab.classList.toggle("quest-tab-active", activeTab === "main");
        dailyTab.classList.toggle("quest-tab-active", activeTab === "daily");
        sideTab.classList.toggle("quest-tab-active", activeTab === "side");
    }

    updateQuestList(activeTab){
        const questData = this.questsMap[activeTab];
        const questList = this.querySelector("#quest-list");

        questList.innerHTML = questData.items.map(item => 
            `
                <article class="quest-item">
                    <label class="quest-content">
                        <input type="checkbox" />
                        <span class="quest-text">${item.name}</span>
                    </label>
                    <span class="quest-xp">+ ${item.xp_value} xp</span>
                </article>
            `).join("");
    }

    updateFooter(activeTab){
        const questData = this.questsMap[activeTab];

        const tabNameFooter = this.querySelector('#tab-name');
        const completeCount = this.querySelector('#complete-count');
        const totalCount = this.querySelector('#total-count');

        if(questData){
            tabNameFooter.textContent = questData.label;
            completeCount.textContent = questData.completed;
            totalCount.textContent = questData.total;
        }
    }

    checkboxListener(){
        const questList = this.querySelector("#quest-list");

        questList.addEventListener("change", (event) => {
            if(!event.target.matches("input[type='checkbox']")) return;
            
            const checkbox = event.target;
            const questData = this.questsMap[this.currentTab];
            const questName = checkbox.closest(".quest-item").querySelector(".quest-text").textContent;
            const questItem = questData.items.find(i => i.name === questName);

            if(questItem.done === undefined){
                questItem.done = false;
            }

            questItem.done = checkbox.checked;
            questData.completed = questData.items.filter(i => i.done).length;

            this.updateFooter(this.currentTab);
        });
    }
};

customElements.define("quests-widget", QuestsPlannerWidget);