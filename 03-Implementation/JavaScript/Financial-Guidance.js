
        const assessmentData = JSON.parse(
            sessionStorage.getItem("assessmentData")
        );

        const backButton = document.getElementById("guidance-back");

        if (assessmentData && assessmentData.isAffordable === true) {
            backButton.href = "Assessment-Result.html";
        }