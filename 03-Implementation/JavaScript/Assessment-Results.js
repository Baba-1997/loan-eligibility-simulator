
const assessmentData = JSON.parse(
    sessionStorage.getItem("assessmentData")
);

if (!assessmentData) {
    alert("No assessment data found. Please enter your financial details first.");
    window.location.href = "Financial-Details.html";
} else {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(amount);
    };

    document.getElementById("monthly-repayment").textContent =
        formatCurrency(assessmentData.monthlyPayment);

    document.getElementById("total-repayment").textContent =
        formatCurrency(assessmentData.totalPayment);

    document.getElementById("remaining-income").textContent =
        formatCurrency(assessmentData.remainingIncome);

    document.getElementById("result-income").textContent =
        formatCurrency(assessmentData.income);

    document.getElementById("result-expenses").textContent =
        formatCurrency(assessmentData.expenses);

    document.getElementById("result-existing-debt").textContent =
        formatCurrency(assessmentData.existingDebt);

    document.getElementById("result-loan-amount").textContent =
        formatCurrency(assessmentData.loanAmount);

    document.getElementById("result-repayment-term").textContent =
        assessmentData.repaymentTerm + " months";

    const resultHeading = document.getElementById("result-heading");
    const resultMessage = document.getElementById("result-message");

    if (assessmentData.isAffordable) {
        resultHeading.textContent = "You could be eligible for a loan";

        resultMessage.textContent =
            "Based on the financial information you provided, your estimated monthly repayment falls within this simulator's affordability limit. This is an initial estimate, not a loan approval. A formal application would be subject to further assessment.";
    } else {
        resultHeading.textContent = "You may not be eligible for this loan";

        resultMessage.textContent =
            "Based on the financial information you provided, your estimated monthly repayment exceeds this simulator's affordability limit. You could consider a lower loan amount or a longer repayment term to reduce your estimated monthly repayment.";
    }
}
