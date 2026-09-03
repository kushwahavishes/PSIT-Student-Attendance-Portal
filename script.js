function calc(){
 const t=Number(document.getElementById("t").value);
 const abs=Number(document.getElementById("abs").value);
 const oaa=Number(document.getElementById("oaa").value);
 const target=Number(document.getElementById("target").value);

 if(!t || t<1 || abs<0 || abs>t || oaa<0 || oaa>abs || target<=0 || target>100){
   alert("Please enter valid values. OAA cannot be greater than Total Absent.");
   return;
 }

 const effectiveAbsent=abs-oaa;
 const attended=t-effectiveAbsent;
 const percentage=(attended/t)*100;

 document.getElementById("stotal").textContent=t;
 document.getElementById("sabs").textContent=abs;
 document.getElementById("soaa").textContent=oaa;
 document.getElementById("remaining").textContent=effectiveAbsent;
 document.getElementById("pa").textContent=abs;
 document.getElementById("pt").textContent=t;
 document.getElementById("pp").textContent=effectiveAbsent;

 const result=document.getElementById("result");
 const planning=document.getElementById("planning");
 result.style.display="block";
 planning.style.display="grid";

 let targetMessage="";
 if(percentage>=target){
   const maxMiss=Math.max(0,Math.floor((attended*100/target)-t));
   targetMessage=`<b>Target Check:</b> ${percentage.toFixed(2)}% meets the ${target}% target.`;
   document.querySelector(".pill").textContent="TARGET MET";
 }else{
   const needed=Math.ceil(((target/100)*t-attended)/(1-target/100));
   targetMessage=`<b>Target Check:</b> ${percentage.toFixed(2)}% is below ${target}%. You need approximately <b>${needed}</b> more attended lecture${needed===1?"":"s"} to reach the target.`;
   document.querySelector(".pill").textContent="BELOW TARGET";
 }

 result.innerHTML=`<strong>${percentage.toFixed(2)}%</strong><br>${targetMessage}`;

 const maxMiss=percentage>=target ? Math.max(0,Math.floor((attended*100/target)-t)) : 0;
 const needed=percentage<target ? Math.ceil(((target/100)*t-attended)/(1-target/100)) : 0;

 planning.innerHTML=`
   <div class="plan-box"><span>ACCURATE PERCENTAGE</span><b>${percentage.toFixed(2)}%</b></div>
   <div class="plan-box"><span>TARGET</span><b>${target}%</b></div>
   <div class="plan-box"><span>CAN MISS</span><b>${maxMiss} lecture${maxMiss===1?"":"s"}</b></div>
   <div class="plan-box"><span>NEED TO ATTEND</span><b>${needed} lecture${needed===1?"":"s"}</b></div>`;
}

function focusCalculator(mode){
 const target=document.querySelector(".calc-card");
 target.scrollIntoView({behavior:"smooth",block:"center"});
 setTimeout(()=>{
   if(mode==="target") document.getElementById("target").focus();
   else calc();
 },400);
}

calc();
