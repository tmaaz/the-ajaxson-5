
$(document).ready(function()
    {
        $(function()
        {
            // displays captcha box when clicked, then button dissappears
            $("#gifgetter").one('click', function()
                {
                    $("#captcha").slideDown();
                    $("#gifgetter").attr('hidden', 'true');
                    return false;
                });

            // check captcha input, and either deny access or send API call
            $("#capbtn").off('click').on('click', function()
                {
                    var capCheck = '';
                    capCheck = $('#capanswer').val().toUpperCase();
                    if (capCheck == "TEN" || capCheck == "10")
                        {
                            $("#feedback").attr("hidden", true);
                            $('#gif').attr('hidden', true);
                            $("#form-captcha").submit(fetchAndDisplayGif);
                        }
                    else
                        {
                            event.preventDefault();
                            $("#feedback").removeAttr("hidden");
                            $("#feedback").text("I knew it! You're a robot!!");
                            $("#gif").removeAttr("hidden");
                            $('#gif').attr('src', 'img/goodday.jpg');
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

        $("#gif").attr("hidden", true);
        $("#loader").attr("hidden", false);
    }

// toggles UI element visibility, based on whether a GIF is currently loaded
function setGifLoadedStatus(isCurrentlyLoaded)
    {
        $("#gif").attr("hidden", !isCurrentlyLoaded);
        $("#feedback").attr("hidden", isCurrentlyLoaded);
    }
