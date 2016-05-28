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
            reCalcuate();
        },
        create: function(event, ui) {
           var v=$(this).slider('value');
           $(this).find('.ui-slider-handle').text(v + "kg");
       }
    });

    $('#3month-col').click(function() {
        if ( $("#3month").is(':checked') ) {
            $('#6month-col').removeClass('checked');
            $('#12month-col').removeClass('checked');
            $('#3month-col').addClass('checked');
        };
    });
    $('#6month-col').click(function() {
        if ( $("#6month").is(':checked') ) {
            $('#3month-col').removeClass('checked');
            $('#12month-col').removeClass('checked');
            $('#6month-col').addClass('checked');
        };
    });
    $('#12month-col').click(function() {
        if ( $("#12month").is(':checked') ) {
            $('#3month-col').removeClass('checked');
            $('#6month-col').removeClass('checked');
            $('#12month-col').addClass('checked');
        };
    });

    // Listen for changes
    $('input:radio[name="age"]').change(function() {
        reCalcuate();
    });

    $('input:radio[name="activity"]').change(function() {
        reCalcuate();
    });


    $("#preorder").click(function(event){
        event.preventDefault();
        $("#price-output").fadeOut(500);
        $("#confirmation").fadeIn(500);

        writeNewPost();
    });

    function reCalcuate() {
        var price = obj.Options[weightOption].Price;
        price = applyAge(price);
        price = applyActivity(price);

        var threeMonthPrice = price * 1.02;
        var sixMonthPrice = price * 1;
        var twelveMonthPrice = price * 0.98;

        //Edit 3 boxes values.
        document.getElementById("3month-price").innerHTML = "$" + (threeMonthPrice).toFixed(2) + " / week";
        document.getElementById("6month-price").innerHTML = "$" + (sixMonthPrice).toFixed(2) + " / week";
        document.getElementById("12month-price").innerHTML = "$" + (twelveMonthPrice).toFixed(2) + " / week";
    };

    function applyAge(value) {
        var size = $('input[name="age"]:checked').val();
        if (size === "Puppy") {
            value = value * 0.98;
        } else if (size == "Adult") {
            value = value;
        } else { //Senior
            value = value * 1.02;
        }
        return value;
    };

    function applyActivity(value) {
        var activity = $('input[name="activity"]:checked').val()
        if (activity === "Less") {
            value = value * 0.95;
        } else if (activity == "Normal") {
            value = value;
        } else { //Active
            value = value * 1.05;
        }
        return value;
    };

    function writeNewPost() {
        // A post entry.
        var postData = {
            name: document.getElementById("name-tf").value ,
            email: document.getElementById("email-tf").value,
            price: obj.Options[weightOption].Price,
            weight: (weightOption + 1) * 5 ,
            orderTime: new Date(),
            age: $('input[name="age"]:checked').val(),
            activity: $('input[name="activity"]:checked').val()
        };

      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('orders').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/orders/' + newPostKey] = postData;

      return firebase.database().ref().update(updates);
    };




});
