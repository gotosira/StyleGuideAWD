function awdDetectIe()
{
	if (document.body.style.opacity!=undefined) {return 9;}
	else if (document.body.style.msBlockProgression!=undefined) {return 8;}
	else if (document.body.style.msInterpolationMode!=undefined) {return 7;}
	else if (document.body.style.textOverflow!=undefined) {return 6}
	else {return 5;}
}
