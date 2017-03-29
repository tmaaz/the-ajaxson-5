

$(document).ready(function()
    {
        $(function()
        {
            // display the captcha box, and pass the callback to that button
            $("#gifgetter").click(function()
                {
                    $("#captcha").slideDown();
                    $("#gifgetter").attr('disabled', 'disabled');
                    return false;
                });

            // check captcha, then register fetchAndDisplayGif() the "callback" triggered by the form's submission event
            $("#capbtn").click(function()
                {
                    capCheck = $('#capanswer').val().toUpperCase();

                    if (capCheck == "TEN" || capCheck == "10")
                        {
                            $("#feedback").text("");
                            $('#gif').attr('src', '');
                            $("#form-captcha").submit(fetchAndDisplayGif);
                        }
                    else
                        {
                            $("#feedback").text("I knew it! You're a robot!!");
                            $('#gif').attr('src', 'img/goodday.jpg');
                            $("#gif").removeAttr("hidden");
                            $("#feedback").removeAttr("hidden");
                            event.preventDefault();
                        }
                });
        });
    });

// ping Giphy.com for a random GIF using the search term + "jackson 5", and update the DOM to display the result
function fetchAndDisplayGif(event)
    {

        // prevent sending a request and refreshing the page
        event.preventDefault();

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

        $("#gif").attr("src", "");
        $("#loader").attr("hidden", false);
    }

// toggles UI element visibility, based on whether a GIF is currently loaded
function setGifLoadedStatus(isCurrentlyLoaded)
    {
        $("#gif").attr("hidden", !isCurrentlyLoaded);
        $("#feedback").attr("hidden", isCurrentlyLoaded);
    }
