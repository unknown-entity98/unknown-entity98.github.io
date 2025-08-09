const currentDate = new Date();

// Format the date as needed, e.g., "Month Day, Year"
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);

// Select all elements with the class 'date'
document.querySelectorAll(".content .post .date")

// Update the second and third date elements with the current date
if (dateElements.length > 1) {
    dateElements[1].innerHTML = formattedDate; // Update the second post
}
if (dateElements.length > 2) {
    dateElements[2].innerHTML = formattedDate; // Update the third post
}
console.log(dateElements);
console.log("Dates updated to: " + formattedDate);
