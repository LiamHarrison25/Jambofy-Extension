(() =>
    {
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
    }
)();