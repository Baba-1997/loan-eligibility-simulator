const creditEnquiryForm = document.getElementById("credit-enquiry-form");

creditEnquiryForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if(!creditEnquiryForm.checkValidity()){
        creditEnquiryForm.reportValidity();
        return;
    }
    const assessmentData = JSON.parse(
        sessionStorage.getItem("assessmentData")
    );

    if(!assessmentData){
        alert("No assessment data found. Please enter your financial details first");
        window.location.href = "Financial-Details.html";
        return;
    }

   if(assessmentData.isAffordable === true){
    window.location.href = "Assessment-Result.html";
   } else {
    window.location.href ="Ineligible-Result.html";
   }
});