/**
 * Created by Patrick on 11/2/16.
 */
(function()    {

    "use strict";

    // Global variables
    var buttons = $(".button"); // Assign elements with id ".button" to variable buttons
    var simonArray;             // Array that holds Simon's moves
    var userArray;              // Array that holds User's moves

    // Called by start button click listener at bottom to begin the game;
    // Empty Simon's array; Run simonsMove
    function beginGame()    {
        simonArray = [];
        simonsMove();
    }

    // Simon's move; Empty User's array; Run keepScore to output rounds completed
    // to "#screen"; Run getRandom and playbackArray to select and display Simon's
    // move(s)
    function simonsMove()    {
        userArray = [];
        keepScore();
        getRandom();
        playbackArray();
    }

    // Get random number from 0-3; Set the random number as the index
    // of game buttons and store in buttonActivated; Push id of the button
    // activated to Simon's array
    function getRandom()    {
        var random = Math.floor(Math.random() * 4);
        var buttonActivated = buttons[random];
        simonArray.push(buttonActivated.id);
    }

    // Playback the array; Run disableClick to disable user input during
    // playback; Set playback interval to 1 second; Run lightUp function
    // on the button id(s) stored in Simon's array; Clear interval when Simon's
    // array has been played back; Run enableClick to re-enable user input
    function playbackArray()    {
        disableClick();
        var i = 0;
        var intervalId = setInterval(function()    {
            lightUp($("#" + simonArray[i]));
            i++;
            if (i >= simonArray.length)    {
                clearInterval(intervalId);
                enableClick();
            }
        }, 1000);
    }

    // Called by game button click listeners at bottom; Run lightUp function
    // on the button activated; Push id of the button activated to User's array;
    function userInput()    {
        lightUp($(this));
        userArray.push(this.id);
        compareArrays();
    }

    // Compare Simon's and User's arrays to determine if user input is correct;
    // Variable incorrect holds boolean value; For loop compares each index of
    // User's array and Simon's array; Should they not match, variable incorrect
    // becomes true and gameOver is called to end the game; If they do match
    // simonsMove is called to continue the game
    function compareArrays()    {
        var incorrect = false;
        for (var i = 0; i < userArray.length; i++)    {
            if (simonArray[i] != userArray[i])    {
                incorrect = true;
                break;
            }
        }
        if (incorrect)    {
            gameOver();
        } else if (userArray.length == simonArray.length)    {
            simonsMove();
        }
    }

    // Keep track of rounds completed successfully and output to "#screen"
    function keepScore()    {
        $("#screen").text(simonArray.length);
    }

    // Applies class "lightup" for .25 seconds to the game buttons when called by
    // both User and Simon
    function lightUp(button)    {
        button.addClass("lightup");
        setTimeout(function()    {
            button.removeClass("lightup");
        }, 250);
    }

    // Called when User's array and Simon's array don't match; Confirms game is
    // over, displays score, and prompts the user if they'd like to try again; If
    // they agree, run beginGame after a .5 second delay; Otherwise reload the page
    // to reset the game
    function gameOver()    {
        setTimeout(function()    {
            var tryAgain = confirm("Game over man! Your score was " + ((simonArray.length) - 1) + ". Try again?");
            if(tryAgain)    {
                beginGame();
            } else    {
                location.reload(true);
            }
        }, 500);
    }

    // Called by reset button click listener at bottom to reset the game;
    // Alerts user their score and "Thanks for playing!"; Reloads the page to
    // reset the game
    function resetGame()    {
        alert("Your score was " + ((simonArray.length) - 1) + ". Thanks for playing!");
        location.reload(true);
    }

    // Enable User to click game buttons when it's their turn
    function enableClick()    {
        $("#0").on("click", userInput);
        $("#1").on("click", userInput);
        $("#2").on("click", userInput);
        $("#3").on("click", userInput);
    }

    // Disable User to click game buttons when it isn't their turn
    function disableClick()    {
        $("#0").off("click", userInput);
        $("#1").off("click", userInput);
        $("#2").off("click", userInput);
        $("#3").off("click", userInput);
    }

    // Button to start the game; Clicking the button runs beginGame
    $("#start").on("click", beginGame);

    // Button to reset the game; Clicking the button runs resetGame
    $("#reset").on("click", resetGame);

})();