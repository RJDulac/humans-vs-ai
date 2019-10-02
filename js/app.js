new Vue({
    el: "#app",
    data: {
        usedSpecial: false,
        usedHeal: false,
        playerHealth: 100,
        aiHealth: 100,
        started: false,
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
                text: 'AI hits you for ' + damage
            })} else{
            this.turns.unshift({
                isPlayer: false,
                text: 'AI missed!'
            })};
            this.checkWin();
        },

        attack: function() {
            this.usedSpecial = false;
            this.usedHeal = false;
            var damage = this.doDamage(0,5)
            this.aiHealth -= damage;
            if (damage > 0){
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit the AI for ' + damage
            });} else {
            this.turns.unshift({
                isPlayer: true,
                text: 'You missed!'
              });};
            if(this.checkWin()){
                return;
            };
            this.aiAttacks();
        },

        specialAttack: function() {
            if(this.usedSpecial == false){
            this.usedHeal = false;
            this.usedSpecial = true;
            var damage = this.doDamage(5,10)
            this.aiHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit the AI with your special attack for ' + damage
            });
            this.aiAttacks();} else{
              this.turns.unshift({
                  isPlayer: true,
                  text: 'You need to recharge your special attack!'
              });
            };
            if(this.checkWin()){
                return;
            }
        },

        heal: function() {
            if(this.usedHeal == false){
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
                text: 'You heal for ' + heals
            });
            this.aiAttacks();} else{
              this.turns.unshift({
                  isPlayer: true,
                  text: 'You need to recharge your healing!'
              })
            }
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
