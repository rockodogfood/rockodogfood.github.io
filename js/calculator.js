var text = '{"Options":[{"Weight":5,"Price":21.6},{"Weight":10,"Price":42},{"Weight":15,"Price":51},{"Weight":20,"Price":69},{"Weight":25,"Price":87},{"Weight":30,"Price":105},{"Weight":35,"Price":120},{"Weight":40,"Price":132},{"Weight":45,"Price":144},{"Weight":50,"Price":153},{"Weight":55,"Price":168},{"Weight":60,"Price":174},{"Weight":65,"Price":189},{"Weight":70,"Price":207}]}';

obj = JSON.parse(text);
weightOption = 0;

$(document).ready(function() {
    // Slider to select weight
    $( "#slider" ).slider({
        range: "min",
        value: 5,
        min: 5,
        max: 70,
        step: 5,
        slide: function( event, ui ) {
            $( "#weight-value" ).val(ui.value );
            weightOption = ui.value / 5 - 1;
            // console.log(ui.value);
        }
    });

    $("#calculate").click(function() {
        $("#price-output").show();
        document.getElementById("price").innerHTML = "From $" + obj.Options[weightOption].Price + " / week";
        document.getElementById("age").innerHTML = "";
    })


    ga('send', 'event', 'Calculator', 'Confirm Purchase', '', 'these are the details for the event!', null);
});
