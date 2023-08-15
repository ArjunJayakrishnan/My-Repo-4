"use strict mode";

//// Namings/////
const htmlBody = document.querySelector("body");
const enterContainer = document.querySelector(".enter-container");
const userInput = document.querySelectorAll(".user-input");
const userDays = document.querySelector(".user-days");
const userMonths = document.querySelector(".user-months");
const userYears = document.querySelector(".user-years");
const icon = document.querySelector(".icon-container");
const yearsOutput = document.querySelector(".years-dash");
const monthsOutput = document.querySelector(".months-dash");
const daysOutput = document.querySelector(".days-dash");
const inputP = document.querySelectorAll(".input-p");
const dayInputP = document.querySelector(".day--input-p");
const monthInputP = document.querySelector(".month--input-p");
const yearInputP = document.querySelector(".year--input-p");
const errMsg = document.querySelectorAll(".error");
const errDay = document.querySelector(".error-day");
const errMonth = document.querySelector(".error-month");
const errYear = document.querySelector(".error-year");

//// Reference ////
const monthsObj = {
	1: "31",
	2: ["28", "29"],
	3: "31",
	4: "30",
	5: "31",
	6: "30",
	7: "31",
	8: "31",
	9: "30",
	10: "31",
	11: "30",
	12: "31",
};

/// functionality ////

// Border color change for active input field
userInput.forEach(function (eachInput) {
	eachInput.addEventListener("click", function () {
		// removing existing .typing class
		userInput.forEach((otherItem) => {
			otherItem.classList.remove("typing");
		});
		eachInput.classList.add("typing");
		// to out-focus from input field
		htmlBody.addEventListener("click", function (event) {
			if (event.target !== eachInput) {
				eachInput.classList.remove("typing");
			}
		});
	});
});

// Showing outputs
enterContainer.addEventListener("submit", function (e) {
	e.preventDefault();

	// CHeck if given DOB is valid
	const checkValidity = function ([days, months, years]) {
		let validYear = false;
		// let validMonth = false;
		let validDay = false;
		if (
			Number(String(days).padStart(2, "0")) <=
				monthsObj[Number(String(months).padStart(2, "0"))] &&
			1 <= Number(String(days).padStart(2, "0")) <= 31
		) {
			validDay = true;
		}
		if (
			Number(months) === 2 &&
			Number(years) % 4 === 0 &&
			Number(days) === 29
		) {
			Number(String(days).padStart(2, "0")) <= monthsObj[2][1];
			validDay = true;
		}

		/////////
		// I dont know why validMonth's not working. If u got an answer please comment!!!
		// for this project to work temp, i used html attribute min and max set to 1 & 12
		///////////

		// if (1 <= months <= 12) {
		// 	validMonth = true;
		// }
		if (
			Number(years) <= new Date().getFullYear() &&
			typeof years === "string"
		) {
			validYear = true;
		}
		if (validDay && validYear) return true;
		else {
			if (!validDay) dayErrHandling();
			if (!validYear) yearErrHandling();
		}
	};

	function dayErrHandling() {
		errDay.style.display = "block";
		userDays.style.border = "1px solid hsl(0, 100%, 67%)";
		dayInputP.style.color = "hsl(0, 100%, 67%)";
		htmlBody.addEventListener("click", function () {
			errDay.style.display = "none";
			dayInputP.style.color = "hsl(0, 1%, 44%)";
			userDays.style.border = "1px solid hsl(0, 0%, 86%)";
		});
	}

	// no point in using this function bcuz validation of month not working (line 78)

	// function monthErrHandling() {
	// 	errMonth.style.display = "block";
	// 	userMonths.style.border = "1px solid hsl(0, 100%, 67%)";
	// 	monthInputP.style.color = "hsl(0, 100%, 67%)";
	// 	htmlBody.addEventListener("click", function () {
	// 		errMonth.style.display = "none";
	// 		monthInputP.style.color = "hsl(0, 1%, 44%)";
	// 		userMonths.style.border = "1px solid hsl(0, 0%, 86%)";
	// 	});
	// }

	function yearErrHandling() {
		errYear.style.display = "block";
		userYears.style.border = "1px solid hsl(0, 100%, 67%)";
		yearInputP.style.color = "hsl(0, 100%, 67%)";
		htmlBody.addEventListener("click", function () {
			errYear.style.display = "none";
			yearInputP.style.color = "hsl(0, 1%, 44%)";
			userYears.style.border = "1px solid hsl(0, 0%, 86%)";
		});
	}

	// Converting DOB to usable format
	const daysCorrect = userDays.value.trim().replaceAll(" ", "");
	const monthsCorrect = userMonths.value.trim().replaceAll(" ", "");
	const yearsCorrect = userYears.value.trim().replaceAll(" ", "");

	// Calculate the age
	function calculateAge() {
		if (checkValidity([daysCorrect, monthsCorrect, yearsCorrect])) {
			const today = new Date();
			const birthDate = new Date(
				`${Number(monthsCorrect)} ${Number(daysCorrect)} ${Number(
					yearsCorrect
				)}`
			);
			const years = today.getFullYear() - birthDate.getFullYear();
			const months = today.getMonth();
			const days = today.getDate();
			return [years - 1, months, days];
		} else {
			// checkValidity([daysCorrect, monthsCorrect, yearsCorrect]);
		}
	}
	if (calculateAge()) {
		yearsOutput.textContent = `${calculateAge()[0]}`;
		monthsOutput.textContent = `${calculateAge()[1]}`;
		daysOutput.textContent = `${calculateAge()[2]}`;
	} else return;
});
