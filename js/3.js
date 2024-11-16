//-------------הבאת השחקן הנוכחי מהלוקל סטורייג-----
const current=JSON.parse(localStorage.getItem("current"))||{}
console.log(current);
//---------------------הגדרת משתנים----------------------
const nameUser=document.querySelector(".nameUser")
const win=document.querySelectorAll(".win")
const lose=document.querySelectorAll(".lose")
//----עדכון שם השחקן------------ 
nameUser.textContent=current.name
//-----עדכון בכל המשחקים מספר נצחונות וכשלונות----
win.forEach(winE => {
    winE.textContent=`WINS : ${current.win})`
});
lose.forEach(loseE=>{
    loseE.textContent=`LOSES :${current.lose})`
})

console.log(nameUser);