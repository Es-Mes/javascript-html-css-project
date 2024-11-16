//--------------------------------------הבאת כל המשתנים הנצרכים במשחק--------------------------------------------------
const Email=document.getElementById("email")
const btn=document.querySelector("#btn")
const sisma=document.querySelector("#sisma")
const f_name=document.getElementById("f_name")
const phone=document.getElementById("tel")
const ifItsNotValid=document.querySelector(".ifItsNotValid")
//---------------------------------------הגדרת משתנים----------------------------------------------------------
let mailFlag=false
//----------------------------------------הבאת המשתנים מהלוקל סטורייג'--------------------------------------------------
const usersArr=JSON.parse(localStorage.getItem("userArr"))||[]
//---------------------------------------פונקציה 1------------------------------------------------------------------
// ----------------------------------------------בודק האם המייל תקין------------------------------------------------
//במסמך זה בדיקת התקינות הוא שכל הערכים מלאים ובמספר מייל מופיע  @ באמצע המילה
Email.addEventListener(("keydown"),e=>{
    if(Email.value.indexOf("@")>-1)
mailFlag=true
console.log(mailFlag);
})
//------------------------------------פונקציה 2------------------------------------------------------------------
//--------------------------------בודק האם כבר מופיע במערך הנרשמים אם לא מוסיף למערך-------------------------
btn.addEventListener(("click"),e=>{
    if(f_name.value===""||sisma.value===""||phone.value===""||mailFlag===false){
        ifItsNotValid.textContent="אחד מהערכים שהכנסת אינו תקין או שלא מלאת את כל התאים"
    }
    else{
newUserObj={name:f_name.value,email:Email.value,phone:phone.value,kod:sisma.value}
let i
for ( i = 0; i < usersArr.length&&(usersArr[i].name!=newUserObj.name&&usersArr[i].kod!=newUserObj.kod); i++) ;
if(i===usersArr.length){
usersArr.push(newUserObj)
ifItsNotValid.textContent="נרשמת בהצלחה"
}
else
{
    if(usersArr[i].name===newUserObj.name&&usersArr[i].kod===newUserObj.kod)
    ifItsNotValid.textContent="הנך רשום כבר במערכת"
else if(usersArr[i].name===newUserObj.name)
ifItsNotValid.textContent="שם כמו שלך מופיע במערכת , נסה להכנס תחת שם אחר"
else 
ifItsNotValid.textContent="סיסמה קיימת במערכת נסה סיסמה אחרת"
}

//שמירת הנתונים בלוקל סטורייג
 localStorage.setItem("userArr",JSON.stringify( usersArr))
}
})
