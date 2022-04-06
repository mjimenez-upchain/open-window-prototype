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
	 * On page load, if there's a child window reference available and there is a value in local storage, simulate handleOpenWindowClick
	 * If there is no child window reference and there is a value in local storage,
	 * delete from local storage to prevent pop up blocking on future visits (this is because most browsers prevent pop ups on first load)
	 */
	window.addEventListener("load", () => {
		const id = localStorage.getItem("openedWindowId");

		if (id) {
			button.click();
		}

		if (!windowRef) {
			if (id) {
				localStorage.removeItem("openedWindowId");
			}
		}
	});
}

function handleIncreaseClick() {
	return () => {
		if (windowRef) {
			windowRef.postMessage("increase", "*");
		}
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
