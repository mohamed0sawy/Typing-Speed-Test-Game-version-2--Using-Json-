//Get Elements
let start = document.querySelector(".message button");
let message = document.querySelector(".message");
let back = document.querySelector(".back");
let mainText = document.querySelector(".whiteBoard .mainText");
let restart = document.querySelector(".restart");
let again = document.querySelector(".results .again");
let input = document.querySelector(".writeArea");
let result = document.querySelector(".results");

//variables
let seconds = 0;
let correctWords = 0;
let wrongWords = 0;
let totalWords = 0;
let timer = 0;

//paragraphs
let paragraphs = [
	"p1",
	"p2",
	"p3",
	"p4",
	"p5",
	"p6",
	"p7",
	"p8",
	"p9",
	"p10",
	"p11",
	"p12",
	"p13",
	"p14",
	"p15",
	"p16",
	"p17",
	"p18",
	"p19",
	"p20",
];

//call json file
const getJson = async () => {
	const response = await fetch("./parg.json");
	try {
		const data = await response.json();
		return data;
	} catch (e) {
		console.log(e);
	}
};

//generate random prag.
function genePrag(arr) {
	let index = Math.floor(Math.random() * 20);
	getJson()
		.then((data) => data[paragraphs[index]])
		.then((res) => splitPrag(res))
		.then((res) => main(res));
}
genePrag(paragraphs);

//split prag
function splitPrag(prag) {
	let usedPrag = Array.from(prag);
	return usedPrag;
}

//create spans holding the letters of the parg
function createSpans(arr) {
	let temp = [];
	for (const key in arr) {
		let span = document.createElement("span");
		let Text = document.createTextNode(arr[key]);
		span.className = key == 0 ? "wgreen" : "wbalck";
		span.appendChild(Text);
		mainText.appendChild(span);
		temp.push(span);
	}
	return temp;
}

//main funciton
function main(arr) {
	let prag = createSpans(arr);
	let i = 0;
	let j = 0;

	input.addEventListener("input", function (e) {
		if (input.value[j] == prag[i].innerHTML) {
			totalWords++;
			prag[i].className = "passedText";
			if (i < prag.length - 1) prag[i + 1].className = "wgreen";
			i++;
			j = input.value.length;
		} else {
			j = input.value.length;
			if (prag[i].className != "wred") {
				prag[i].className = "wred";
				wrongWords++;
			}
		}
		if (i >= prag.length) {
			clearInterval(timer);
			console.log(correctWords);
			console.log(wrongWords);
			console.log(totalWords);
			console.log(seconds);
			result.style.cssText = "width:715px; padding:20px";
			back.style.cssText = "z-index:2;";
			input.disabled = true;
			calcResults();
		}
	});
}

//start button
start.addEventListener("click", function () {
	message.style.cssText = "display:none;";
	back.style.cssText = "display:none;";
	input.focus();
	timer = setInterval(function () {
		seconds++;
	}, 1000);
});

input.addEventListener("blur", function () {
	this.focus();
});

//restart button
restart.addEventListener("click", function () {
	location.reload(true);
});

//'take test again' button
again.addEventListener("click", function () {
	location.reload(true);
});

function calcResults() {
	document.querySelector(".results .speed span").innerHTML = (
		(totalWords - wrongWords) /
		5 /
		(seconds / 60)
	).toFixed(1);
	document.querySelector(".results .accuracy span").innerHTML = (
		((totalWords - wrongWords) /
			(seconds / 60) /
			(totalWords / (seconds / 60))) *
		100
	).toFixed(2);
}
