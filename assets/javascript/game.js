$(document).ready(function () {
    var fates, playerChar, enemyChar, playerAtk, enemyAtk, playerSpeed, enemySpeed, enemyMove, playerCurrentHP, enemyCurrentHP;
    var mArray = [];
    var lightsaberNoises = ['http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=clash+clash+twirl&filename=22/228946-89256964-88ce-460e-98d5-7e9e64812844.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=5+clash+2&filename=22/228946-29a49c17-d7e8-4fb1-a657-fd2ce2d4d18e.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=4+Clash+good&filename=22/228946-a3ef5ba9-a1c2-403b-82d9-41bce0b4bc4e.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=4+clash+2&filename=22/228946-07dd54bb-8cb1-4d20-ae85-87de335c1f56.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=3+clash+1&filename=22/228946-c42aa303-0853-48ff-b827-d14953453493.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=2+clash&filename=22/228946-d7bffcd7-133d-4d0e-9ebc-5ef7d8102f3a.mp3'];
    var saberRegEx = /saber/;
    var lightningRegEx = /lightning/i;
    var saberOn = new Audio('http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=SaberOn&filename=22/228946-af74bc36-4d8c-46db-a096-262b7fa25761.mp3');
    var saberOn2 = new Audio ('http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=sw4-lightsabre&filename=22/228946-a71b9c11-1014-4959-8882-4d87088baeaa.mp3');
    var forceLightningSound = new Audio("./assets/forceLightningSound.mp3")
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
            saberOn2.play();
            playerBool = false;
            console.log(thiS.data('hpValue'));
        }
        if (playerBool === false && enemyBool === false) {
            $("#slot1").click(function () {
                isAtkOrSpecial($(this).text());
                pickEnemyMove();
                if (saberRegEx.test($(this).text())) {
                    var randSaberNoise = new Audio(lightsaberNoises[Math.floor(Math.random() * lightsaberNoises.length)]);
                    randSaberNoise.play();
                } else if (lightningRegEx.test($(this).text())) {
                    forceLightningSound.play();
                }
                console.log($(this).text())
            });
            $("#slot2").click(function () {
                isAtkOrSpecial($(this).text());
                pickEnemyMove();
                if (saberRegEx.test($(this).text())) {
                    var randSaberNoise = new Audio(lightsaberNoises[Math.floor(Math.random() * lightsaberNoises.length)]);
                    randSaberNoise.play();
                } else if (lightningRegEx.test($(this).text())) {
                    forceLightningSound.play();
                }
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
            
            thiS.children('p').html(thiS.data('hpValue'));
            enemyBool = false;
            $(".attackPanel").show(2500);
            $("#slot1").show(4000);
            $("#slot2").show(4000);
            fates = new Audio("https://archive.org/download/StarWarsJohnWilliamsDuelOfTheFates_201601/Star%20Wars%20-%20John%20Williams%20-%20Duel%20Of%20The%20Fates.mp3");
            saberOn.play();
            fates.play();
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
            type: "speedmod",
            target: "self",
        },
        forceConfusion: {
            amount: -3,
            type: "speedmod",
            target: "opponent",
        },

    };
    function pickEnemyMove() { 
        enemyMove = mArray[Math.floor(Math.random() * mArray.length)];
    };

    function isAtkOrSpecial(move) {
        if (gameMoves[move].type === "attack") {
            playerDamageCalc(move);


        } else if (gameMoves[move].type === "speedmod") {
            speedModifier(move);
        }

        if (gameMoves[enemyMove].type === "attack") {
            enemyDamageCalc(enemyMove);
        } else if (gameMoves[enemyMove].type === "speedmod") {
            speedModifier(gameMoves[enemyMove]);
        }
    }

    function playerDamageCalc(move) {
        return gameMoves[move].damage * playerAtk;
    }

    function enemyDamageCalc(move) {
        return gameMoves[move].damage * enemyAtk;
    }

    function whoGoesFirst() {
        if (playerSpeed > enemySpeed) {
            if () {
                
            }
        }
    }

    function doesAtkHit() {

    }

    function speedModifier(move) {
        if (gameMoves[move].target === "self") {
            playerSpeed += gameMoves[move].amount;
            console.log("player speed changed to " + playerSpeed);
        } else if (gameMoves[move].target === "opponent") {
            enemySpeed += gameMoves[move].amount;
            console.log("enemy speed changed to " + enemySpeed);   
        }
    }








}); 