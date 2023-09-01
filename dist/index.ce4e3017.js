let e,t;const n=[{owner:"Jonas Schmedtmann",movements:[200,455.23,-306.5,25e3,-642.21,-133.9,79.97,1300],interestRate:1.2,pin:1111,movementsDates:["2019-11-18T21:31:17.178Z","2019-12-23T07:42:02.383Z","2020-01-28T09:15:04.904Z","2023-08-01T10:17:24.185Z","2023-08-09T14:11:59.604Z","2023-08-10T17:01:17.194Z","2023-08-11T23:36:17.929Z","2023-08-12T10:51:36.790Z"],currency:"EUR",locale:"pt-PT"},{owner:"Jessica Davis",movements:[5e3,3400,-150,-790,-3210,-1e3,8500,-30],interestRate:1.5,pin:2222,movementsDates:["2019-11-01T13:15:33.035Z","2019-11-30T09:48:16.867Z","2019-12-25T06:04:23.907Z","2020-01-25T14:18:46.235Z","2020-02-05T16:33:06.386Z","2020-04-10T14:43:26.374Z","2020-06-25T18:49:59.371Z","2020-07-26T12:01:20.894Z"],currency:"USD",locale:"en-US"}],o=document.querySelector(".welcome"),r=document.querySelector(".date"),u=document.querySelector(".balance__value"),c=document.querySelector(".summary__value--in"),a=document.querySelector(".summary__value--out"),l=document.querySelector(".summary__value--interest"),m=document.querySelector(".timer"),s=document.querySelector(".app"),i=document.querySelector(".movements"),v=document.querySelector(".login__btn"),d=document.querySelector(".form__btn--transfer"),y=document.querySelector(".form__btn--loan"),f=document.querySelector(".form__btn--close"),p=document.querySelector(".btn--sort"),_=document.querySelector(".login__input--user"),S=document.querySelector(".login__input--pin"),T=document.querySelector(".form__input--to"),h=document.querySelector(".form__input--amount"),q=document.querySelector(".form__input--loan-amount"),D=document.querySelector(".form__input--user"),w=document.querySelector(".form__input--pin"),b=function(e,t){let n=Math.round(Math.abs((e-new Date)/864e5));return(console.log(n),0===n)?"Today":1===n?"Yesterday":n<=7?`${n} days ago`:new Intl.DateTimeFormat(t.locale).format(e)},g=function(e,t,n){return new Intl.NumberFormat(t,{style:"currency",currency:n}).format(e)},Z=function(e,t=!1){i.innerHTML="";let n=t?e.movements.slice().sort((e,t)=>e-t):e.movements;n.forEach(function(t,n){let o=t>0?"deposit":"withdrawal",r=new Date(e.movementsDates[n]),u=b(r,e),c=g(t,e.locale,e.currency),a=`
      <div class="movements__row">
        <div class="movements__type movements__type--${o}">${n+1} ${o}</div>
        <div class="movements__date">${u}</div>
        <div class="movements__value">${c}</div>
      </div>
    `;i.insertAdjacentHTML("afterbegin",a)})},I=function(e){e.balance=e.movements.reduce((e,t)=>e+t,0);let t=g(e.balance,e.locale,e.currency);u.textContent=`${t}`},$=function(e){let t=e.movements.filter(e=>e>0).reduce((e,t)=>e+t,0);c.textContent=g(t,e.locale,e.currency);let n=Math.abs(e.movements.filter(e=>e<0).reduce((e,t)=>e+t,0));a.textContent=g(n,e.locale,e.currency);let o=e.movements.filter(e=>e>0).map(t=>t*e.interestRate/100).filter((e,t,n)=>e>=1).reduce((e,t)=>e+t,0);l.textContent=g(o,e.locale,e.currency)};!function(e){e.forEach(function(e){e.username=e.owner.toLowerCase().split(" ").map(e=>e[0]).join("")})}(n);const x=function(e){// Display movements
Z(e),// Display balance
I(e),// Display summary
$(e)},C=function(){let e=function(){let e=String(Math.floor(t/60)).padStart(2,0),r=String(t%60).padStart(2,0);//in each call print remaining time to UI
m.textContent=`${e}:${r}`,0===t&&(clearInterval(n),o.textContent="Log in to get started",s.style.opacity=0),t--},t=120;//call timr every second
e();let n=setInterval(e,1e3);return n};v.addEventListener("click",function(u){if(// Prevent form from submitting
u.preventDefault(),console.log(e=n.find(e=>e.username===_.value)),e?.pin===Number(S.value)){// Display UI and message
o.textContent=`Welcome back, ${e.owner.split(" ")[0]}`;// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
let n=new Date,u=e.locale;r.textContent=new Intl.DateTimeFormat(u,{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric"}).format(n),s.style.opacity=100,// Clear input fields
_.value=S.value="",S.blur(),t&&clearInterval(t),t=C(),// Update UI
x(e)}}),d.addEventListener("click",function(o){o.preventDefault();let r=Number(h.value),u=n.find(e=>e.username===T.value);h.value=T.value="",r>0&&u&&e.balance>=r&&u?.username!==e.username&&(// Doing the transfer
e.movements.push(-r),u.movements.push(r),//Add Transfer Date
e.movementsDates.push(new Date().toISOString()),u.movementsDates.push(new Date().toISOString()),// Update UI
x(e),//Reset the timer
clearInterval(t),t=C())}),y.addEventListener("click",function(n){n.preventDefault();let o=Math.floor(q.value);o>0&&e.movements.some(e=>e>=.1*o)&&(// Add movement
setTimeout(function(){e.movements.push(o),//Add loan date
e.movementsDates.push(new Date().toISOString()),// Update UI
x(e),//Reset the timer
clearInterval(t),t=C()},2500),q.value="")}),f.addEventListener("click",function(t){if(t.preventDefault(),D.value===e.username&&Number(w.value)===e.pin){let t=n.findIndex(t=>t.username===e.username);console.log(t),// .indexOf(23)
// Delete account
n.splice(t,1),// Hide UI
s.style.opacity=0}D.value=w.value=""});let E=!1;p.addEventListener("click",function(t){t.preventDefault(),Z(e,!E),E=!E}),console.log(new Intl.NumberFormat("en-US",{style:"currency",unit:"mile-per-hour",currency:"EUR"}).format(34572.34));const L=["olives","spinach"],M=setTimeout((e,t)=>console.log(`Here is ur pizzaaa with${e} and ${t}`),3e3,...L);L.includes("spinach")&&clearTimeout(M);// setInterval(function () {
//   const now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
//# sourceMappingURL=index.ce4e3017.js.map

//# sourceMappingURL=index.ce4e3017.js.map
