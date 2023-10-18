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
const nav = document.querySelector("nav");

const hideNavBar = () => {
	header.classList.remove("nav-show");
	header.classList.add("nav-hide");
	nav.classList.remove("active");
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
	const navLinks = document.querySelector(".nav-links");

    // Function to toggle the 'active' class on the navigation links
    const toggleNav = (event) => {
        // Prevent the default click behavior
        event.preventDefault();

        // Toggle the 'active' class on navLinks
        console.log("before: " + nav.classList.contains("active"))
        nav.classList.toggle("active");
		if (nav.classList.contains("active")) {
            navLinks.style.transform = "translateY(0)";
        } else {
            navLinks.style.transform = "translateY(-100%)"; // Slide back up
        }
		console.log("after: " + nav.classList.contains("active"))
    };

    // Add a click event listener to the hamburger menu
    hamburgerMenu.addEventListener("click", toggleNav);

    // Prevent event propagation on the navLinks element to avoid unintended toggles
    nav.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});

