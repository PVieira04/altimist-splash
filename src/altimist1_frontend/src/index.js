import { altimist1_backend } from "../../declarations/altimist1_backend";

document.querySelector("#emailForm").addEventListener("submit", async function(event) {
	event.preventDefault(); // Stops page refresh upon form submission.

	const submitButton = event.target.querySelector("#hidden-submit");
	submitButton.setAttribute("disabled", true); // Stops user submitting email address more than once.

	// Wait for email to be saved before moving on.
	const email = await document.getElementById("email").value;

	// Wait for program to check storage before moving on.
	const emailCheck = await altimist1_backend.checkEmail(email);
	let text = "";
	if (emailCheck) {
		text = "Your email address was already in the system... Don't worry! You won't get duplicate emails :)";
	}
	else {
		text = "Your email address has now been added to the mailing list.";
	}
	
	document.getElementById("form-status").textContent = "Loading...";

	await altimist1_backend.addEmail(email);

	document.getElementById("form-status").textContent = text;
	document.getElementById("email").value = "";
	document.getElementById("email").setAttribute("placeholder", "Complete!");
	document.getElementById("email").setAttribute("disabled", true);

})

// Begin JS logic for disappearing Header.

const hideNavBar = () => {
	header.classList.remove("nav-show");
	header.classList.add("nav-hide");
}

const showNavBar = () => {
	header.classList.remove("nav-hide");
    header.classList.add("nav-show");
}

const timeoutTime = 1000;

const main = document.querySelector("main");
const header = document.querySelector("header");
const hoverTriggerArea = document.querySelector(".hover-trigger-area");

let hideNavTimer

let mouseEnterMain = function (event) {
	main.removeEventListener("mouseenter", mouseEnterMain);
	header.removeEventListener("mouseleave", mouseLeaveHeader);
	console.log('cursor enters main area');
	// Add your code to hide the header after a delay
	hideNavTimer = setTimeout(function () { hideNavBar() }, timeoutTime);
};

let mouseLeaveHeader = function (event) {
	main.removeEventListener("mouseenter", mouseEnterMain);
	header.removeEventListener("mouseleave", mouseLeaveHeader);
	console.log('cursor has left the header area');
	hideNavTimer = setTimeout(function () { hideNavBar() }, timeoutTime);
}

hoverTriggerArea.addEventListener("mouseenter", function () {
	console.log('cursor has entered the trigger area');
    showNavBar();

    // Add the mouseover event listener
    main.addEventListener("mouseenter", mouseEnterMain);
	header.addEventListener("mouseleave", mouseLeaveHeader);
});

header.addEventListener("mouseenter", function() {
	console.log("user re-entered header. clear the timers")
	clearTimeout(hideNavTimer);
	main.addEventListener("mouseenter", mouseEnterMain);
	header.addEventListener("mouseleave", mouseLeaveHeader);
})

// End JS logic for disappearing Header.

document.addEventListener("DOMContentLoaded", function () {
    // Select the hamburger menu and navigation links
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const nav = document.querySelector("nav");

    // Function to toggle the 'active' class on the navigation links
    const toggleNav = () => {
        nav.classList.toggle('active');
    };

    // Add a click event listener to the hamburger menu
    hamburgerMenu.addEventListener("click", toggleNav);
});

