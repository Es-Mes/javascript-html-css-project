//--------------------------------------הבאת כל המשתנים הנצרכים במשחק--------------------------------------------------
const nekudot = document.querySelector("section")//הבאת הערך שמכיל את מספר הנקודות של השחקן
const round = document.querySelectorAll(".round")
const play = document.querySelector(".play")
const nav = document.querySelector("nav")
const header = document.querySelector("header")
const win = document.querySelector(".win")
const lose = document.querySelector(".lose")
const playerN = document.querySelector(".playerN")
//----------------------------------הגדרת משתנים לסאונד------------------------------------------------------
const soundGuise = new Audio("sound/soundGoing.wav")//השמעת סאונד בעת בחירה
const guiseRight=new Audio("sound/winMemory.wav")
const  winMemory = new Audio("sound/soundWin.mp3")//השמעת סאונד בעת בחירת שתי קלפים זהים
//-------------------------------------הגדרת משתנים---------------------------------------------------------
let count = 0
let flag1 = 0, flag2 = 0;
let class1 = 0, class2 = 0, e1, e2;
//----------------------------------יבוא מערך המשחקים מהלוקל סטור'ג -----------------------------------------
let usersArr = JSON.parse(localStorage.getItem("userArr"))||[]
let current = JSON.parse(localStorage.getItem("current"))||{}
//---------------------------------כתיבת מספר הניצחונות והאבודים בלוח ----------------------------------------------
playerN.textContent = current.name
win.textContent = "ניצחונות:" + current.win
lose.textContent = "אבודים:" + current.lose
//--------------------------------------פונקציה 1----------------------------------------------------------------
//------------------------------כאשר השחקן לוחץ על תחילת משחק-----------------------------------------------------------
play.addEventListener("click", e => {
    //כאשר מתחילים לשחק שם השחקן והנקודות יורדות מהלוח
    nekudot.style.display = "none"
    nav.style.display = "flex"
    play.style.display = "none"
})
//--------------------------------------פונקציה2---------------------------------------------------------------
//----------------------------------פונקציה שמראה מה יש בכל קלף ובודקת האם הם סטים------------------------------
round.forEach(e => {
    e.addEventListener("click", (z => {
        soundGuise.play()
        if (flag1 && flag2) {
            e2.classList.add("round")
            e1.classList.add("round")
            flag1 = 0; flag2 = 0;
        }
        //אם עדיין לא הרימו כרטיס וגם הכרטיס שהרימו עדיין לא נלקח- לא מצאו את הסט שלו
        if (!flag1 && e.classList[1] != "set") {

            e.classList.remove("round")
            e1 = e
            flag1 = 1
            class1 = e.classList
        }
        //אם עדיין לא הרימו כרטיס  שני וגם הכרטיס שהרימו עדיין לא נלקח- לא מצאו את הסט שלו
        //שלא יהיה ניתן לבחור פעמיים את אותו קלף
        else if (!flag2 && e1 != e && e.classList[1] != "set") {
            e.classList.remove("round")
            e2 = e
            flag2 = 1;
            class2 = e.classList
        }
        //אם הרימו שתי כרטיסים והקלאסים שלהם שווים -זהו סט
        if (flag1 && flag2)
            if (`${class1}` === `${class2}`) {
                guiseRight.play()
                e2.classList.add("set")
                e1.classList.add("set")
                //מספר הסטים עולה באחד
                count++
                //מוסיפים קלאס לשתי הקלפים שיש בו סימן של ווי
                e.textContent="x"
                e1.textContent="x"

                //מכבים את הדגלים שיהיה נתן לבחור שוב
                flag1 = 0; flag2 = 0;
            }
        //אם הרימו כבר 6 סטים המשחק הסתיים וניצחון עולה באחד
        if (count === 6) {
            current.win++
            winMemory.play()
            usersArr[current.index].win = usersArr[current.index].win + 1
            //מה שיהיה כתוב לאחר גמר המשחק
            win.textContent = "ניצחונות:" + current.win
            nekudot.style.position = "absolute"
            nekudot.style.top = "50%"
            nekudot.style.position = "absolute"
            nekudot.style.background = " rgba(236, 94, 227, 0.87)";
            nekudot.style.display = "block"
            nekudot.style.borderRadius = "10%"
            //שמירה בלוקל סטורייג' 
            //  כדי שכל הניצחונות יופיעו גם כאשר מרעננים את הדף
            localStorage.setItem("current", JSON.stringify(current))
        }
    }))
});

//שמירה בלוקל סטורייג'
localStorage.setItem("userArr", JSON.stringify(usersArr))
const menu = document.querySelector(".menu")
const inMenu = document.querySelector(".inMenu")
const imgInMenu = document.querySelector(".inMenu img")
