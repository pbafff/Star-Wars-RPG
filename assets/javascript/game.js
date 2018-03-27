$(document).ready(function () {
    var fates, playerChar, enemyChar, playerAtk, enemyAtk, playerSpeed, enemySpeed, enemyMove, playerCurrentHP, enemyCurrentHP;
    var mArray = [];
    var lightsaberNoises = ['http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=clash+clash+twirl&filename=22/228946-89256964-88ce-460e-98d5-7e9e64812844.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=5+clash+2&filename=22/228946-29a49c17-d7e8-4fb1-a657-fd2ce2d4d18e.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=4+Clash+good&filename=22/228946-a3ef5ba9-a1c2-403b-82d9-41bce0b4bc4e.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=4+clash+2&filename=22/228946-07dd54bb-8cb1-4d20-ae85-87de335c1f56.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=3+clash+1&filename=22/228946-c42aa303-0853-48ff-b827-d14953453493.mp3', 'http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=2+clash&filename=22/228946-d7bffcd7-133d-4d0e-9ebc-5ef7d8102f3a.mp3'];
    var saberRegEx = /saber/;
    var lightningRegEx = /lightning/i;
    var saberOn = new Audio('http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=SaberOn&filename=22/228946-af74bc36-4d8c-46db-a096-262b7fa25761.mp3');
    var saberOn2 = new Audio('http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=sw4-lightsabre&filename=22/228946-a71b9c11-1014-4959-8882-4d87088baeaa.mp3');
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
            playerCurrentHP = thiS.data('hpValue');
            $("#slot1").html("<p>" + thiS.data('moves').move1 + "</p>").hide();
            $("#slot2").html("<p>" + thiS.data('moves').move2 + "</p>").hide();
            thiS.children('p').html(thiS.data('hpValue'));
            saberOn2.play();
            playerBool = false;
        }
        if (playerBool === false && enemyBool === false) {
            $("#slot1").click(function () {
                pickEnemyMove();
                whoGoesFirst($(this).text());
                console.log("enemy move: " + enemyMove);
                if (saberRegEx.test($(this).text())) {
                    var randSaberNoise = new Audio(lightsaberNoises[Math.floor(Math.random() * lightsaberNoises.length)]);
                    randSaberNoise.play();
                } else if (lightningRegEx.test($(this).text())) {
                    forceLightningSound.play();
                }
                console.log("player move: " + $(this).text())
            });
            $("#slot2").click(function () {
                pickEnemyMove();
                whoGoesFirst($(this).text());
                console.log("enemy move:" + enemyMove);
                if (saberRegEx.test($(this).text())) {
                    var randSaberNoise = new Audio(lightsaberNoises[Math.floor(Math.random() * lightsaberNoises.length)]);
                    randSaberNoise.play();
                } else if (lightningRegEx.test($(this).text())) {
                    forceLightningSound.play();
                }
                console.log("player move: " + $(this).text())
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
            enemyCurrentHP = thiS.data('hpValue');
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
        }
    });

    var gameMoves = {
        saberStrike: {
            damage: 10,
            accuracy: 0.95,
            type: "attack",
        },
        saberThrow: {
            damage: 11,
            accuracy: 0.8,
            type: "attack",
        },
        forceLightning: {
            damage: 12,
            accuracy: 0.7,
            type: "attack",
        },
        forceFocus: {
            amount: 3,
            type: "speedmod",
            target: "self",
            accuracy: 1,
        },
        forceConfusion: {
            amount: -3,
            type: "speedmod",
            target: "opponent",
            accuracy: 0.8,
        },

    };
    function pickEnemyMove() {
        enemyMove = mArray[Math.floor(Math.random() * mArray.length)];

    };

    function isAtkOrSpecial(move) {
        // if (gameMoves[move].type === "attack") {
        //     playerDamageCalc(move);


        // } else if (gameMoves[move].type === "speedmod") {
        //     speedModifier(move);
        // }

        // if (gameMoves[enemyMove].type === "attack") {
        //     enemyDamageCalc(enemyMove);
        // } else if (gameMoves[enemyMove].type === "speedmod") {
        //     speedModifier(gameMoves[enemyMove]);
        // }
    }

    function playerDamageCalc(move) {
        return gameMoves[move].damage * playerAtk;
    }

    function enemyDamageCalc(move) {
        return gameMoves[move].damage * enemyAtk;
    }

    function whoGoesFirst(move) {
        if (playerSpeed > enemySpeed) {
            if (gameMoves[move].type === "attack" && gameMoves[enemyMove].type === "attack") {
                var playerDamage = playerDamageCalc(move);
                enemyCurrentHP -= playerDamage;

                if (enemyCurrentHP <= 0) { //check if enemy is dead 
                    $("#" + enemyChar).children('p').html(0);
                    setTimeout(() => {
                        $("#" + enemyChar).html("<h2> You have defeated " + enemyChar + "! </h2>");
                    }, 1500);
                    setTimeout(() => {
                        $("#" + enemyChar).hide();
                        enemyBool = true;

                    }, 3000);
                    
                } else { //if not dead apply damage to enemy...
                    setTimeout(() => {
                        $("#" + enemyChar).children('p').html(enemyCurrentHP);
                    }, 800);

                    setTimeout(() => { //and player
                        var enemyDamage = enemyDamageCalc(enemyMove);
                        playerCurrentHP -= enemyDamage;
                        $("#" + playerChar).children('p').html(playerCurrentHP);
                        if (playerCurrentHP <= 0) { //check if player is dead
                            $("#" + playerChar).html("You died!");
                            return;
                        }
                    }, 1200);

                }
            } else if (gameMoves[move].type === "speedmod" && gameMoves[enemyMove].type === "attack") {
                speedModifier(move, "player");
                setTimeout(() => {
                    var enemyDamage = enemyDamageCalc(enemyMove);
                    playerCurrentHP -= enemyDamage;
                    $("#" + playerChar).children('p').html(playerCurrentHP);
                    if (playerCurrentHP <= 0) {
                        $("#" + playerChar).html("You died!");
                        return;
                    }
                }, 1200);

            } else if (gameMoves[move].type === "attack" && gameMoves[enemyMove].type === "speedmod") {
                var playerDamage = playerDamageCalc(move);
                enemyCurrentHP -= playerDamage;
                if (enemyCurrentHP <= 0) { //check if enemy is dead 
                    $("#" + enemyChar).children('p').html(0);
                    setTimeout(() => {
                        $("#" + enemyChar).html("<h2> You have defeated " + enemyChar + "! </h2>");
                    }, 1500);
                    setTimeout(() => {
                        $("#" + enemyChar).hide();
                        enemyBool = true;

                    }, 3000);
                    
                } else { //if not dead apply damage to enemy...
                    setTimeout(() => {
                        $("#" + enemyChar).children('p').html(enemyCurrentHP);
                    }, 800);
                    setTimeout(() => { //and apply enemy speedmod
                        speedModifier(move, "enemy");
                    }, 1200);
                }
            } else if (gameMoves[move].type === "speedmod" && gameMoves[enemyMove].type === "speedmod") {
                speedModifier(move, "player");
                setTimeout(() => {
                    speedModifier(enemyMove, "enemy");
                }, 1000);
            }
        }
//----------------------------------------------------------------------------------------------------------------
        if (enemySpeed > playerSpeed) {
            if (gameMoves[enemyMove].type === "attack" && gameMoves[move].type === "attack") {
                var enemyDamage = enemyDamageCalc(enemyMove);
                playerCurrentHP -= enemyDamage;

                if (playerCurrentHP <= 0) { //check if player is dead
                    $("#" + playerChar).children('p').html(0);
                    setTimeout(() => {
                        $("#" + playerChar).html("You died!");
                    }, 1500);
                    return;
                } else { //if not dead apply damage to player...
                    setTimeout(() => {
                        $("#" + playerChar).children('p').html(playerCurrentHP);
                    }, 800);

                    setTimeout(() => { //and enemy
                        var playerDamage = playerDamageCalc(move);
                        enemyCurrentHP -= playerDamage;

                        if (enemyCurrentHP <= 0) { //check if enemy is dead 
                            $("#" + enemyChar).children('p').html(0);
                            setTimeout(() => {
                                $("#" + enemyChar).html("<h2> You have defeated " + enemyChar + "! </h2>");
                            }, 1500);
                            setTimeout(() => {
                                $("#" + enemyChar).hide();
                                enemyBool = true;

                            }, 3000);
                            
                        } else {
                            $("#" + enemyChar).children('p').html(enemyCurrentHP);
                        }
                    }, 1200);
                }

            } else if (gameMoves[enemyMove].type === "speedmod" && gameMoves[move].type === "attack") {
                speedModifier(enemyMove, "enemy");
                setTimeout(() => {
                    var playerDamage = playerDamageCalc(move);
                    enemyCurrentHP -= playerDamage;

                    if (enemyCurrentHP <= 0) { //check if enemy is dead 
                        $("#" + enemyChar).children('p').html(0);
                        setTimeout(() => {
                            $("#" + enemyChar).html("<h2> You have defeated " + enemyChar + "! </h2>");
                        }, 1500);
                        setTimeout(() => {
                            $("#" + enemyChar).hide();
                            enemyBool = true;

                        }, 3000);
                        
                    } else {
                        $("#" + enemyChar).children('p').html(enemyCurrentHP);
                    }
                }, 1200);

            } else if (gameMoves[enemyMove].type === "attack" && gameMoves[move].type === "speedmod") {
                var enemyDamage = enemyDamageCalc(enemyMove);
                playerCurrentHP -= enemyDamage;
                if (playerCurrentHP <= 0) { //check if player is dead
                    $("#" + playerChar).children('p').html(0);
                    setTimeout(() => {
                        $("#" + playerChar).html("You died!");
                    }, 1500);
                    return;
                } else { //if not dead apply damage to player...
                    setTimeout(() => {
                        $("#" + playerChar).children('p').html(playerCurrentHP);
                    }, 800);
                    setTimeout(() => {
                        speedModifier(move, "player");
                    }, 1200);
                }
            } else if (gameMoves[enemyMove].type === "speedmod" && gameMoves[move].type === "speedmod") {
                speedModifier(enemyMove, "enemy");
                setTimeout(() => {
                    speedModifier(move, "player");
                }, 1000);
            }
        }
    }


    function doesAtkHit() {
        var d = Math.random();
        if (d < gameMoves[move].accuracy) {
            return true;
        }
        else {
            return false;
        }
    }

    function speedModifier(move, identity) {
        console.log("speedmod identity: " + identity)
        if (gameMoves[move].target === "self" && identity === "player") {
            playerSpeed += gameMoves[move].amount;
            console.log("player speed changed to " + playerSpeed);
        } else if (gameMoves[move].target === "self" && identity !== "player") {
            enemySpeed += gameMoves[move].amount;
            console.log("enemy speed changed to " + enemySpeed);
        } else if (gameMoves[move].target === "opponent" && identity === "player") {
            enemySpeed += gameMoves[move].amount;
            console.log("enemy speed changed to " + enemySpeed);
        } else if (gameMoves[move].target === "opponent" && identity !== "player") {
            playerSpeed += gameMoves[move].amount;
            console.log("player speed changed to " + playerSpeed);
        }
    }

    function blah() {

    }






}); 