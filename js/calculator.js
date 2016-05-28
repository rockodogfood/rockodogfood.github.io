var text = '{"Options":[{"Weight":5,"Price":"5.04"},{"Weight":10,"Price":"9.80"},{"Weight":15,"Price":"11.90"},{"Weight":20,"Price":"16.10"},{"Weight":25,"Price":"20.30"},{"Weight":30,"Price":"24.50"},{"Weight":35,"Price":"28.00"},{"Weight":40,"Price":"30.80"},{"Weight":45,"Price":"33.60"},{"Weight":50,"Price":"35.70"},{"Weight":55,"Price":"39.20"},{"Weight":60,"Price":"40.60"},{"Weight":65,"Price":"44.10"},{"Weight":70,"Price":"48.30"}]}';

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
            $(this).find('.ui-slider-handle').text(ui.value + "kg");
            weightOption = ui.value / 5 - 1;
        },
        create: function(event, ui) {
           var v=$(this).slider('value');
           $(this).find('.ui-slider-handle').text(v + "kg");
       }
    });

    $("#calculate").click(function() {
        $("#confirmation").hide();

        $("#price-output").show();
        document.getElementById("price").innerHTML = "From $" + obj.Options[weightOption].Price.toFixed(2) + " / week";
        //document.getElementById("age").innerHTML = "";
    });

    $("#preorder").click(function(){
        $("#price-output").fadeOut(1000);
        $("#confirmation").fadeIn(1000);


        var order = document.getElementById("name-tf").value + "," + document.getElementById("email-tf").value + "," + weightOption.toString();
        ga('send', 'event', 'Calculator', 'Confirm Purchase', order, 0, null);
    });


});
