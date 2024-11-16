
//--------------------------------------הבאת כל המשתנים הנצרכים במשחק--------------------------------------------------
const player = document.querySelectorAll(".player")
const cube = document.querySelector(".cube")
const playerBoard = document.querySelector(".playerBoard")
const oraotPlay = document.querySelector(".oraotPlay")
const btnOraotPlay = document.querySelector(".btnOraotPlay")
const qustion = document.querySelector(".question")
const q = document.querySelector(".q")
const h1Q = document.querySelector(".question h1")
const pQ = document.querySelector(".question p")
const inputQ = document.querySelector(".question input")
const gameOver = document.querySelector(".gameOver")
const gameOverA = document.querySelector(".gameOver a")
const timer = document.querySelector(".timer")
const btnQ = document.querySelector(".question button")
const menu = document.querySelector(".menu")
const inMenu = document.querySelector(".inMenu")
const imgInMenu = document.querySelector(".inMenu .img")
const win = document.querySelector(".win")
const lose = document.querySelector(".lose")
const playerN = document.querySelector(".playerN")
const ifDidntArived=document.querySelector(".ifDidntArived")
const showWereItsHaveToBe=document.querySelector(".showWereItsHaveToBe")
const newPlayBtn=document.querySelector(".button")


//-------------------------------------הבאת סאונדים לשימוש במשחק----------------------------------------------------------
//סאונד בעת זריקת קוביה
const soundCube = new Audio("sound/soundKube.mp3")
const soundLose = new Audio("sound/soundLos.mp3")
const soundWin = new Audio("sound/soundWin.mp3")
const soundGoing = new Audio("sound/soundGoing.wav")//קולות להשמיע בעת הזזת החייל
const soundAnswer=new Audio("sound/soundAnswer.mp3")
// const dontArived=new Audio("sound/dontArived.wav")


//------------------------------------הגדרת משתנים----------------------------------------------------------------------
const arrQuestions = [//אתחול מערך השאלות
    { question1: "?מתי פרצה השואה", א: "1936", ב: "4567", answer: "א" },
    { question1: "?מהו עיר הבירה של ברזיל", א: "ריו-די-זנירו", ב: "סאן פאולו", answer: "א" },
    { question1: "?כמה רגלים יש בשנה", א: "3", ב: "2", answer: "א" },
    { question1: "?היכן קבור ר' מאיר בעל הנס", א: "טבריה", ב: "צפת", answer: "א" },
    { question1: "?באיזה תקופה חי דון יצחק אברבנאל", א: "גירוש ספרד", ב: "ת''ח-ת''ט", answer: "א" },
    { question1: "?מי חיבר את הספר: חכמת שלמה", א: "ר' שלמה קלוגר", ב: "ר'שלמה אלקבץ", answer: "א" },
    { question1: "?היכן ממקום מושב שתולים", א: "דרום הארץ", ב: "גליל עליון", answer: "א" },
    { question1: "?כמה תלמידים היו לר' אלימלך מליז'ענסק", א: "4", ב: "2", answer: "א" },
    { question1: "?מתי פרצה השואה", א: "1945", ב: "4567", answer: "א" }]
let flag = false//flag לבדיקה כל עוד המשחק לא נגמר
//איפוס החייל איפה שהוא אמור לעמוד
let move = 2//איפה החייל אמור מתחיל ב- left
let moveUp = 65//איפוס החייל שיעמוד במיקום 65+vh בטופ
let beforeMP//משתנה  שמראה איפה שהחייל עמד ב לעפט לפני זריקת הקוביה
let beforeUp //משתנה שמראה איפה שהחייל עמד ב לעפט לפני זריקת הקוביה
let minit = 5//אתחול הדקות בטיימר - שווה ל-5
let second =0//אתחול השניות בטיימר שווה ל-0
let countCube = 0//אתחול הערך שנזרק בקוביה ל-0
let flagQuestion = true//הדלקת דגל השאלה - בנתיים השחקן עדיין לא אמור לענות על שאילה
let numQ//משתנה שמיועד להכיל את המספר המוגרל לבחירת השאילה ממערך השאלות
let flagCube = true//אתחול דגל השאלה שיהיה לדלוק שאומר שמותר לזרוק את הקוביה
let color = false//אתחול משתנה לצבע הקוביה - כדי שיזהו מתי נזרק מתחלף כל פעם צבעו  דלוק ונכבה כל פעם 
let cubeHaveToBeM//משתנה שמראה כל הזמן איפה אמור בעצם החייל לעמוד בלעפט
let cubeHaveToBeU//משתנה שמראה כל הזמן איפה אמור בעצם החייל לעמוד בטופ


