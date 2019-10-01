new Vue({
    el: "#app",
    data: {
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
            this.turns.unshift({
                isPlayer: false,
                text: 'AI hits you for ' + damage
            });
            this.checkWin();
        },

        attack: function() {
            var damage = this.doDamage(0,5)
            this.aiHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit the AI for ' + damage
            });
            if(this.checkWin()){
                return;
            };
            this.aiAttacks();
        },

        specialAttack: function() {
            var damage = this.doDamage(5,10)
            this.aiHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit the AI with your special attack for ' + damage
            });
            if(this.checkWin()){
                return;
            };
            this.aiAttacks();
        },
        
        heal: function() {
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
            this.aiAttacks();
        },

        doDamage: function(min, max) {
            return Math.max( Math.floor( Math.random()  * max ) + 1, min);
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