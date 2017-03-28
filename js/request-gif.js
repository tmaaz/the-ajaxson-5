

$(document).ready(function()
    {
        // register fetchAndDisplayGif() the "callback" triggered by the form's submission event
        $("#form-gif-request").submit(fetchAndDisplayGif);
    });

// ping Giphy.com for a random GIF using the search term + "jackson 5", and update the DOM to display the result
function fetchAndDisplayGif(event)
    {

        // prevent sending a request and refreshing the page
        event.preventDefault();

        // get the user's input text from the DOM
        var searchQuery = ""; // TODO should be e.g. "dance"

        // API request params
        var params =
            {
                api_key: "dc6zaTOxFJmzC",
                tag : "" // TODO should be e.g. "jackson 5 dance"
            };

        // API request for random GIF
        $.ajax(
            {
                url: "https://api.giphy.com/v1/gifs/random",
                data: params,
                success: function(response)
                    {
                        // TEST - ensure that we're getting feedback from the server
                        console.log("we received a response!", response);

                        // TODO
                        // 1. set the source attribute of our image to the image_url of the GIF
                        // 2. hide the feedback message and display the image
                    },
                error: function()
                    {
                        $("#feedback").text("Sorry, could not load GIF. Try again!");
                        setGifLoadedStatus(false);
                    }
            });

        // TODO -- give the user a "Loading..." message while they wait

    }

// toggles UI element visibility, based on whether a GIF is currently loaded
function setGifLoadedStatus(isCurrentlyLoaded)
    {
        $("#gif").attr("hidden", !isCurrentlyLoaded);
        $("#feedback").attr("hidden", isCurrentlyLoaded);
    }
