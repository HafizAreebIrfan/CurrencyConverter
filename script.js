const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const selector = document.querySelectorAll(".selector select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//fetching and putting all countries in options
for(let select of selector){
for (currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    select.append(newOption);
}
//we need to change country flag when select changes
select.addEventListener("change",(evt)=>{ //event is the object of event listener
    updateFlag(evt.target);
    //target means when we change any option, it will specify where
    //the change occurs.
})
}//we will pass the target to update flag function using element argument
const updateFlag = (element) =>{
    let currCode = element.value; //we are getting currency code from element where change happen like which country is selected
    let coutrycode = countryList[currCode]; //we are getting country code from country lists
    let newSrc = `https://flagsapi.com/${coutrycode}/flat/64.png`; //now based on country code, we are changing its flag by passing it in image source
    let img = element.parentElement.querySelector("img"); //we are accessing image from select container which is selector in our case
    img.src = newSrc;
}
const updaterate = async()=>{
    let amount = document.querySelector("form input");
    let amtvalue = amount.value;
    if(amtvalue === "" || amtvalue < 1){
        amtvalue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]; // Get base currency object
    rate = Number(rate.toFixed(4));
    let finalamount = amtvalue * rate;
    finalamount = Number(finalamount.toFixed(4)).toLocaleString();
    msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();//stopping all automatic work the button is doing.
    updaterate();
});

window.addEventListener("load", ()=>{
    updaterate();
    
});