//----------------------------------------הבאת המשתנים מהלוקל סטורייג'-------------------------------------------
let usersArr = JSON.parse(localStorage.getItem("userArr"))||[]
let current = JSON.parse(localStorage.getItem("current"))||{}
playerN.textContent = current.name
win.textContent = "ניצחונות:" + current.win
lose.textContent = "אבודים:" + current.lose
//----------------------------------פונקציה 1-----------------------------------------------------------------------------
//פונקציה 1 : כאשר לוחצים על כפתור תחילת משחק יורד הוראות המשחק ואפשר להתחיל לשחק---------------------------
btnOraotPlay.addEventListener("click", e => {
    oraotPlay.style.display = "none"
    flag = true
})
//-------------------------------פונקציה 2-------------------------------------------------------------------------------
//--------------------------פונקציה להזזת החייל-------------------------------------------------------------------------
document.addEventListener("keydown", e => {
    if (flag === true) {
        soundGoing.play()
        //כאשר לוחצים על החץ הימני
        if (e.key === 'ArrowRight') {
            if (move < 65) {
                move += 7
                playerBoard.style.left = move + "vw"
            }
        }
        //כאשר לוחצים על החץ השמאלי
        else if (e.key === 'ArrowLeft') {
            if (move > 2)
                move -= 7
            playerBoard.style.left = move + "vw"
        }
        //כאשר לוחצים על החץ למעלה
        else if (e.key === 'ArrowUp') {
            if (moveUp > 5)
                moveUp -= 7.5
            else if (moveUp <= 5 && moveUp > 2)
                moveUp -= 3.5
            playerBoard.style.top = moveUp + "vh"
        }
        //
        else if (e.key === 'ArrowDown') {
            if (moveUp === 1.5)
                moveUp = 5
            else if (moveUp < 65)
                moveUp += 7.5
            playerBoard.style.top = moveUp + "vh"
        }


    //המשחק נגמר אם הגיע למאה וניצחון עולה באחד
    winPlay()}
    //בדיקה האם החייל עומד במקום שהוא אמור לעמוד
    if (move === cubeHaveToBeM && cubeHaveToBeU === moveUp) {
        //אם  החייל עומד במקום, דגל הקוביה נדלק ואפשר לזרוק את הקוביה
        flagCube = true
    }
    //כל עוד השחקן לא הגיע למקום עדיין אי אפשר לזרוק את הקוביה - הדגל כבוי
    else flagCube = false
})
//------------------------------פונקציה 3---------------------------------------------------------------------------------
//-------------------------בדיקה האם הגיע למאה- לניצחון-----------------------------------------------------------------
const winPlay = () => {
    //אם עומד במקום של ה-100 וגם הוא אמור לעמוד שם בעדם הוא הגיע לניצחון
    if (cubeHaveToBeM === 2 && move === 2 && moveUp === 1.5 && cubeHaveToBeU === 1.5) {
        //שם את הקלאס של המשחק נגמר ומכבה את הדגל שלא יוכלו להזיז את החייל
        gameOver.style.display = "flex"
        newPlayBtn.style.display="block"
        gameOverA.style.display="flex"
        ifDidntArived.style.display="none"
        showWereItsHaveToBe.style.display="none"
        flag = false
        //העלאת הניצחון ב-1 בעיקרון היה אפשר לעדכן רק אחד משניהם ואז 
        //לעשות שאחד משניהם שווה למעודכן אבל העדפתי לעשות ככה בגלל שבשבילי זה יותר מסודר
        current.win++
        usersArr[current.index].win = usersArr[current.index].win + 1
        win.textContent = "ניצחונות:" + current.win
        //השמעת קול ניצחון
        soundWin.play()
        //קלאס להזזת החייל לאמצע והגדלתו
        playerBoard.classList.add("end2")
        //שמירה בלוקל סטורייג'
        localStorage.setItem("userArr", JSON.stringify(usersArr))
        //שמירה בלוקל סטורייג' 
        //  כדי שכל הניצחונות יופיעו גם כאשר מרעננים את הדף
        localStorage.setItem("current", JSON.stringify(current))
    }
}


