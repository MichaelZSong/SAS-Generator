$(document).ready(function () {

    var wrapper = $(".container1");
    var add_button = $(".add_form_field1");

    var x = 1;
    $(add_button).click(function (e) {
        e.preventDefault();
        x++;
        $(wrapper).append('<div id=\"class' + x + '\" class=\"container1\"><div class=\"center\"><span class=\"section-labels\">CLASS ' + x + '<\/span><\/div><table class=\"table-row\"><tbody><tr><td class=\"label-area\"><span class=\"labels\">Course Name&#58;<\/span><\/td><td class=\"label-boxes\"><input type=\"text\" class=\"table-input table-input-form\" name=\"className[]\" placeholder=\"Oil and Chalk Pastels\"><\/td><\/tr><\/tbody><\/table><table class=\"table-row\"><tbody><tr><td class=\"label-area\"><span class=\"labels\">Course ID&#58;<\/span><\/td><td class=\"label-boxes\"><input type=\"text\" class=\"table-input table-input-form\" name=\"classID[]\" placeholder=\"136426\"><\/td><\/tr><\/tbody><\/table><table class=\"table-row\"><tbody><tr><td class=\"label-area\"><span class=\"labels\">Day of the Week&#58;<\/span><\/td><td class=\"label-boxes\"><input type=\"text\" class=\"table-input table-input-form\" name=\"classDay[]\" placeholder=\"Tuesdays\"><\/td><\/tr><\/tbody><\/table><table class=\"table-row\"><tbody><tr><td class=\"label-area\"><span class=\"labels\">Start &#38; End Date&#58;<\/span><\/td><td class=\"label-boxes\"><input type=\"text\" class=\"table-input table-input-form\" name=\"classDate[]\" placeholder=\"Jun 14 - Jul 5, 2022\"><\/td><\/tr><\/tbody><\/table><table class=\"table-row\"><tbody><tr><td class=\"label-area\"><span class=\"labels\">Start &#38; End Time&#58;<\/span><\/td><td class=\"label-boxes\"><input type=\"text\" class=\"table-input table-input-form\" name=\"classTime[]\" placeholder=\"6:30 pm - 8:30 pm\"><\/td><\/tr><\/tbody><\/table><table class=\"table-row\"><tbody><tr><td class=\"label-area\"><span class=\"labels\">Link to Course&#58;<\/span><\/td><td class=\"label-boxes\"><input type=\"text\" class=\"table-input table-input-form\" name=\"classLink[]\" placeholder=\"https:\/\/cityofsurrey.perfectmind.com\/...\"><\/td><\/tr><\/tbody><\/table><hr><\/div>'); // add suspect field
    });

    var remove_button = $(".remove_form_field1");
    $(remove_button).click(function (e) {
        e.preventDefault();
        if (x > 1) {
            $("#class" + x).remove();
            x--;
        }
    })
});

function generate() {
    output = document.forms["classesgenerator"].getElementsByTagName("input");

    // multiple length fields
    var className = [];
    var classID = [];
    var classDay = [];
    var classDate = [];
    var classTime = [];
    var classLink = [];

    // make arrays of all the multi-value items
    for (i = 0; i < output.length; i++) {
        if (output[i].name === "className[]") {
            className.push(output[i].value);
        } else if (output[i].name === "classID[]") {
            classID.push(output[i].value);
        } else if (output[i].name === "classDay[]") {
            classDay.push(output[i].value);
        } else if (output[i].name === "classDate[]") {
            classDate.push(output[i].value);
        } else if (output[i].name === "classTime[]") {
            classTime.push(output[i].value);
        } else if (output[i].name === "classLink[]") {
            classLink.push(output[i].value);
        }
    }

    // format the arrays into their final submit format
    var classes = [];
    for (i = 0; i < className.length; i++) {
        classes[i] = "<h4><strong><a href=\"" + classLink[i] + "\">" + className[i] + " (" + classID[i] + ")<\/a><\/strong><\/h4>\r\n<em>" + classDay[i] + ", " + classDate[i] + ", " + classTime[i] + "<\/em>\r\n";
    }

    var classCat = output.classCat.value;

    classes = classes.join("");

    var outputCode = "<h3>" + classCat + ":<\/h3>\r\n&nbsp;\r\n<blockquote>\r\n" + classes + "\r\n&nbsp;<\/blockquote>\r\n\r\n<hr \/>";
    // clean up array printing
    // build final output with pictures or not
    localStorage.setItem('classesOutputCode', outputCode);
    var title = "Generated Code";
    // put output in modal
    var mymodal = $('#myModal');
    mymodal.find('.modal-title').text(title);
    mymodal.find('.modal-body').text(outputCode);
    mymodal.modal('show');

    var copyButton = $('#copy');
    copyButton.onclick = function () { copyToClipboard() };
}

function copyToClipboard() {
    var copyTextArea = $("#modalBody")
    copyTextArea.select();
    document.execCommand("copy");

    // show tooltip
    var copyButton = $('#copy');
    copyButton.attr('data-original-title', 'Copied!').tooltip({ trigger: 'manual' }).tooltip('show');
    // destroy tooltip after 2 seconds
    setTimeout(function () {
        copyButton.tooltip('dispose');
    }, 2000);
}