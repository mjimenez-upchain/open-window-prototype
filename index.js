let windowRef;

function main() {
	const button = document.querySelector("button");
	const increaseButton = document.querySelector("#increase");

	button.addEventListener("click", handleOpenWindowClick());
	increaseButton.addEventListener("click", handleIncreaseClick());

	window.addEventListener("message", (event) => {
		if (event.data === "close-popup") {
			if (localStorage.getItem("openedWindowId")) {
				localStorage.removeItem("openedWindowId");
			}
		}
	});

	/**
	 * On page load, simulate button click to get reference to child window
	 */
	window.addEventListener("load", () => {
		const id = localStorage.getItem("openedWindowId");

		if (id) {
			button.click();
		}
	});
}

function handleIncreaseClick() {
	return () => {
		windowRef.postMessage("increase", "*");
	};
}

function handleOpenWindowClick() {
	return () => {
		windowRef = window.open("", "opened_window", "popup,width=320,height=320");

		if (windowRef.location.href === "about:blank") {
			windowRef = window.open(
				"window.html",
				"opened_window",
				"popup,width=320,height=320"
			);

			localStorage.setItem("openedWindowId", "opened_window");
		}
	};
}

main();
