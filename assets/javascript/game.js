$(document).ready(function() {
    var playerChar, enemyChar, playerAtk, enemyAtk, playerSpeed, enemySpeed, enemyMove;
    $(".character-select").on("click", ".character", function() {
        var thiS = $(this);
        playerChar = thiS.attr('id');
        playerAtk = thiS.data('attack');
        playerSpeed = thiS.data('speed');
        $("#slot1").append("<p>" + thiS.data('moves').move1 + "</p>");
        $("#slot2").append("<p>" + thiS.data('moves').move2 + "</p>");
        $("#slot1").click(function() {
           isAtkOrSpecial($(this).text());
        });
        $("#slot2").click(function() {
            isAtkOrSpecial($(this).text());
        });
    });

    $(".character-select").on("click", ".character", function() {
        var thiS = $(this);
        var m1, m2;
        enemyChar = thiS.attr('id');
        enemyAtk = thiS.data('attack');
        enemySpeed = thiS.data('speed');
        m1 = thiS.data('moves').move1;
        m2 = thiS.data('moves').move2;

    });

    var gameMoves = {
        saberStrike: {
            damage: 10,
            accuracy: 1,
            type: "attack",
        },
        saberThrow: {
            damage: 11,
            accuracy: 0.7,
            type: "attack",
        },
        forceLightning: {
            damage: 12,
            accuracy: 0.8,
            type: "attack",
        },
        forceFocus: {
            amount: 3,
            type: "speed",
            target: "self",
        },
        forceConfusion: {
            amount: 3,
            type: "speed",
            target: "opponent",
        },

    };
    
    function isAtkOrSpecial(move) {
        if (gameMoves[move].type === "attack") {
            playerDamageCalc(move);
   

        } else if (gameMoves[move].type === "speed") {
            
        }
    }

    function playerDamageCalc(move) {
        return gameMoves[move].damage * playerAtk;
    }

    function whoGoesFirst() {

    }

    function doesAtkHit() {
        
    }
        
        
        
        
        
        
        
        
}); 