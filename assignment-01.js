var x = 0;
function Plus(y){
	x = parseInt(document.getElementById(y).innerHTML)+1;
	if(x>99){
		x = 99;
	}
	document.getElementById(y).innerHTML= x
}

function Minus(y){
	x = parseInt(document.getElementById(y).innerHTML)-1;
	if(x<0){
		x = 0;
	}
	document.getElementById(y).innerHTML = x
}