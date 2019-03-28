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

    document.querySelector("[type='submit']").addEventListener("click", function() {
        let errors = false;
        
        if (!checkA($('#first_name'))) { errors = true; }
        if (!checkA($('#last_name'))) { errors = true; }
        if (!checkE($('#email'))) { errors = true; }
        if (!checkP($('#phone'))) { errors = true; }
        if (!checkA($('#street'))) { errors = true; }
        if (!checkAN($('#house_no'))) { errors = true; }
        if (!checkA($('#place'))) { errors = true; }
        if (!checkPO($('#postalcode'))) { errors = true; }
        if (!checkPA($('#password'))) { errors = true; }
        if (!checkPA($('#repeat_pass'))) { errors = true; }
        if (!checkV($('#validation'))) { errors = true; }
        
        if (errors) {
            return;
        }
        
        fetch("/api/v1/register", {
            method: 'post',
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
                "firstName" : document.querySelector("#first_name").value,
                "lastName" : document.querySelector("#last_name").value,
                "address" : document.querySelector("#street").value,
                "city" : document.querySelector("#place").value,
                "phone" : document.querySelector("#phone").value,
                "email" : document.querySelector("#email").value,
                "password" : document.querySelector("#password").value,
                "passwordConfirm" : document.querySelector("#repeat_pass").value
            })
        }).then(function(res) {
            return res.json()
        }).then(function(obj) {
            if (typeof obj.success !== "undefined") {
                if (obj.success) {
                    window.location = "/login";
                } else {
                    alert(obj.message);
                }
            }
        });
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
