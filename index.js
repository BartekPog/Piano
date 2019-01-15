

var funkcja=document.querySelector(".aktywny").textContent;

////BUTONY
var funkcjaWybor=document.querySelectorAll(".buton");
for(var i=0;i<funkcjaWybor.length;i++){
	funkcjaWybor[i].addEventListener("click",function (event){
		document.querySelector(".aktywny").classList.toggle("aktywny");
		this.classList.toggle("aktywny");
		funkcja=this.textContent;
	});
}



///OBSŁUGA AUDIO
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var dzw=[];
for (var i=0;i<26;i++)	dzw.push(audioCtx.createOscillator());

function czestotliwoscZnaku(znak){
	switch (znak) {
		case 'z': return 261.6;//C
		case 's': return 277.2;//c#
		case 'x': return 293.7;//D
		case 'd': return 311.1;//D#
		case 'c': return 329.6;//E
		case 'v': return 349.2;//F
		case 'g': return 370.0;//F#
		case 'b': return 392.0;//G
		case 'h': return 415.3;//G#
		case 'n': return 440.0;//A
		case 'j': return 466.2;//A#
		case 'm': return 493.9;//B
    case ',': return 523.3;//C2

		/// WYŻSZA OKTAWA
		case 'q': return 523.3;//C2
		case '2': return 554.4;//c#2
		case 'w': return 587.3;//D2
		case '3': return 622.3;//D#2
		case 'e': return 659.3;//E2
		case 'r': return 698.5;//F2
		case '5': return 740.0;//F#2
		case 't': return 784.0;//G2
		case '6': return 830.6;//G#2
		case 'y': return 880.0;//A2
		case '7': return 932.3;//A#2
		case 'u': return 987.8;//B2
    case 'i': return 1046.0;//C3
	}
	return 440;
}

function oscylatorZnaku(znak){
	switch (znak) {
		case 'z': return 0;//C
		case 's': return 1;//c#
		case 'x': return 2;//D
		case 'd': return 3;//D#
		case 'c': return 4;//E
		case 'v': return 5;//F
		case 'g': return 6;//F#
		case 'b': return 7;//G
		case 'h': return 8;//G#
		case 'n': return 9;//A
		case 'j': return 10;//A#
		case 'm': return 11;//B
    case ',': return 12;//C2

		/// WYŻSZA OKTAWA
		case 'q': return 13;//C2
		case '2': return 14;//c#2
		case 'w': return 15;//D2
		case '3': return 16;//D#2
		case 'e': return 17;//E2
		case 'r': return 18;//F2
		case '5': return 19;//F#2
		case 't': return 20;//G2
		case '6': return 21;//G#2
		case 'y': return 22;//A2
		case '7': return 23;//A#2
		case 'u': return 24;//B2
    case 'i': return 25;//C3
	}
  return -1;
}

document.addEventListener("keypress",function (event){
	var zn=event.key;

	if((event.repeat===false)&&(oscylatorZnaku(zn)>=0))
	{

		dzw[oscylatorZnaku(zn)].type = funkcja;
		dzw[oscylatorZnaku(zn)].frequency.value = czestotliwoscZnaku(zn); // value in hertz
		dzw[oscylatorZnaku(zn)].connect(audioCtx.destination);

		dzw[oscylatorZnaku(zn)].start();

		if(zn==',') zn='kkk';
		var query=".kl"+zn;
		document.querySelector(query).classList.toggle("akt");

	}
});

document.addEventListener("keyup",function(event){
	var zn=event.key;
	if(oscylatorZnaku(zn)>=0){
		dzw[oscylatorZnaku(zn)].stop();
		dzw[oscylatorZnaku(zn)]=audioCtx.createOscillator();

		if(zn==',') zn='kkk';
		var query=".kl"+zn;
		document.querySelector(query).classList.toggle("akt");
	}

});