//--------------------------------פונקציה 4------------------------------------------------------------------------
//---------------------------------בחירת חייל----------------------------------------------------------------------
player.forEach(e => {
    e.addEventListener("click", el => {
        if (flag)
            playerBoard.style.backgroundImage = `url(${e.src})`;
    })
})
//---------------------------------פונקציה 5----------------------------------------------------------------------
//----------------------------------timer-----------------------------------------------------------------------
//טיימר לכל שניה
const everySeconds = () => {
    //עצירת המשחק אם עבר הזמן והוספת כשלון לשחקן הנוכחי
    if (((minit <= 0 && second === 0) || minit < 0) && flag) {
        soundLose.play()
        //מוסיף את הקלאס של הזמן עבר ומכבה את הדגל שלא יהיה אפשרות לשחק לאחר גמר המשחק
        playerBoard.classList.add("end")
        timer.textContent = "0:00"
        gameOver.style.display = "flex"
        newPlayBtn.style.display="block"
        gameOverA.style.display="flex"
        ifDidntArived.style.display="none"
        showWereItsHaveToBe.style.display="none"
        flag = false
        //הוספת כשלון
        current.lose++
        lose.textContent = "אבודים:" + current.lose
        usersArr[current.index].lose = usersArr[current.index].lose + 1
        //שמירה בלוקל סטורייג'
        localStorage.setItem("userArr", JSON.stringify(usersArr))
        localStorage.setItem("current", JSON.stringify(current))
        flag = false
    }
    else {
        //אם לא נגמר הזמן יורד כל הזמן שניה אחת
        if (flag === true) {
            if (second === 0) {
                second = 59
                minit--
            }
            else
                second--
            if (second > 9)
                timer.textContent = minit + ":" + second
            else
                timer.textContent = minit + ":0" + second

        }
    }
}
//--------------------------------------------- 6 פונקציה לכל שניה-------------------------------------------------
const intervaltime = setInterval(everySeconds, 1000)

//------------------------------------------------פונקציה 7------------------------------------------------------------------
//----------------------------------------------זריקת קוביה----------------------------------------------------------------
cube.addEventListener("click", e => {
    showWereItsHaveToBe.style.display="block"

    //כל עוד שהחייל לא עומד במקום שלו דגל הקוביה כבוי ואין אפשרות לזרוק את הקוביה
    if (flagCube === false) {
        //מראה שעדיין לא הגיע השחקן ליעד
        ifDidntArived.textContent="עדיין לא הגעת ליעדך"
        // dontArived.play()
        ifDidntArived.style.display="block"
    }
    //אם השחקן הגיע לסימן שאילה הוא אמור להרים קלף שאילה - ואז דגל השאלה נכבה, וכל עוד שהוא לא הרים את הקלף הדגל כבוי ואין אפשרות 
    //לזרוק את הקוביה
    if (flagQuestion === false)
    ifDidntArived.textContent="הנך צריך להרים קלף שאלה"
    ifDidntArived.style.display="block"
    //אם השחקן לחץ על תחילת משחק -הדגל דלוק וגם הוא לא אמור להרים קלף , וגם הגיע למיקום שהוא אמור לעמוד אפשר לזרוק את הקוביה 
    if (flagCube === true && flagQuestion === true && flag) {
        ifDidntArived.style.display="none"
        //אתחול המשתנה איפה שהחייל עמד ב לעפט לפני זריקת הקוביה
        beforeMP = move
        //אתחול המשתנה איפה שהחייל עמד ב טופ לפני זריקת הקוביה
        beforeUp = moveUp
        //הגרלת מספר שיוצג בקוביה מ1-עד 6
        countCube = Math.floor((Math.random()) * 6) + 1
        //סאונד כאשר זורקים את הקוביה
        soundCube.play()
        //לאחר כל זריקה מתחלף הצבע של הקוביה כדי שיזהו שהקוביה נזרקה
        if (!color) {
            cube.style.backgroundColor = "#ed1474"
            color = true
        }
        else {
            cube.style.backgroundColor = "#3eadccf2"
            color = false
        }
        //הצגת המספר המוגרל בקוביה במשחק
        cube.textContent = countCube
        //לאחר שהקוביה נזרקה הדגל - קוביה נכבה עד שהוא יגיע למקומו
        flagCube = false
    }
    //הבאת פונקציה לבדיקה האם החייל זז בצורה נכונה 
    checkIfMoveCorrect()

})

