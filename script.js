function toggleNotif() {
    var box = document.getElementById("notifBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

const postCreated = new Date("2026-03-01T12:00:00");

function updateTime() {
    const now = new Date();
    const diff = Math.floor((now - postCreated) / 1000);
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    document.getElementById("postDate").innerText =
        postCreated.toDateString();

    if (minutes < 60) {
        document.getElementById("timeAgo").innerText =
            minutes + " minutes ago";
    } else if (hours < 24) {
        document.getElementById("timeAgo").innerText =
            hours + " hours ago";
    } else {
        document.getElementById("timeAgo").innerText =
            days + " days ago";
    }
}

setInterval(updateTime, 60000);
updateTime();


function likePost() {
    let button = document.querySelector(".post-actions button");
    let count = document.getElementById("likeCount");

    if (button.classList.contains("liked")) {
        return;
    }

    count.innerText = parseInt(count.innerText) + 1;

    button.classList.add("liked");
    button.disabled = true;
}


function addComment() {
    let name = document.getElementById("commentName");
    let input = document.getElementById("commentInput");
    let list = document.getElementById("commentList");

    if (input.value.trim() !== "" && name.value.trim() !== "") {

        let commentBox = document.createElement("div");
        commentBox.className = "comment-box";

        let now = new Date();
        let timeString = now.toLocaleString();

        commentBox.innerHTML = `
            <strong>${name.value}</strong>
            <small>${timeString}</small>
            <p>${input.value}</p>
        `;

        list.prepend(commentBox);

        input.value = "";
        name.value = "";
    }
}

function goBack() {
    window.history.back();
}

function hireConsultant(name) {
    document.getElementById("consultantName").value = name;
    document.getElementById("consultForm").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("consultForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const consultant = document.getElementById("consultantName").value;
    const message = document.getElementById("consultMessage").value;

    const output = document.getElementById("messageOutput");

    const newMessage = document.createElement("div");
    newMessage.classList.add("sent-message");
    newMessage.innerHTML = `
        <strong>To ${consultant}</strong>
        <p>${message}</p>
    `;

    output.prepend(newMessage);

    document.getElementById("consultMessage").value = "";
});

document.getElementById("contactForm").addEventListener("submit", function(e) {

    const phone = document.querySelector("input[name='phone']").value;
    const date = document.querySelector("input[name='date']").value;

    const today = new Date().toISOString().split("T")[0];

    // Check if phone matches PH format
    const phoneRegex = /^(09|\+639)\d{9}$/;

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid Philippine phone number (09XXXXXXXXX).");
        e.preventDefault();
        return;
    }

    // Prevent past date booking
    if (date < today) {
        alert("Please select a valid future date.");
        e.preventDefault();
        return;
    }

});
