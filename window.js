function main() {
	let value = 0;
	const span = document.querySelector("#value");

	span.innerHTML = value;

	window.addEventListener("message", () => {
		value++;

		span.innerHTML = value;
	});

	window.addEventListener("beforeunload", () => {
		window.opener.postMessage("close-popup", "*");
	});
}

main();
