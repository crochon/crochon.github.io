$(document).ready(function() {
    $(".btn-primary").click(function() {
        var userCode = $(".code-box").val();
        var userId = $("#fname").val().trim();

        if (userCode === "") {
            alert("Please enter some code before submitting.");
            return;
        }

        if (userId === "") {
            alert("Please enter your MTU Username before submitting.");
            return;
        }

        $.ajax({
            url: 'https://webta-dev.cs.mtu.edu/ExperiMat/submission/submit',
            type: 'POST',
            data: {
                userid: userId,
                filename: "submission.m",
                filecontents: userCode
            },
            success: function(response) {
                console.log("Success:", response);

                if (response.length > 0 && response[0].critique) {
                    var critique = response[0].critique;
                    var feedbackText = critique.summary + "\n\n";

                    critique.items.forEach(function(item) {
                        feedbackText += "- " + item.name + ": " + item.text + " (Line: " + item.line + ")\n";
                    });

                    $(".feedback-box").val(feedbackText);
                } else {
                    $(".feedback-box").val("No critique available.");
                }
            },
            error: function(error) {
                console.error("Error:", error);
                $(".feedback-box").val("Error retrieving feedback. Please try again.");
            }
        });
    });
});