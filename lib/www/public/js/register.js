(function($){
    let checkpattern = (obj, pattern) => {
        if(pattern.test(obj.val())) {
            obj.addClass('valid').removeClass('invalid');
            return true;
        }else{
            obj.addClass('invalid').removeClass('valid');
            return false;
        }
    };
    let checkA = (obj) => {
        let pattern = /[a-zA-Z\.\-\ ]+/;
        return checkpattern(obj, pattern);
    };
    let checkAN = (obj) => {
        let pattern = /[a-zA-Z0-9\.\-\ ]+/;
        return checkpattern(obj, pattern);
    };
    let checkE = (obj) => {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return checkpattern(obj, pattern);
    };
    let checkP = (obj) => {
        let pattern = /(\+)|[0-9]+/;
        return checkpattern(obj, pattern);
    };
    let checkPO = (obj) => {
        let pattern = /[0-9]{4}[A-Za-z]{2}/;
        return checkpattern(obj, pattern);
    };
    let checkPA = (obj) => {
        let pattern = /[0-9A-Za-z\!\@\#\$\%\^\&\*\(\)]+/;
        return checkpattern(obj, pattern);
    };
    let checkV = (obj) => {
        if (obj.val()) {
            obj.addClass('valid').removeClass('invalid');
        }else{
            obj.addClass('invalid').removeClass('valid');
        }
        return obj.val()
    };


    $('#register_form').on( "submit", function( event ) {
        console.log('abc');
        event.preventDefault();
        let errors = false;
        if (!checkA($('#first_name'))) { errors = true; }
        if (!checkA($('#last_name'))) { errors = true; }
        if (!checkE($('#email'), 'string')) { errors = true; }
        if (!checkP($('#phone'), 'string')) { errors = true; }
        if (!checkA($('#street'))) { errors = true; }
        if (!checkAN($('#house_no'))) { errors = true; }
        if (!checkA($('#place'))) { errors = true; }
        if (!checkPO($('#postalcode'), 'string')) { errors = true; }
        if (!checkPA($('#password'), 'string')) { errors = true; }
        if (!checkPA($('#repeat_pass'), 'string')) { errors = true; }
        if (!checkV($('#validation'), 'string')) { errors = true; }

        if (errors) {
            return;
        }


        console.log($('#first_name').val());
        console.log($('#last_name').val());
        console.log($('#email').val());
        console.log($('#phone').val());
        console.log($('#street').val());
        console.log($('#house_no').val());
        console.log($('#place').val());
        console.log($('#postalcode').val());
        console.log($('#password').val());
        console.log($('#repeat_pass').val());
        console.log($('#validation').val());


        console.log( $('#register_form').serialize() );
    });

    submit = () => {


        // check all fields

        let request = $.ajax({
            method: "POST",
            url: "/api/v1/register",
            data: {
                "firstName" : "string",
                "lastName" : "string",
                "address" : "string",
                "city" : "string",
                "phone" : "string",
                "email" : "string",
                "password" : "string",
                "passwordConfirm" : "string"
            }
        });

        request.done(function( msg ) {
            alert( "Data Saved: " + msg );
        });



        // promise return
    }
})(jQuery);
