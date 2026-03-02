    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const button = item.querySelector(".accordion-btn");

        button.addEventListener("click", () => {

            // Close all first
            accordionItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove("active");
                }
            });

            // Toggle current
            item.classList.toggle("active");
        });
    });

const form = document.getElementById("consultantForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const consultant = document.getElementById("consultant").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    statusText.classList.remove("success", "error");

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!consultant) {
        showError("Please select a consultant.");
        return;
    }

    if (!emailPattern.test(email)) {
        showError("Invalid email address.");
        return;
    }

    if (message.length < 10) {
        showError("Message must be at least 10 characters.");
        return;
    }

    // Simulated success
    showSuccess("Message sent successfully!");

    form.reset();
});

function showSuccess(message) {
    statusText.textContent = message;
    statusText.classList.add("success");
}

function showError(message) {
    statusText.textContent = message;
    statusText.classList.add("error");
}