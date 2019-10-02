new Vue({
    el: "#app",
    data: {
        usedSpecial: false,
        usedHeal: false,
        specialCount: 3,
        healCount: 2,
        playerHealth: 100,
        aiHealth: 100,
        started: false,
        currentTurn: 0,
        turns: []
    },
    methods :{
        startGame: function() {
            this.playerHealth = 100;
            this.aiHealth = 100;
            this.started = true;
            this.turns = [];
        },
        aiAttacks: function(){
            var damage = this.doDamage(0,7)
            this.playerHealth -= damage;
            if (damage > 0){
            this.turns.unshift({
                isPlayer: false,
                text: 'Turn ' + this.currentTurn + ': AI hits you for ' + damage
            })} else{
            this.turns.unshift({
                isPlayer: false,
                text: 'Turn ' + this.currentTurn + ': AI missed!'
            })};
            this.checkWin();
        },

        attack: function() {
            this.currentTurn += 1;
            this.usedSpecial = false;
            this.usedHeal = false;
            var damage = this.doDamage(0,5)
            this.aiHealth -= damage;
            if (damage > 0){
            this.turns.unshift({
                isPlayer: true,
                text: 'Turn ' + this.currentTurn + ': You hit the AI for ' + damage
            });} else {
            this.turns.unshift({
                isPlayer: true,
                text: 'Turn ' + this.currentTurn + ': You missed!'
              });};
            if(this.checkWin()){
                return;
            };
            this.aiAttacks();
        },

        specialAttack: function() {
            if(this.usedSpecial == false && this.specialCount > 0){
            this.currentTurn += 1;
            this.specialCount -= 1;
            this.usedHeal = false;
            this.usedSpecial = true;
            var damage = this.doDamage(5,10)
            this.aiHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Turn ' + this.currentTurn + ': You hit the AI with your special attack for ' + damage + ', you have ' + this.specialCount + ' left!'
            });
            this.aiAttacks();} else if(this.usedSpecial == true && this.specialCount > 0){
              this.turns.unshift({
                  isPlayer: true,
                  text: 'You need to recharge your special attack!'
              });
            }else {
                this.turns.unshift({
                isPlayer: true,
                text: 'You dont have any special attack left!'
            });};
            if(this.checkWin()){
                return;
            }
        },

        heal: function() {
            if(this.usedHeal == false && this.healCount > 0){
            this.currentTurn += 1;
            this.healCount -= 1;
            this.usedHeal = true;
            this.usedSpecial = false;
            var heals = this.doDamage(4,10)
            if(this.playerHealth <= 90) {
                this.playerHealth += heals;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Turn ' + this.currentTurn + ': You heal for ' + heals + ', you have ' + this.healCount + ' left!'
            });
            this.aiAttacks();} else if (this.usedHeal == true && this.healCount > 0){
              this.turns.unshift({
                  isPlayer: true,
                  text: 'You need to recharge your healing!'
              })
            } else{
                this.turns.unshift({
                isPlayer: true,
                text: 'You dont have any healing left!'
            });}
        },

        doDamage: function(min, max) {
            return Math.max( Math.floor( Math.random()  * max ), min);
        },

        checkWin: function(){
            if (this.aiHealth <= 0) {
                if(confirm('You Won! New Game?')){
                    this.startGame()
                } else {
                    this.started = false;
                }
                return true;

            } else if (this.playerHealth<=0) {
                if(confirm('You lost. New Game?')){
                    this.startGame()
                } else {
                    this.started = false;
                }
                return true;
            }
            return false;
        },

    }
})
