
const financialForm = document.getElementById("financial-details-form");
const calculationResults = document.getElementById("calculation-results");

const annualInterestRate = 0.12;
const monthlyInterestRate = annualInterestRate / 12;
const maximumRepaymentPercentage = 0.30;

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR"
    }).format(amount);
};

financialForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!financialForm.checkValidity()) {
        financialForm.reportValidity();
        return;
    }

    const income = Number(document.getElementById("monthly-income").value);
    const expenses = Number(document.getElementById("monthly-expenses").value);
    const existingDebt = Number(document.getElementById("existing-debt").value);
    const loanAmount = Number(document.getElementById("loan-amount").value);
    const repaymentTerm = Number(document.getElementById("repayment-term").value);

    if (
        !Number.isFinite(income) ||
        !Number.isFinite(expenses) ||
        !Number.isFinite(existingDebt) ||
        !Number.isFinite(loanAmount) ||
        income <= 0 ||
        expenses < 0 ||
        existingDebt < 0 ||
        loanAmount < 1000 ||
        loanAmount > 500000 ||
        ![12, 24, 36, 48, 60, 72].includes(repaymentTerm)
    ) {
        alert("Please enter valid financial details. The loan amount must be between R1,000 and R500,000.");
        return;
    }

    const disposableIncome = income - expenses - existingDebt;

    const monthlyPayment = loanAmount * monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -repaymentTerm));

    const totalPayment = monthlyPayment * repaymentTerm;
    const interestAmount = totalPayment - loanAmount;
    const remainingIncome = disposableIncome - monthlyPayment;

    document.getElementById("monthly-repayment").textContent =
        formatCurrency(monthlyPayment);

    document.getElementById("total-interest").textContent =
        formatCurrency(interestAmount);

    document.getElementById("disposable-income").textContent =
        formatCurrency(disposableIncome);

    document.getElementById("remaining-income").textContent =
        formatCurrency(remainingIncome);

    const maximumAffordableRepayment =
        disposableIncome * maximumRepaymentPercentage;

    const isAffordable =
        disposableIncome > 0 &&
        monthlyPayment <= maximumAffordableRepayment;

    const resultHeading = document.getElementById("result-heading");
    const resultMessage = document.getElementById("result-message");

    if (disposableIncome <= 0) {
        resultHeading.textContent =
            "Unaffordable based on your current details";

        resultMessage.textContent =
            "Your expenses and existing debt repayments use all your income or exceed it. You have no disposable income available for the proposed loan.";

    } else if (!isAffordable) {
        resultHeading.textContent =
            "Unaffordable based on your current details";

        resultMessage.textContent =
            "Your estimated monthly repayment exceeds the prototype affordability limit. Consider a lower loan amount or a longer repayment term.";

    } else {
        resultHeading.textContent =
            "Within the prototype affordability limit";

        resultMessage.textContent =
            "Your estimated monthly repayment falls within the prototype affordability limit. This is an educational estimate, not a loan approval.";
    }

    const assessmentData = {
        income: income,
        expenses: expenses,
        existingDebt: existingDebt,
        loanAmount: loanAmount,
        repaymentTerm: repaymentTerm,
        disposableIncome: disposableIncome,
        monthlyPayment: monthlyPayment,
        totalPayment: totalPayment,
        interestAmount: interestAmount,
        remainingIncome: remainingIncome,
        isAffordable: isAffordable
    };

    sessionStorage.setItem(
        "assessmentData",
        JSON.stringify(assessmentData)
    );


    window.location.href = "Credit-Enquiry.html";
});
