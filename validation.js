
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the default form submission
        // Get form field values
        const name = document.querySelector('input[name="name"]').value;
        const subject = document.querySelector('input[name="subject"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;
        console.log(name);
        console.log(subject);
        console.log(email);
        console.log(message);
        // Basic form validation
        if (!name || !email || !message || !subject) {
            alert("All fields are required.", "error");
            return;
        } else if (!validateEmail(email)) {
            alert("Please enter a valid email address", "error");
            return;
        }
        else if (!validateText(name)) {
            alert("Name can't be empty", "error");
            return;
        }
        else if (!validateText(subject)) {
            alert("Subject can't be empty", "error");
            return;
        } else if (!validateText(message)) {
            alert("Message can't be empty", "error");
            return;
        }
        else if(!nameCheck(name))
        {
            alert("Please Enter a valid name", "error");
            return;
        }
        // Data to be sent to the Google Apps Script web app
        const data = {
            subject: subject,
            name: name,
            email: email,
            message: message
        };
        // Replace 'YOUR_WEB_APP_URL' with your Google Apps Script web app URL
        fetch('https://script.google.com/macros/s/AKfycbzWgayOVJHuyZpRQDeqK3MUmcGGEFOvKoIjwYojl3ROQn8iEEaWhLir0qD6zzJZtSG8KQ/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    alert("Form submitted succesfully");
                } else {
                    alert("Error sending message: " + data.message, "error");
                }
            })
            .catch(error => {
                console.error("Error: ", error);
                alert("Error: " + error.message, "error");
            });
    });
    function validateEmail(email) {
        // Trim leading and trailing spaces
        const trimmedEmail = email.trim();

        // Regular expression for validating an email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the trimmed email address against the regular expression
        return emailPattern.test(trimmedEmail) && trimmedEmail === email;
    }
    function validateText(text) {
        const field = text;
        return field.trim().length > 0;

    }
    function nameCheck(name){
        const namePattern = /^[A-Za-z\s]+$/;

        // Trim leading and trailing spaces and check the pattern
        const trimmedName = name.trim();
        return namePattern.test(trimmedName) && trimmedName === name;
    }
});