//------------------------------------------------פונקציה 8----------------------------------------------------------
//---------------------------------------------------הגרלת שאלות שיהיו כתובים בקלפי שאילה

q.addEventListener("click", e => {
    //אם המשתמש משחק, והוא הגיע לסימן שאלה
    if (flag && flagQuestion === false) {
        //מגריל מספר - המספר המוגרל המשתמש יצטרך לענות על שאילה במערך מהאינדקס הזה
        numQ = Math.floor((Math.random()) * 8)
        //ממלא את התוכן של קלף השאילה
        h1Q.textContent = arrQuestions[numQ].question1
        pQ.textContent = "א." + arrQuestions[numQ].א + " ב." + arrQuestions[numQ].ב
        inputQ.value = ""
        console.log(inputQ);
        qustion.style.display = "flex"
        //לאחר שהשחקן הרים את הקלף הדגל שאילה נדלק- ואפשר להמשיך לשחק
        flagQuestion = true
    }
})
//------------------------------------------------פונקציה 9----------------------------------------------------------
//------------------------------------------------בדיקת נכונות התשובה------------------------------------------------
//בדיקה האם התשובה שהתקבלה נכונה ונתינת ניקוד
//אם התשובה נכונה הזמן עולה בדקה ואם לא נכונה הזמן יורד
btnQ.addEventListener("click", e => {
    if (inputQ.value === arrQuestions[numQ].answer)
     {   minit += 1
        ifDidntArived.textContent="!יופי, תשובה נכונה"
    }
    else
      {  minit -= 1
    ifDidntArived.textContent=`אופס... התשובה הנכונה היא: ${arrQuestions[numQ].answer}`}
    ifDidntArived.style.display="block"
    soundAnswer.play()
    qustion.style.display = "none"
})


//---------------------------------------------פונקציה 10----------------------------------------------------------
//-----------------------------בדיקה האם השחקן הגיע למקום של סימן שאלה ואם כן בדיקה האם נכנס לשם---------------------
const checkIfArrivedToQuestion = () => {
    if (cubeHaveToBeM === 2 && cubeHaveToBeU === 57.5)
        flagQuestion = false
    else if (cubeHaveToBeM === 65 && cubeHaveToBeU === 1.5)
        flagQuestion = false
    else if (cubeHaveToBeM === 58 && cubeHaveToBeU === 42.5)
        flagQuestion = false
    else if (cubeHaveToBeM === 37 && cubeHaveToBeU === 5)
        flagQuestion = false
}


