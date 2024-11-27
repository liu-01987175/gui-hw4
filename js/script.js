$(document).ready(function () {
    // Initialize sliders and synchronize input fields
    function syncSliders() {
        // Synchronize slider and input field
        $("#startRow").val($("#startRowSlider").slider("value"));
        $("#endRow").val($("#endRowSlider").slider("value"));
        $("#startCol").val($("#startColSlider").slider("value"));
        $("#endCol").val($("#endColSlider").slider("value"));
    }

    // Initialize jQuery UI sliders
    $("#startRowSlider").slider({
        min: -50,
        max: 50,
        value: $("#startRow").val(),
        slide: function (event, ui) {
            $("#startRow").val(ui.value);
            validateForm(); // Trigger validation on slider change
        },
    });

    $("#endRowSlider").slider({
        min: -50,
        max: 50,
        value: $("#endRow").val(),
        slide: function (event, ui) {
            $("#endRow").val(ui.value);
            validateForm(); // Trigger validation on slider change
        },
    });

    $("#startColSlider").slider({
        min: -50,
        max: 50,
        value: $("#startCol").val(),
        slide: function (event, ui) {
            $("#startCol").val(ui.value);
            validateForm(); // Trigger validation on slider change
        },
    });

    $("#endColSlider").slider({
        min: -50,
        max: 50,
        value: $("#endCol").val(),
        slide: function (event, ui) {
            $("#endCol").val(ui.value);
            validateForm(); // Trigger validation on slider change
        },
    });

    // Validate form
    function validateForm() {
        // Trigger validation on form fields
        $("#rangeForm").valid(); // Manually trigger validation for the form
    }

    // Custom validation rule for end value to be greater than or equal to start value
    $.validator.addMethod(
        "greaterThanStart",
        function (value, element, params) {
            // `params` should hold the selector for the related "start" field
            const startValue = parseInt($(params).val());
            const endValue = parseInt(value);

            // Ensure endValue is greater than or equal to startValue
            return !isNaN(startValue) && !isNaN(endValue) && endValue >= startValue;
        },
        "End value must be greater than or equal to start value."
    );

    // jQuery UI validation setup
    $("#rangeForm").validate({
        rules: {
            startRow: {
                required: true,
                min: -50,
                max: 50,
            },
            endRow: {
                required: true,
                min: -50,
                max: 50,
                greaterThanStart: "#startRow", // Compare with `startRow`
            },
            startCol: {
                required: true,
                min: -50,
                max: 50,
            },
            endCol: {
                required: true,
                min: -50,
                max: 50,
                greaterThanStart: "#startCol", // Compare with `startCol`
            },
        },
        messages: {
            startRow: {
                required: "Please enter a starting row.",
                min: "Start row must be between -50 and 50.",
                max: "Start row must be between -50 and 50.",
            },
            endRow: {
                required: "Please enter an ending row.",
                min: "End row must be between -50 and 50.",
                max: "End row must be between -50 and 50.",
                greaterThanStart: "End row must be greater than or equal to start row.",
            },
            startCol: {
                required: "Please enter a starting column.",
                min: "Start column must be between -50 and 50.",
                max: "Start column must be between -50 and 50.",
            },
            endCol: {
                required: "Please enter an ending column.",
                min: "End column must be between -50 and 50.",
                max: "End column must be between -50 and 50.",
                greaterThanStart: "End column must be greater than or equal to start column.",
            },
        },
        submitHandler: function (form, event) {
            event.preventDefault(); // Prevent the form from actually submitting
            generateTable(); // Generate table when form is valid
        },
    });

    // Synchronize input and slider
    $("#startRow").on("input", function () {
        $("#startRowSlider").slider("value", $(this).val());
        validateForm();
    });
    $("#endRow").on("input", function () {
        $("#endRowSlider").slider("value", $(this).val());
        validateForm();
    });
    $("#startCol").on("input", function () {
        $("#startColSlider").slider("value", $(this).val());
        validateForm();
    });
    $("#endCol").on("input", function () {
        $("#endColSlider").slider("value", $(this).val());
        validateForm();
    });

    // Initial synchronization of input fields and sliders
    syncSliders();

    // Define the table generation function
    function generateTable() {
        const startRow = parseInt($("#startRow").val());
        const endRow = parseInt($("#endRow").val());
        const startCol = parseInt($("#startCol").val());
        const endCol = parseInt($("#endCol").val());

        let tableHtml = "<div class='table-container'><table>";

        // Create the header row (first row with column labels)
        tableHtml += "<tr><th></th>";
        for (let col = startCol; col <= endCol; col++) {
            tableHtml += `<th>${col}</th>`;
        }
        tableHtml += "</tr>";

        // Create the table rows
        for (let row = startRow; row <= endRow; row++) {
            tableHtml += `<tr><th>${row}</th>`; // First column (row labels)

            for (let col = startCol; col <= endCol; col++) {
                tableHtml += `<td>${row * col}</td>`; // Show multiplication result
            }
            tableHtml += "</tr>";
        }

        tableHtml += "</table></div>"; // Close table and container

        $("#tab-1").html(tableHtml); // Display the table
    }
});
