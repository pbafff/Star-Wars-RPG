$(document).ready(function () {
    var playerChar, enemyChar, playerAtk, enemyAtk, playerSpeed, enemySpeed, enemyMove, playerCurrentHP, enemyCurrentHP;
    var mArray = [];
    var playerBool = true;
    var enemyBool = true;
    $(".attackPanel").hide();
    $(".character-select").on("click", ".character", function () {
        if (playerBool) {
            var thiS = $(this);
            playerChar = thiS.attr('id');
            playerAtk = thiS.data('attack');
            playerSpeed = thiS.data('speed');
            $("#slot1").html("<p>" + thiS.data('moves').move1 + "</p>").hide();
            $("#slot2").html("<p>" + thiS.data('moves').move2 + "</p>").hide();
            thiS.children('p').html(thiS.data('hpValue'));
            playerBool = false;
            console.log(thiS.data('hpValue'));
        }
        if (playerBool === false && enemyBool === false) {
            $("#slot1").click(function () {
                isAtkOrSpecial($(this).text());
                console.log($(this).text())
            });
            $("#slot2").click(function () {
                isAtkOrSpecial($(this).text());
                console.log($(this).text())
            });
        }
    });

    $(".character-select").on("mouseup", ".character", function () {
        if (playerBool === false && enemyBool === true) {
            var thiS = $(this);
            var m1, m2;
            enemyChar = thiS.attr('id');
            enemyAtk = thiS.data('attack');
            enemySpeed = thiS.data('speed');
            m1 = thiS.data('moves').move1;
            m2 = thiS.data('moves').move2;
            mArray.push(m1, m2);
            pickEnemyMove();
            thiS.children('p').html(thiS.data('hpValue'));
            enemyBool = false;
            $(".attackPanel").show(2500);
            $("#slot1").show(4000);
            $("#slot2").show(4000);
            console.log(thiS.data('hpValue'));
        }
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
    function pickEnemyMove() { enemyMove = mArray[Math.floor(Math.random() * mArray.length)] };

    function isAtkOrSpecial(move) {
        if (gameMoves[move].type === "attack") {
            playerDamageCalc(move);


        } else if (gameMoves[move].type === "speed") {

        }
    }

    function playerDamageCalc(move) {
        return gameMoves[move].damage * playerAtk;
    }

    function enemyDamageCalc(move) {
        return gameMoves[move].damage * enemyAtk;
    }

    function whoGoesFirst() {

    }

    function doesAtkHit() {

    }








}); 