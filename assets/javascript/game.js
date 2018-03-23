$(document).ready(function() {
    var playerChar, enemyChar, playerAtk, enemyAtk, playerSpeed, enemySpeed;
    $(".character-select").on("click", ".character", function() {
        var thiS = $(this);
        playerChar = thiS.attr('id');
        playerAtk = thiS.data('attack');
        playerSpeed = thiS.data('speed');
        $("#slot1").append("<p>" + thiS.data('moves').move1 + "</p>");
        $("#slot2").append("<p>" + thiS.data('moves').move2 + "</p>");
        $("#slot1").click(function() {
           console.log(playerDamageCalc($(this).text()));
        });
        $("#slot2").click(function() {
            console.log(playerDamageCalc($(this).text()));
        });
    });
//use setTimer to delay chosing of enemy, allow time for animation
    $(".character-select").on("click", ".character", function() {
        enemyChar = $(this).attr('id');
        enemyAtk = $(this).data('attack');
        enemySpeed = $(this).data('speed');
    });

   

    var gameMoves = {
        saberStrike: {
            damage: 10,
            accuracy: 1,
        },
        saberThrow: {
            damage: 11,
            accuracy: 0.7,
        },
        forceLightning: {
            damage: 12,
            accuracy: 0.8,
        },
        forceFocus: 3,

    };
    
    function playerDamageCalc(move) {
        return gameMoves[move].damage * playerAtk;
    }

    function whoGoesFirst() {

    }

    function doesAtkHit() {
        
    }
        
        
        
        
        
        
        
        
}); 