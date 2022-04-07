const windowRefs = [];
const windowIds = [];

function main() {
	const button = document.querySelector("button");
	const increaseButton = document.querySelector("#increase");

	button.addEventListener("click", handleOpenWindowClick());
	increaseButton.addEventListener("click", handleIncreaseClick());

	window.addEventListener("message", (event) => {
		if (event.data.key === "close-popup") {
			if (localStorage.getItem("openedWindowId")) {
				const ids = JSON.parse(localStorage.getItem("openedWindowId"));

				if (ids.some((id) => id === event.data.id)) {
					const filteredIds = ids.filter((id) => id !== event.data.id);

					if (filteredIds.length) {
						localStorage.setItem("openedWindowId", JSON.stringify(filteredIds));
					} else {
						localStorage.removeItem("openedWindowId");
					}
				}
			}
		}
	});

	/**
	 * On page load, if there's a child window reference available and there is a value in local storage, simulate handleOpenWindowClick
	 * If there is no child window reference and there is a value in local storage,
	 * delete from local storage to prevent pop up blocking on future visits (this is because most browsers prevent pop ups on first load)
	 */
	window.addEventListener("load", () => {
		const ids = localStorage.getItem("openedWindowId");

		if (ids) {
			button.click();

			return;
		}

		if (!windowRefs.length) {
			if (ids) {
				localStorage.removeItem("openedWindowId");
			}
		}
	});
}

function handleIncreaseClick() {
	return () => {
		if (windowRefs.length) {
			windowRefs.forEach((windowRef) => {
				windowRef.postMessage("increase", "*");
			});
		}
	};
}

function handleOpenWindowClick() {
	return () => {
		const ids = JSON.parse(localStorage.getItem("openedWindowId"));

		if (ids && !windowRefs.length) {
			ids.forEach((id) => {
				const windowRef = window.open("", id, "popup,width=320,height=320");

				if (windowRef?.location.href === "about:blank") {
					openNewWindow(id);

					return;
				}

				if (windowRef) {
					windowIds.push(id);
					windowRefs.push(windowRef);
				} else {
					const filteredIds = JSON.parse(
						localStorage.getItem("openedWindowId")
					).filter((_id) => _id !== id);

					if (filteredIds.length) {
						localStorage.setItem("openedWindowId", JSON.stringify(filteredIds));
					} else {
						localStorage.removeItem("openedWindowId");
					}
				}
			});

			return;
		}

		openNewWindow();
	};
}

function openNewWindow(windowName = `opened_window_${Math.random()}`) {
	const windowRef = window.open(
		"window.html",
		windowName,
		"popup,width=320,height=320"
	);

	windowIds.push(windowName);
	windowRefs.push(windowRef);
	localStorage.setItem("openedWindowId", JSON.stringify(windowIds));
}

main();
