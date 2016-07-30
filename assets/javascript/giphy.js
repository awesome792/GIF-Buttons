$(document).ready(function() {
    // your code here

var AllEmotions= ['awesome', 'sad', 'angry', "mad", 'crazy', 'insane', 'amused', 'tired', 'terrified'];

//creates the initial buttons that are in AllEmotions array
function renderButtons(){
    $('#buttonsView').empty(); //empties the div so it doesn't repeat every button
    for (var i = 0; i < AllEmotions.length; i++){ //for the length of AllEmotions array
        var a = $('<button>') //creates the button
        a.addClass('typeEmotion'); //adds class typeEmotion
        a.attr('data-name', AllEmotions[i]);
        a.text(AllEmotions[i]); //adds the name of the emotion to the button
        $('#buttonsView').append(a); //adding it to the div to show on the page
    }

//adds the images
    $('button').on('click', function () {// when the buttons are clicked
            $('#gif').empty(); //clears previous images from div
            var emotion = $(this).data('name'); //gets the name of the emotion
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=dc6zaTOxFJmzC&limit=10"; //link where the image is

            $.ajax({
                url: queryURL,
                method: 'GET'
                })
                .done(function(response) {
                    console.log(response) //logs the object
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        var EmotionDiv = $('<div>'); //creates EmotionDiv
                        EmotionDiv.addClass('imagestyling');
                        var p = $('<p>').text("Rating: " + results[i].rating);

                        var EmotionImage = $('<img>');

                        EmotionImage.attr('data-animate', results[i].images.fixed_height.url);
                        EmotionImage.attr('data-still', results[i].images.fixed_height_still.url);
                        EmotionImage.attr('src', results[i].images.fixed_height_still.url);
                        EmotionImage.attr('data-state', "still");

                        EmotionDiv.append(p); //adds rating to the div
                        EmotionDiv.append(EmotionImage); //adds the gif to the div
                        EmotionImage.addClass("TheImage")
                        $('#gif').prepend(EmotionDiv); //adds the div to the page
                    };


                     //change state when image is clicked
                    $(".TheImage").on('click', function(){
                        console.log("works");
                        var state = $(this).attr('data-state');
                        if (state == 'still') {
                        //changes the data-state
                            $(this).attr('data-state',"animate" );
                            //change image to animated gif
                            $(this).attr('src', $(this).data('animate'));
                        }
                        else{
                                //change to still image
                                $(this).attr('src', $(this).data('still'));
                                //changes the data-state
                                $(this).attr('data-state','still' );
                        }
                    });
                });
    });
};

renderButtons();

//adds an emotion button
$('#addEmotion').on('click', function(){
    var emotionText = $('#input').val().trim();
    AllEmotions.push(emotionText);
    renderButtons();
    return false;
});

 });