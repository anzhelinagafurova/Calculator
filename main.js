let queue = [];
document.addEventListener('click', function(event){
let btn = event.target.closest('button');
if (btn){
	const emptyFieldCondition = btn.className =='action' && queue.length == 0 && btn.value !='-'; //нельзя начинать ввод с знака действия, если это не минус
	const actionRepeatCondition = btn.className =='action' && queue[queue.length-1] && queue[queue.length-1].className =='action'; //не может быть введено более одного знака действия подряд, если второй знак - не минус
	const minusUsageCondition = (queue.length == 0 && btn.value =='-') || (btn.value =='-' && queue[queue.length-1] && (queue[queue.length-1].value =='*' || queue[queue.length-1].value =='/')); //условие, когда знак минус может начинать ввод и идти после другого знака
	const signsLimitCondition = (btn.className == "number" && field.value.length >= 8 && Array.from(field.value.slice(field.value.length-8, field.value.length)).every(element => Number.isInteger(Number(element)))); //не может вводиться более 8 символов числа
	if (emptyFieldCondition || actionRepeatCondition && !minusUsageCondition || signsLimitCondition) {
		return;
	}
	switch (btn.className){
		case "deleteNumber":
			if (queue.length != 0 && queue[queue.length-1].className == "action"){
				deleteLastItem(field);
			}
			else {
				while(queue.length != 0 && queue[queue.length-1].className == "number"){
					deleteLastItem(field);
				}
			}
			return;
		case "delete":
			deleteLastItem(field);
			return;
		case "deleteAll":
			field.value = "";
			queue = [];
			return;
		case "equal":
			calculateResult(field);
			return;
	}
	queue.push(btn);
	field.value += btn.value;
}
})
function deleteLastItem(field){
	field.value = field.value.slice(0, field.value.length-1);
	queue.pop();
}
function calculateResult(field){
	let calculate = new Function(`return ${field.value}`);	
	let result = calculate();
	if (result===-Infinity || result===Infinity){
		alert("Делить на ноль нельзя");
		field.value = "";
		queue = [];
		return;
	}
	if(!Number.isInteger(result)){
		result = result.toFixed(2);
		for (let elem of result){
			let floatResult = document.createElement("button");
			floatResult.className = "number";
			floatResult.value = elem;
			queue.push(floatResult);
		}
	}
	field.value = result;
}
