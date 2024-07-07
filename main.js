let xp = 0;
let health =100;
let gold = 50;

let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"]; 

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

let imagebox = document.querySelector("#imagebox")

const weapons = [
    {
        name:"stick",
        power: 5
    },

    {
        name:"dagger",
        power: 30
    },

    {
        name:"claw Hammer",
        power: 50
    },

    {
        name:"sword",
        power: 100
    }
]


const monsters = [
    {
        name:"slime",
        level:2,
        health:15
    },

    {
        name:"fanged beast",
        level:8,
        health:60
    },

    {
        name:"dragon",
        level:20,
        health:300
    }
];

const locations = [
{//locations[0]
    name:"town square",
    "button text":["Go to store","Go to cave","Fight Dragon"],
    "button function":[goStore, goCave, fightDragon],
    text:"You are in the town square. you see a sign that says \"Store\". "
},

{//locations[1]
    name:"store",
    "button text":["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button function": [buyHealth, buyWeapon, goTown],
    text:"You enter the store."
},

{//locations[2]
    name:"cave",
    "button text":["Fight slime", "Fight fanged beast", "Go to town square"],
    "button function":[fightSlime, fightBeast, goTown],
    text:"You entred the cave. You see some monstors"
},

{//locations[3]
    name:"fight",
    "button text":["Attack","dodge","run"],
    "button function":[attack,dodge,goTown],
    text:"You ae fightting a monster"
},

{//locations[4]
    name:"kill monster",
    "button text":["Go to town square","Go to town square","Easter-Egg"],
    "button function":[goTown,goTown,easterEgg],
    text:'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
},

{//locations[5]
    name:"lose",
    "button text":["REPLAY?","REPLAY?","REPLAY?"],
    "button function":[restart,restart,restart],
    text:"You die ☠️"
},

{//locations[6]
    name:"win",
    "button text":["REPLAY?","REPLAY?","REPLAY?"],
    "button function":[restart,restart,restart],
    text:"You defeat the dragon! YOU WIN THE GAME! 🎉"
},

{
//locations[7]  
    name:"easter egg",
    "button text":["2","8","Go to town square"],
    "button function":[pickTwo, pickEight, goTown],
    text:"You find a secret game. Pick a number above. Ten numbers will be chosen between 0 and 10 if the number you choose matches one of the random numbers,you win"

}

];

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button function"][0];
    button2.onclick = location["button function"][1];
    button3.onclick = location["button function"][2];

    text.innerText = location.text;
}

//initializing buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function goTown()
{
    update(locations[0]); 
    imagebox.src="images/townSquare.jpeg"   
}

function goStore()
{
    update(locations[1]);
    imagebox.src="images/storein.jpeg"
}

function goCave()
{
    update(locations[2]);
    imagebox.src="images/cave.jpeg"
}


function buyHealth(){
    if(gold>=10){
        gold-=10;
        health+=10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    
    else{
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon(){
    if(currentWeapon<weapons.length-1){
        
        if (gold>=30){
            gold -= 30;
            currentWeapon ++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon+".";
            inventory.push(newWeapon);
            text.innerText += "In your inventory you have: "+ inventory; 
        }
        else{
            text.innerText = "You dont have enough gold to buy a weapon.";
        }
        
    }
    
    else{
        text.innerText = "You already have the most powerfull weapon"; 
    }
    
    
}



function sellWeapon(){
    if (inventory.length>1){
        gold+=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();

        text.innerText = "You sold a "+ currentWeapon + ".";
        text.innerText = "In your inventory you have " + inventory;
    }

    else{
        text.innerText = "Don't sell your only weapon!";
    }
}

//all the monster fight functions are placed toether 

function fightSlime(){
    fighting=0;
    goFight();
    imagebox.src="images/slime-man.jpeg"
}

function fightBeast (){
    fighting=1;
    goFight();
    imagebox.src="images/fanged_beast.jpeg"
}

function fightDragon(){
    fighting=2;
    goFight();
    imagebox.src="images/fightimage1.jpeg"
}


function goFight(){
    update(locations[3]);
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = "The "+ monsters[fighting].name + "attacks."
    text.innerText = "You attack with your " + weapons[currentWeapon].name +".";
    
    if(isMonsterhit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }

    else{
        text.innerText += "You miss.";
    }

    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp);
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health<=0){
        lose()
    }

    else if(monsterHealth<=0){
            fighting === 2 ? winGame() : deafeatMonster();
    }

    if(Math.random()<=.1 && inventory.length !==1){
        text.innerText = "your" + inventory.pop() + "breaks";
        currentWeapon--;
    } 
}

function isMonsterhit(){
    return Math.random() > .2 || health < 20;  
}

function getMonsterAttackValue(level){
    let hit = (level*5)-Math.floor(Math.random()*xp);
    console.log(hit);
    return hit;
}

function dodge(){
    text.innerText = "You dodged the attack from the "+monsters[fighting].name+".";
}

function deafeatMonster(){
    gold += Math.floor(monsters[fighting].level*6.7); 
    xp += monsters[fighting].level
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
    imagebox.src="images/easterEgg.jpeg";

};

function lose(){
    update(locations[5]);
};

function winGame(){
    update(locations[6]);
};

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown();
};
 
function easterEgg(){
    update(locations[7]);

}

function pickTwo(){ 
    pick(2)
}

function pickEight(){
    pick(8)
}

function pick(guess){
    let numbers = [];
    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random()*11));
    }

    text.innerText = "You picked "+ guess +". Here are the random Numbers:\n"

    for(let i = 0;i<10;i++)
    {
        text.innerText += numbers[i] + "\n"; 
    }

    if(numbers.indexOf(guess)!==-1){
        text.innerText += "Right! you win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
        console.log("gold", gold)
        console.log("goldtext:", goldText)
    }

    else {
        text.innerText += "Wrong! you lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        console.log("health", health)
        console.log("healthtext:", goldText)

        if(health <= 0){
            lose();
        }
    }


}
