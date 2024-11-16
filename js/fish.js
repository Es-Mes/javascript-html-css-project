//--------------------------הבאת המשתנים--------------------------------
const btnInstructions = document.querySelector(".instructions button")
const instruction = document.querySelector(".instructions")
const catchPlayer = document.querySelector(".catch")
const gameOver = document.querySelector(".gameOver")//אם הדגים נגמרו המשחק נגמר הבאת קלאס לגמר המשחק
const round = document.querySelectorAll(".one,.two,.three,.four")
const menu = document.querySelector(".menu")
const inMenu = document.querySelector(".inMenu")
const imgInMenu = document.querySelector(".inMenu .img")
const mark = document.querySelector("aside p")
const timer = document.querySelector(".timer")
//-------------------------הגדרת משתנים----------------------------------------
let flag = false
flagPlay=false
let count = 0
flagWinround = false
let move = 82
let moveUp = 40
let arrFish = [{ flag: true }, { flag: true }, { flag: true }//מערך של כל הדגים
    , { flag: true }, { flag: true }, { flag: true }, { flag: true }, { flag: true }, { flag: true }, { flag: true }, { flag: true }, { flag: true }]
let flagThereIsFish = true
let flagFish = false//הגדרה האם השחקן תפס את הדג
//----------------------------------------הבאת המשתנים מהלוקל סטורייג'-------------------------------------------
let usersArr = JSON.parse(localStorage.getItem("userArr"))||[]
let current = JSON.parse(localStorage.getItem("current"))||{}
//----------------------------------------סאונדים-----------------------------------------------------
const soundWater = new Audio("sound/soundWater.mp3")
const soundWin = new Audio("sound/soundWin.mp3")

//-------------------------------------פונקציה 1----------------------------------
//----------------אירוע לחיצה כאשר לוחצים על כפתור תחילת משחק--------------------
btnInstructions.addEventListener("click", e => {
    instruction.style.display = "none"
    flagPlay=true
})
//-------------------------------------פונקציה 2 ------------------------------------
//--------------------------בדיקה האם נשארו דגים לתפיסה
const look = () => {
    let i = 0
    for (i = 0; i < round.length && arrFish[i].flag != true; i++);
    if (i === round.length) {
        flagThereIsFish = false
        flagPlay=false
        gameOver.style.display = "flex"
        if(count>40){
            current.win++
            usersArr[current.index].win = usersArr[current.index].win + 1
            //השמעת קול ניצחון
            soundWin.play()
            //שמירה בלוקל סטורייג'
            localStorage.setItem("userArr", JSON.stringify(usersArr))
            //שמירה בלוקל סטורייג' 
            //  כדי שכל הניצחונות יופיעו גם כאשר מרעננים את הדף
            localStorage.setItem("current", JSON.stringify(current))
            alert(`ניצחת! מספר הניצחונות שלך בכלל המשחקי הוא: ${current.win}`)
        }
    }

}

//----------------------------------- 3פונקציה ---------------------------------------------------------
//---------------------------------פונקציה לבחירת דג שצריך לתפוס-----------------------------------------
let numFish = 0
const funcChooseFish = ((e) => {
    look()
    if (flagThereIsFish&&flagPlay) {
        //הגרלת דג להבהוב
        let num = round.length

        let numArr = Math.floor((Math.random()) * num)
        numFish = numArr

        while (true) {
            if (arrFish[numFish].flag)
                break
            numArr = Math.floor((Math.random()) * num)
            numFish = numArr
        }
        arrFish[numFish].flag = false
        round[numFish].classList.add("choose")
    }
})
funcChooseFish()
//------------------------------פונקציה 4--------------------------------------------
document.addEventListener("keydown", e => {
    if(flagPlay)
   { soundWater.play()
    //כאשר לוחצים על החץ הימני
    if (e.key === 'ArrowRight') {
        if (move < 80) {
            move += 3
            if (flagFish)
                console.log(flagFish);
            console.log(numFish);
            if (flagFish)
                round[numFish].style.left = move + "vw"
            catchPlayer.style.left = move + "vw"
            console.log("move" + move);
            console.log("moveup" + moveUp);
        }
    }
    //כאשר לוחצים על החץ השמאלי
    else if (e.key === 'ArrowLeft') {
        if (move > 5)
            move -= 3
        if (flagFish)
            round[numFish].style.left = move + "vw"
        catchPlayer.style.left = move + "vw"
        console.log("move" + move);
        console.log("moveup" + moveUp);
    }
    //כאשר לוחצים על החץ למעלה
    else if (e.key === 'ArrowUp') {
        if (moveUp > 6)
            moveUp -= 3
        if (flagFish)
            round[numFish].style.top = moveUp - 16 + "vh"
        catchPlayer.style.top = moveUp + "vh"
        console.log("move" + move);
        console.log("moveup" + moveUp);
    }
    //
    else if (e.key === 'ArrowDown') {

        if (moveUp < 85)
            moveUp += 3
        if (flagFish)
            round[numFish].style.top = moveUp - 16 + "vh"
        catchPlayer.style.top = moveUp + "vh"
        console.log("move" + move);
        console.log("moveup" + moveUp);
    }
    console.log(move + "asdf");
    console.log(round[numFish].style.left + "111asdf");
    if (move >= 79 && flagFish && moveUp > 39 && moveUp < 49) {
        flagFish = false
        flagWinround = true
        round[numFish].classList.remove("choose")}
    }
})


mark.textContent = `ניקודך בינתיים הוא: ${count}`
//-----------------------------------פונקציה 5-------------------------------------------
//-----------------------------------טיימר-----------------------------------------------------
const timer1 = document.querySelector(".timer")
let second = 10
const everySeconds = () => {
    //עצירת המשחק אם עבר הזמן והוספת כשלון לשחקן הנוכחי
    if(flagPlay)
 {   if (second === 0 || flagWinround) {
        second = 10
        if (flagWinround) {
            count = count + 5
            mark.textContent = `כל הכבוד! ניקודך בינתיים הוא: ${count}`
        }
        else {
            round[numFish].classList.add("loseFish")
            console.log(round[numFish]);
            count = count - 5
            mark.textContent = `חבל! ניקודך בינתיים הוא ${count}`
        }
        flagWinround = false
        funcChooseFish()
    }
    else {
        second--
        if (second > 9)
            timer.textContent = "00" + ":" + second
        else
            timer.textContent = "00" + ":0" + second}

    }
}
const intervaltime = setInterval(everySeconds, 1000)

//-------------------------------------------פונקציה 6-------------------------------------------------
//------------------------------------------------------------אירוע לחיצה בעת לחיצה על דג-----------------------
round.forEach(fish => {
    fish.addEventListener("click", e => {
        let position = fish.getBoundingClientRect()
        let left = (position.left / window.innerWidth) * 100;
        let top = (position.top / window.innerHeight) * 100;
        round[numFish].style.position = "absolute"
        fish.style.top = top + "vh";
        fish.style.left = left + "vw"
        console.log(fish);
        console.log(`Left: ${left}vw`);
        console.log(`Top: ${top}vh`);
        round[numFish].style.left = (arrFish[numFish].left + 5) + "vw"
        round[numFish].style.top = (arrFish[numFish].tot + 5) + "vw"


        flagFish = true
    })
})