//------------------------------------------פונקציה 11--------------------------------------------------------------
//-------------------בדיקה האם השחקן התקדם לפי ההוראות ואם כן הרשאה לזריקת קוביה--------------------------------
const checkIfMoveCorrect = () => {
    cubeHaveToBeM = beforeMP
    cubeHaveToBeU = beforeUp
    if (beforeUp % 1 === 0) {
        if ((countCube * 7 + beforeMP) <= 65)
            cubeHaveToBeM = countCube * 7 + beforeMP
        else {
            ((countCube = countCube - Math.floor(65 - beforeMP) / 7))
            cubeHaveToBeU = beforeUp - 7.5
            cubeHaveToBeM = 65 - (7 * (countCube - 1))
        }
    }
    else
        if (beforeUp === 1.5 && beforeMP - (countCube * 7) < 2) {
            countCube = countCube - Math.floor(beforeMP / 7)
            cubeHaveToBeM = (countCube) * 7 + 2
        }
        else if ((beforeMP - (countCube * 7)) >= 2)
            cubeHaveToBeM = beforeMP - (countCube * 7)
        else {
            countCube = countCube - Math.floor((beforeMP - 2) / 7)
            cubeHaveToBeU = cubeHaveToBeU - 7.5
            cubeHaveToBeM = 2 + (countCube - 1) * 7
        }
    moveP()
    if (cubeHaveToBeU === -2.5)
        cubeHaveToBeU = 1.5
    checkIfArrivedToQuestion()
    showWereItsHaveToBe.style.top=cubeHaveToBeU+"vh"
   showWereItsHaveToBe.style.left=cubeHaveToBeM+"vw"
}
//-------------------------------------------------------פונקציה 12-------------------------------------------------------------
//---------------------------------------------הזזות לפי הסולמות והחבלים-----------------------------------------------
const moveP = () => {
    if (cubeHaveToBeM === 30 && cubeHaveToBeU === 57.5) {
        cubeHaveToBeM = 30
        cubeHaveToBeU = 35
    }
    else if (cubeHaveToBeM === 51 && cubeHaveToBeU === 57.5) {
        cubeHaveToBeM = 44
        cubeHaveToBeU = 35
    }
    else if (cubeHaveToBeM === 65 && cubeHaveToBeU === 20) {
        cubeHaveToBeM = 65
        cubeHaveToBeU = 57.5
    }
    else if (cubeHaveToBeM === 16 && cubeHaveToBeU === 42.5) {
        cubeHaveToBeM = 23
        cubeHaveToBeU = 12.5
    }
    else if (cubeHaveToBeM === 37 && cubeHaveToBeU === 27.5) {
        cubeHaveToBeM = 30
        cubeHaveToBeU = 20
    }
    else if (cubeHaveToBeM === 2 && cubeHaveToBeU === 20) {
        cubeHaveToBeM = 9
        cubeHaveToBeU = 50
    }
    else if (cubeHaveToBeM === 2 && cubeHaveToBeU === 35) {
        cubeHaveToBeM = 9
        cubeHaveToBeU = 27.5
    }
    else if (cubeHaveToBeM === 51 && cubeHaveToBeU === 5) {
        cubeHaveToBeM = 51
        cubeHaveToBeU = 27.5
    }
    else if (cubeHaveToBeM === 16 && cubeHaveToBeU === 1.5) {
        cubeHaveToBeM = 16
        cubeHaveToBeU = 12.5
    }
    else if (cubeHaveToBeM === 58 && cubeHaveToBeU === 12.5) {
        cubeHaveToBeM = 58
        cubeHaveToBeU = 5
    }
    else if (cubeHaveToBeM === 30 && cubeHaveToBeU === 5) {
        cubeHaveToBeM = 30
        cubeHaveToBeU = 1.5
    }
}
//-----------------------------------------------פונקציה 15---------------------------------------------------
//----------------------------------------------משחק חדש----------------------------------------------------
newPlayBtn.addEventListener("click",e=>{
    move=2
    moveUp=65
    cubeHaveToBeM=2
    cubeHaveToBeU=65
    showWereItsHaveToBe.style.top=cubeHaveToBeU+"vh"
    showWereItsHaveToBe.style.left=cubeHaveToBeM+"vw"
    cube.textContent="קוביה"
    playerBoard.style.top=moveUp+"vh"
    playerBoard.style.left=move+"vw"
    flag=true
    gameOver.style.display="none"
    minit=5
    second=0
    playerBoard.classList.add("endBack")
    playerBoard.classList.remove("end")
    playerBoard.classList.remove("end2")
    newPlayBtn.style.display="none"

})



