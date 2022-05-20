fetchText()
checkLocal()
var count = 1;
question_Num(count)
var correctcount = 0;
async function fetchText() {
    let response = await fetch('https://restcountries.com/v3.1/all');
    let data = await response.json();
    let question_countries = r4Counrty(data)
    let question_flag = r1Country(question_countries)
    question_countries.forEach(item => {
        ChoiseList.innerHTML += `
        <li>${item.name.common}</li>
        
        `
    })
    QuestionFlag.innerHTML = `
    <img src="${question_flag.flags.png}" alt="">
    `
    check(question_flag)
}

function check(flag) {
    $('li').click(function() {
        if (this.textContent == flag.name.common) {
            Swal.fire(
                'Good job!',
                'You made the right choice',
                'success'
            )
            count++;
            correctcount++;
            Correctanswer.innerHTML = correctcount;
        } else {
            $(this).addClass('false')
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'This flag is not the country of your choice'
            })
            count++;

        }
        ChoiseList.innerHTML = ""
        question_Num(count)
        fetchText()
    })
}

function question_Num(count) {
    QustionNum.innerHTML = `${count}`
    console.log(count)
}

function r4Counrty(items) {
    let newArr = []
    for (let i = 0; i < 4; i++) {
        newArr.push(items[Math.floor(Math.random() * items.length)])
    }
    return newArr
}

function r1Country(items) {
    return items[Math.floor(Math.random() * items.length)];
}


$('#Start').click(function() {
    var testTime = $('#time').val();
    var questionCount = $('#questioncount').val();
    if (testTime != 0 || questionCount != 0) {
        $('.Page1').css("display", "none")
        $('.Page2').css("display", "block")
        countdown("Timer", testTime, 0);
    } else
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Include time and number of questions!',
        })
    check(flag, questionCount, testTime)
})



function countdown(elementName, minutes, seconds) {
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer() {
        msLeft = endTime - (+new Date);
        if (msLeft < 1000) {
            element.innerHTML = "Time is up!";
            $('.Page2').css("display", "none")
            $('.Page3').css("display", "flex")
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }

    element = document.getElementById(elementName);
    endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
}

function checkLocal() {
    if (!localStorage.getItem("DbUser")) {
        localStorage.setItem("DbUser", JSON.stringify([]))
    } else {
        return;
    }
}