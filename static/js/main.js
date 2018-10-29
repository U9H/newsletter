"use strict";

var app = (function() {

    // Implements functionality of email signup forms
    function attachActionToEmailSignup() {
        document.querySelectorAll('.email-signup').forEach(el => {
            var emailStartButtons = el.querySelectorAll('.email-start-button');
            emailStartButtons.forEach(bt => {
                // define some common elements
                var form = el.querySelector('.email-form');
                var input = form.querySelector('input[type=email]')
                var submitButton = form.querySelector('input[type=submit]')
                var finish = el.querySelector('.email-finish');

                // add listen for click on initial button
                bt.addEventListener("click", function() {
                    // Hide the button
                    this.classList.add("display-none");
                    // Show the form
                    form.classList.remove("display-none");
                    input.focus();
                    // override the form submit 
                });

                // override listener for the submit form event
                form.onsubmit = function(e){
                    e.preventDefault();
                    // get data values
                    var prefix = form.dataset.prefix;
                    var uid = form.dataset.uid;
                    var id = form.dataset.id;
                    // serialize and submit to mailchimp
                    var req = ajax({
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        url: 'https://' + prefix  + '.list-manage.com/subscribe/post?u=' + uid + '&amp;id=' + id,
                        data: "EMAIL=" + input.value,
                    }).always(function(response, xhr) {
                        // we will get an error saying CORS failed... however, the signup still goes through.  IDK why!
                        // Anyways, we will assume we got a good response (since we should as long as the email is valid.)
                        // This is definitely a hack, so TODO fix this.
                        form.classList.add("display-none");
                        // show "thank you"
                        finish.classList.remove("display-none");
                    });
                    return false;
                };
            });      
        });
    }

    // Initializing everything that needs to be initialized
    window.addEventListener("load", function() {
        attachActionToEmailSignup();
    });
})();



/*
<!-- Begin Mailchimp Signup Form --></div>
<div id="mc_embed_signup">
    <div id="mc_embed_signup_scroll">
	
<div class="mc-field-group">
	<label for="mce-EMAIL">Email Address </label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
</div>
	<div id="mce-responses" class="clear">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_7d95c50d4419888f846703410_de6298b77b" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->
*/