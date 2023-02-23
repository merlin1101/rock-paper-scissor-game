document.addEventListener('DOMContentLoaded', function(){
    var index, result, yourClass, computerClass;
    const eleArray = [];
    const eleArrayClass = [];

    var wrapper = document.querySelector('main #game-screen');
    var game = document.querySelector('main > #game');
    var pick = document.querySelector('main > #pick');
    var resultCont = document.querySelector('main > #result');
    var count = 0;
    var flag;

    // modal script
    var btn = document.getElementById("rules");
    var modal = document.getElementById("rules-cont");
    var span = document.querySelectorAll(".close");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.forEach(function(spn){
        spn.onclick = function() {
            modal.style.display = "none";
        }
    });
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        let scoreCookie = getCookie("score");
        if (scoreCookie != "") {
            document.querySelector('.score-value').innerHTML = scoreCookie;
            count = scoreCookie;
        } else {
            document.querySelector('.score-value').innerHTML = 0;
        }
    }

    function updateCookie(count) {
        setCookie("score", count, 365);
    }

    // Get child elements from Game section
    const childrenEle = game.children;

    function appendGame() {
        wrapper.appendChild(game);
    }

    function checkMatches(yourClass, computerClass)
    {
        var beatArray = [];
        if (yourClass  == computerClass) {
            return 'equal';
        }
        switch(yourClass) {
            case 'scissors':
                beatArray = ['lizard', 'paper'];
                break;
            case 'spock':
                beatArray = ['scissors', 'rock'];
                break;
            case 'paper':
                beatArray = ['rock', 'spock'];
                break;
            case 'lizard':
                beatArray = ['spock', 'paper'];
                break;
            default:
                beatArray = ['scissors', 'lizard'];
        }
        if(beatArray.includes(computerClass)) {
            return true;
        } else {
            return false;
        }
    }

    function whoWins(result)
    {
        var msg;
        if(result == 'equal') {
            flag = '2';
            msg = "It's a draw";
        } else if(result == true){
            count++;
            flag = '1';
            msg = 'You win';
        } else {
            if(count != 0) {
                count--;
            }
            flag = '0';
            msg = 'You lose';
        }
        
        document.querySelector('body.game-pick  #game-screen').style.maxWidth = '790px';
        
        if(flag == '1') {
            document.querySelector('#pick .you .selected').insertAdjacentHTML('afterbegin', '<span></span>');
        } else if(flag == '0') {
            document.querySelector('#pick .computer .selected').insertAdjacentHTML('afterbegin', '<span></span>');
        }
        
        document.querySelector('#result .who-wins').innerHTML = msg;
        document.querySelector('.score-value').innerHTML = count;

        updateCookie(count);

        wrapper.appendChild(resultCont);
    }

    // Pick the child
    for(let i = 0; i < childrenEle.length; i++)
    {
        eleArray[i] = childrenEle[i].innerHTML;
        eleArrayClass[i] = childrenEle[i].children[0].className;
        childrenEle[i].children[0].addEventListener('click', function()
        {
            index = Math.floor(Math.random() * 5);

            yourClass = childrenEle[i].children[0].className;
            computerClass = eleArrayClass[index];

            document.querySelector('main').appendChild(game);

            wrapper.appendChild(pick);

            document.querySelector('body').classList.add('game-pick');

            document.querySelector('#pick .you .selected').innerHTML = childrenEle[i].innerHTML;

            document.querySelector('#pick .computer .selected').innerHTML = "<div class='blank'><p></p></div>";

            setTimeout(function()
            {
                document.querySelector('#pick .computer .selected').innerHTML = eleArray[index];

                setTimeout(function(){
                    result = checkMatches(yourClass, computerClass);
                    whoWins(result);
                }, 1000);
            }, 1000);
        });
    }

    document.querySelector('#result .play-again').addEventListener('click', function()
    {
        document.querySelectorAll('#pick .selected').forEach(function(ele){
            ele.innerHTML = '';
        });
        
        document.querySelector('body.game-pick  #game-screen').style.maxWidth = '750px';
        
        document.querySelector('body').classList.remove('game-pick');

        document.querySelector('main').appendChild(pick);
        document.querySelector('main').appendChild(resultCont);
        appendGame();
    });

    document.querySelector('.reset').addEventListener('click', function() {
        count = 0;
        document.querySelector('.score-value').innerHTML = count;
        setCookie("score", count, 365);
    });
    
    appendGame();
    checkCookie();
});