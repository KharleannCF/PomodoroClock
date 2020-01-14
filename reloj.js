let bar = document.getElementById("time");
let plusBut = document.getElementById("sumador");
let sustBut = document.getElementById("restador");
let wBut = document.getElementById("trabajo");
let rBut = document.getElementById("rest");
let stateBut = document.getElementById("state1");
let pausebut = document.getElementById("state2");
let rev = document.getElementById("rev");
let revTil = document.getElementById("revtitulo");
let wMin = 20;
let seg = 0;
let rMin = 5;
let cicleCount = 0;
let work = true;
let spstate = false;
let iden = 0;
let minAct = wMin;
let rotation = "rotateY(180deg)";
let background = "linear-gradient(to right, {color1} {percent}, {color2} {percent})";
let percent = 0;
let total = 0;
let ago = 0;
let color1 = "hsl(300, 50%, 60%)";
let color2 = "hsl(285, 100%, 30%)";

bar.value = showTime(minAct);

function timePlus(mins){
	return mins + 5;
};
function timeSust(mins){
	return mins <= 0 ? mins : mins - 5;
};

function showTime(mins){
	return (seg < 10 && seg !== "00") ? mins + ':' + '0' + seg : mins + ':' + seg;
};
function timercount(mins){
	if (seg > 0){
		seg = seg - 1;
	}else {
		mins = mins - 1;
		seg = 59;
	}
	return mins
};
function format(){
	percent = ago * 100 / total;
	percent = percent + "%";
	return background.replace(/{percent}/gi, percent);
}
function iterador(){
	if(minAct > 0 || seg > 0){
		minAct = timercount(minAct);
		ago = ago+1;
		console.log(ago);
		console.log(percent);
		let back1 = format();
		work ? back1 = back1.replace(/{color1}/,color2).replace(/{color2}/,color1) :
		back1 = back1.replace(/{color1}/,color1).replace(/{color2}/,color2);
		bar.style.background = back1;
		bar.value = showTime(minAct);
	}else if (work){
		(((cicleCount + 1)%4) != 0) ? minAct = rMin : minAct = rMin + 10;
		seg = 0;
		ago = 0;
		total = minAct*60 + seg;
		work = false;
		minAct = timercount(minAct);
		bar.value = showTime(minAct);
		revTil.style.transform=rotation;
	}else {
		cicleCount = cicleCount + 1;
		minAct = wMin;
		seg = 0;
		ago = 0;
		total = minAct*60 + seg;
		work = true;
		minAct = timercount(wMin);
		bar.value = showTime(minAct);
		console.log(cicleCount%4);
		revTil.style.removeProperty("transform");
	}
};

rBut.onclick = function(){
	rMin = parseInt(bar.value[0]+bar.value[1]);
	/:/.test(rMin) ? rMin=rMin.split("").reverse().join("").replace(/:/,"0") : rMin;
	minAct = wMin;
	revTil.style.removeProperty("transform");
	seg = 0;
	work = !work;
	bar.value = showTime(minAct);
};
wBut.onclick = function(){
	wMin = parseInt(bar.value[0]+bar.value[1]);
	/:/.test(wMin) ? wMin=wMin.split("").reverse().join("").replace(/:/,"0") : wMin;
	minAct = rMin;
	revTil.style.transform=rotation;
	seg = 0;
	work = !work;
	bar.value = showTime(minAct);
};
plusBut.onclick = function(){
	minAct = work ? wMin = timePlus(wMin) : rMin = timePlus(rMin);
	seg = 0;
	bar.value = showTime(minAct);
};

sustBut.onclick = function(){
	minAct = work ? wMin = timeSust(wMin) : rMin = timeSust(rMin);
	seg = 0;
	bar.value = showTime(minAct);
};
stateBut.onclick = function(){
		seg = bar.value[bar.value.length - 2] + bar.value[bar.value.length - 1];
		minAct = bar.value[0]+bar.value[1];
		/:/.test(minAct) ? minAct=minAct.split("").reverse().join("").replace(/:/,"0") : minAct;
		if (seg >= 60) {
			minAct = parseInt(minAct) + 1;
			seg = seg - 60;
		}
		work ? wMin = parseInt(minAct) : rMin = parseInt(minAct);
		total = 60*  parseInt(minAct) +  parseInt(seg);
		iden = setInterval(function(){
			iterador()},1000);
		sustBut.disabled = true;
		plusBut.disabled = true;
		wBut.disabled = true;
		rBut.disabled = true;
		bar.disabled = true;
		rev.style.transform = rotation;

};
pausebut.onclick = function(){
	clearInterval(iden);
	work ? minAct = wMin : minAct = rMin;
	seg = 0;
	ago = 0;
	bar.value = showTime(minAct);
	sustBut.disabled = false;
	plusBut.disabled = false;
	wBut.disabled = false;
	rBut.disabled = false;
	bar.disabled = false;
	rev.style.removeProperty("transform");
};