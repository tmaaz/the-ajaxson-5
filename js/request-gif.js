
$(document).ready(function()
    {
        $(function()
        {
            // button that displays captcha box when clicked (then button dissappears)
            $("#gifgetter").one('click', function()
                {
                    $("#captcha").slideDown();
                    $("#gifgetter").attr('hidden', 'true');
                    return false;
                });
        });
    });


/* WORK-AROUND -- .on('click') binds a new event handler each time it is used,
* and CAN NOT be over-ridden, which means that each time the button is
* clicked and a GIF is requested via the API, it is actually pulling
* 1, 2, 3, 4, 5, 6, etc. gifs with each successive button-click,
* adding unnecessary calls on the API server as well as making this
* project lag considerably with each additional click, as it continues
* to request more and more elements from the API server. To acoid this,
* the click-listening has been pushed off to the HTML, with an 'onlick'
* within the HTML, which fires up the following function when clicked
*/

// function to actually check the captcha input, and either deny access or send API call
function noneShallPass()
    {
        var capCheck = '';
        capCheck = $('#capanswer').val().toUpperCase();
        if (capCheck == "TEN" || capCheck == "10")
            {
                // captcha is correct, call the function to make the AJAX API call
                fetchAndDisplayGif();
            }
        else  // deny access because the captcha was incorrect

            {
                // make the necessary content containers visible
                $("#feedback").removeAttr("hidden");
                $("#gif").removeAttr("hidden");

                // inject content into the containers
                $("#feedback").text("I knew it! You're a robot!!");
                $('#gif').attr('src', 'img/goodday.jpg');
            }
    }


// function to ping Giphy.com for a random GIF using the search term + "jackson 5", and update the DOM to display the result
function fetchAndDisplayGif()
    {
        // hide the content containers until we know we have something to put in them
        $("#feedback").attr("hidden", true);
        $('#gif').attr('hidden', true);

        // get the user's input text from the DOM
        var searchQuery = "jackson 5 " + $('#getgif').val();

        // API request params
        var urlGiphy = "http://api.giphy.com/v1/gifs/random";
                urlGiphy += '?' + $.param(
                    {
                        'tag': searchQuery,
                        'limit': 1,
                        'rating': "pg-13",
                        api_key: "dc6zaTOxFJmzC"
                    }
                );

        // API request for random GIF
        $.ajax(
            {
                url: urlGiphy,
                success: function(response)
                    {
                        $('#gif').attr('src', response.data.image_url);
                        $("#loader").attr("hidden", true);
                        setGifLoadedStatus(true);
                    },
                error: function()
                    {
                        $("#feedback").text("Sorry, could not load GIF. Try again!");
                        $("#loader").attr("hidden", true);
                        setGifLoadedStatus(false);
                    }
            });

        $("#gif").attr("hidden", true);
        $("#loader").attr("hidden", false);
    }

// toggles UI element visibility, based on whether a GIF is currently loaded
function setGifLoadedStatus(isCurrentlyLoaded)
    {
        $("#gif").attr("hidden", !isCurrentlyLoaded);
        $("#feedback").attr("hidden", isCurrentlyLoaded);
    }
