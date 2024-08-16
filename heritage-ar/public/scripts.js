document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signup-btn");
    const modal = document.getElementById("signup-modal");
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    signupBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(signupForm);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Sign-up successful!");
                modal.style.display = "none";
                signupForm.reset();
            } else {
                alert("Error during sign-up. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error during sign-up. Please try again.");
        }
    });

    // Load leaderboard data
    if (document.getElementById("leaderboard-table")) {
        loadLeaderboard();
    }
});

async function loadLeaderboard() {
    try {
        const response = await fetch("/leaderboard");
        const leaderboard = await response.json();
        const leaderboardTable = document.getElementById("leaderboard-table").querySelector("tbody");
        leaderboardTable.innerHTML = "";

        leaderboard.sort((a, b) => b.points - a.points);

        leaderboard.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.points}</td>
            `;
            leaderboardTable.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}