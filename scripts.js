document.addEventListener("DOMContentLoaded", function () {
	class Popup {
		constructor(
			openButtonSelector,
			popupSelector,
			overlaySelector,
			closeButtonSelector
		) {
			this.openButton = document.querySelector(openButtonSelector);
			this.popup = document.querySelector(popupSelector);
			this.overlay = document.querySelector(overlaySelector);
			this.closeButton = document.querySelector(closeButtonSelector);

			if (
				!this.openButton ||
				!this.popup ||
				!this.overlay ||
				!this.closeButton
			) {
				console.warn(
					"One or more popup elements were not found in the DOM."
				);
				return;
			}

			this.init();
		}

		init() {
			this.openButton.addEventListener("click", () => this.openPopup());
			this.overlay.addEventListener("click", () => this.closePopup());
			this.closeButton.addEventListener("click", () => this.closePopup());
		}

		openPopup() {
			this.popup.classList.add("is-active");
		}

		closePopup() {
			this.popup.classList.remove("is-active");
		}
	}

	new Popup(
		"#popup-embed-video-open",
		".popup-embed-video",
		".popup-embed-video-overlay",
		".popup-embed-video-close"
	);

	class Accordion {
		constructor(
			selector,
			headSelector = ".accordion-head-inner",
			allowMultiple = false,
			onOpen = null,
			onClose = null
		) {
			this.accordions = document.querySelectorAll(selector);
			this.headSelector = headSelector;
			this.allowMultiple = allowMultiple;
			this.onOpen = onOpen;
			this.onClose = onClose;

			if (!this.accordions.length) return;
			this.init();
		}

		init() {
			this.accordions.forEach((accordion) => {
				const head = accordion.querySelector(this.headSelector);
				if (!head) return;
				head.addEventListener("click", () =>
					this.toggleAccordion(accordion, this.accordions)
				);
			});
		}

		toggleAccordion(accordion, accordions) {
			if (!accordion) return;

			if (!this.allowMultiple) {
				this.accordions.forEach((acc) => {
					if (acc !== accordion) {
						acc.classList.remove("is-active");
						if (this.onClose) this.onClose(acc, accordions);
					}
				});
			}

			accordion.classList.toggle("is-active");

			if (accordion.classList.contains("is-active")) {
				if (this.onOpen) this.onOpen(accordion, accordions);
			} else {
				if (this.onClose) this.onClose(accordion, accordions);
			}
		}
	}

	new Accordion(".accordion", ".accordion-head-inner", false);
});
