/**
 * Created by Patrick on 11/2/16.
 */

    // _________    _______ _________ _______          _________
    // \__   __/   (  ____ \\__   __/(  ____ \|\     /|\__   __/
    //    ) (      | (    \/   ) (   | (    \/| )   ( |   ) (
    //    | |      | (__       | |   | |      | (___) |   | |
    //    | |      |  __)      | |   | | ____ |  ___  |   | |
    //    | |      | (         | |   | | \_  )| (   ) |   | |
    // ___) (___   | )      ___) (___| (___) || )   ( |   | |
    // \_______/   |/       \_______/(_______)|/     \|   )_(
    //  _______  _______  _______   _________          _______
    // (  ____ \(  ___  )(  ____ )  \__   __/|\     /|(  ____ \
    // | (    \/| (   ) || (    )|     ) (   | )   ( || (    \/
    // | (__    | |   | || (____)|     | |   | (___) || (__
    // |  __)   | |   | ||     __)     | |   |  ___  ||  __)
    // | (      | |   | || (\ (        | |   | (   ) || (
    // | )      | (___) || ) \ \__     | |   | )   ( || (____/\
    // |/       (_______)|/   \__/     )_(   |/     \|(_______/
    //           _______  _______  _______  _______  _
    // |\     /|(  ____ \(  ____ \(  ____ )(  ____ \( )
    // | )   ( || (    \/| (    \/| (    )|| (    \/| |
    // | |   | || (_____ | (__    | (____)|| (_____ | |
    // | |   | |(_____  )|  __)   |     __)(_____  )| |
    // | |   | |      ) || (      | (\ (         ) |(_)
    // | (___) |/\____) || (____/\| ) \ \__/\____) | _
    // (_______)\_______)(_______/|/   \__/\_______)(_)

(function()    {

    "use strict";

    // Global variables
    var buttons = $(".button"); // Assign elements with id ".button" to variable buttons
    var simonArray;             // Array that holds Simon's moves
    var userArray;              // Array that holds User's moves

    // Called by start button click listener at bottom to begin the game;
    // Empties Simon's array; Runs simonsMove
    function beginGame()    {
        simonArray = [];
        simonsMove();
    }

    // Simon's move; Empties User's array; Runs keepScore to output rounds completed
    // to "#screen"; Runs getRandom and playbackArray to select and display Simon's
    // move(s)
    function simonsMove()    {
        userArray = [];
        keepScore();
        getRandom();
        playbackArray();
    }

    // Gets random number from 0-3; Sets the random number as the index
    // of game buttons and stores in buttonActivated; Pushes id of the button
    // activated to Simon's array
    function getRandom()    {
        var random = Math.floor(Math.random() * 4);
        var buttonActivated = buttons[random];
        simonArray.push(buttonActivated.id);
    }

    // Plays back the array; Runs disableClick to disable User input during
    // playback; Sets playback interval to 1 second; Runs lightUp function
    // on the button id(s) stored in Simon's array; Clears interval when Simon's
    // array has been played back and runs enableClick to re-enable User input
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

    // Called by game button click listeners at bottom; Runs lightUp function
    // on the button activated; Pushes id of the button activated to User's array;
    // Runs compareArrays to compare User's array to Simon's array
    function userInput()    {
        lightUp($(this));
        userArray.push(this.id);
        compareArrays();
    }

    // Compares Simon's and User's arrays to determine if User input is correct;
    // For loop compares each index of User's array and Simon's array; If they
    // don't match gameOver is called to end the game; If indexes match and
    // are the same length simonsMove is called to continue the game
    function compareArrays()    {
        for (var i = 0; i < userArray.length; i++)    {
            if (simonArray[i] != userArray[i])    {
                gameOver();
                return;
            }
        }
        if (userArray.length == simonArray.length)    {
            simonsMove();
        }
    }

    // Keeps track of rounds completed successfully and outputs to "#screen"
    function keepScore()    {
        $("#screen").text(simonArray.length);
    }

    // Applies class "lightup" for .25 seconds to the game buttons when called by
    // either User or Simon
    function lightUp(button)    {
        button.addClass("lightup");
        setTimeout(function()    {
            button.removeClass("lightup");
        }, 200);
    }

    // Called when User's array and Simon's array don't match; Confirms game is
    // over, displays score, and prompts the User if they'd like to try again; If
    // they agree, run beginGame after a .5 second delay; Otherwise reload the page
    // to reset the game
    function gameOver()    {
        setTimeout(function()    {
            var tryAgain = confirm("Game over man! Your score was " + ((simonArray.length) - 1) + ". Try again?");
            if (tryAgain)    {
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
        $("#0").off("click");
        $("#1").off("click");
        $("#2").off("click");
        $("#3").off("click");
    }

    // Button to start the game; Clicking the button runs beginGame
    $("#start").on("click", beginGame);

    // Button to reset the game; Clicking the button runs resetGame
    $("#reset").on("click", resetGame);

})();