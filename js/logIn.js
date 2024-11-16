//--------------------------------------הבאת כל המשתנים הנצרכים במשחק--------------------------------------------------
const ifItsNotValid = document.querySelector(".ifItsNotValid")
const password = document.querySelector(".password")
const name1 = document.querySelector(".name")
const btn = document.querySelector(".enter")

//-----------------------------------------הבאת הנתונים מהלוקל סטורייג--------------------------------------
const usersArr = JSON.parse(localStorage.getItem("userArr")) || []
//------------------------------------------הגדרת משתנים----------------------------------------------------
let current = {}
//------------------------------------------פונקציה 1---------------------------------------------------------
//-----------------------------------------בודק האם המשתמש רשום במערכת-----------------------------------
btn.addEventListener(("click"), a => {
    //אם אחד מהערכים ריקים
    if (password.value === "" || name1.value === "")
        ifItsNotValid.textContent = "אחד מהערכים ריקים"
    else {
        let i
        //לולאה העוברת על המערך ובודקת האם יש משתמש רשום עם אותם פרטים כמו של השחקן הנוכחי
        for (i = 0; i < usersArr.length && ((usersArr[i].name != name1.value) || (usersArr[i].kod != password.value)); i++);
        if (i === usersArr.length) {
            //אם אין השחקן מועבר לדף הרישום
            ifItsNotValid.textContent = "אינך רשום במערכת! הנך מעבר לדף הרישום"
            window.location.href = "form.html";
        }
        else {
            //אם השחקן כבר רשום הוא מועבר לדף האפליקציות-המשחקים
            window.location.href = "aplications.html";
            //שמירת הנתונים בלוקל סטורייג' 
            current = { name: name1.value, lose: usersArr[i].lose || 0, win: usersArr[i].win || 0, index: i }
            localStorage.setItem("current", JSON.stringify(current))
        }
    }
})

