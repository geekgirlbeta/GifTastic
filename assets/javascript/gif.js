$(document).ready(function () {
    // an array of reaction emotions assigned to the variable topics    
    var topics = ["happy", "sad", "smh"];

    // function to get the gifs using the giphy api
    function getGifs() {
        // getting the attrubute = data-gif of the current element and setting it to the variable giffy
        var giffy = $(this).attr("data-gif");

        // setting up the giphy api call to make a search request, adding the data from the giffy variable and my key with a limit on how many gifs are to be returned.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffy + "&api_key=qky26CtF9aHHQV89IDZhJ562ysYYhTyh&limit=10";

        // AJAX 
        $.ajax({
            // url parameter
            url: queryURL,
            //get method
            method: "GET"
            // .then will run when the previous process is resolved.
        }).then(function(response) {
            var results = response.data;
            // loop through the results of the api call and if the returns have a rating less than an R, it will add all the followind attributes and class.
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var stillGif = results[i].images.fixed_width_still.url;
                    var animatedGif = results[i].images.fixed_width.url;
                    var gifImage = $("<img>");

                    gifImage.attr({
                        "src": stillGif,
                        "data-still": stillGif,
                        "data-animate": animatedGif,
                        "data-state": "still"
                    });
                    gifImage.addClass("gif-image");
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    // adds the gifs to the gifDiv which was made above.
                    $("#gifs").prepend(gifDiv);
                }
            }
        })
    }

    // click handler on the add-reaction is
    $("#add-reaction").on("click", function(event) {
        event.preventDefault();
        // setting the variable to take the value of the id topic-input and trims the white space
        var topic = $("#topic-input").val().trim();
        // pushes the trimmed value above and adds it to the end of the topics array.
        topics.push(topic);
        console.log("Topic: " + topic);
        // resets the topic-input value to an empty string, removes it from the form field.
        $("#topic-input").val('');
        // calls the makeButtons function: see makeButtons function below.
        makeButtons();
    });

    // makeButtons function
    function makeButtons() {
        // empties out the buttons
        $("#buttons").empty();
        // loops through the topics array: this is important because we will be adding to it and will want to ensure all the buttons function
        for (var i = 0; i < topics.length; i++) {
            // setting a variable to the action of making a button with the class of btn.
            var btnTopic = $("<button class='btn'>");
            //adding a class to the button we made.
            btnTopic.addClass("buttonTopic");
            // next two lines add attributes of an id set to topic and each button in topics getting a value of data-gif
            btnTopic.attr("id", "topic");
            btnTopic.attr("data-gif", topics[i]);
            // setting the text of each button 
            btnTopic.text(topics[i]);
            // button click event which takes the getGifs function * getGifs is not called here.
            btnTopic.on("click", getGifs);
            // button div is appended with a new button.
            $("#buttons").append(btnTopic);
        }
    }
    // makeButtons function call.
    makeButtons();

    // document click event *this targets everything on the document with the class of .gif-image
    // this is where we handle clicking the gifs to make them animate or make them still.
    $(document).on("click", ".gif-image", pausingGifs);

    // pauseGifs function
    function pausingGifs() {
        // getting the data-state attribute of the current element
        var state = $(this).attr("data-state");
        // checking if the state of the element is exactly equal to the attribute still.
        // if it is, we make the give change to the animate state
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            // if not, we make it still.
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
});












