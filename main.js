(() =>
    {
        const imageFilePath = "images/";


        let youtubeLeftControls, youtubePlayer;
        let currentVideo = ""; //stores the current video
        chrome.runtime.onmessage.addListener((obj, sender, response) =>
        {
            const { type, value, videoId } = obj;

            if (type == "NEW")
            {
                currentVideo = videoId;
                newVideoLoaded();
            }
        })

        //NOTE: The purpose of this function is to get all YouTube thumbnails on the page
        function getThumbnails()
        {
            //TODO: Implement
        }

        //NOTE: The purpose of this function is to apply the thumbnail images to the thumbnails on YouTube.com
        function applyThumbnails()
        {
            //TODO: Implement
        }

        //NOTE: The purpose of this function is to take in a max number, and return a random number from 0 to that max number
        function getRandomInt(max)
        {
            return Math.floor(Math.random() * max);
        }

        //NOTE: The purpose of this function is to get a random image to display
        function getRandomImage()
        {
            //NOTE: percent is even across the board for any given image to be chosen
            //TODO: Implement
        }

        //NOTE: The purpose of this function is to randomly determine whether or not to flip the image or not
        function getImageState()
        {
            //NOTE: percent to flip is 50%

            let random = 0;
            random = getRandomInt(2); //returns either 0 or 1 randomly

            if(random === 1)
            {
                return true; //STATE: flip image
            }
            else
            {
                return false; //STATE: do not flip image
            }

        }

    }
)();