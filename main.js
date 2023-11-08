(() =>
    {
        const imageFilePath = "assets/images/";
        const numImages = 103;
        const flipRandomPercent = 2; //NOTE: the number represents how many numbers to randomly choose. bigger = less likely, smaller = more likely.


        // let youtubeLeftControls, youtubePlayer;
        // let currentVideo = ""; //stores the current video
        // chrome.runtime.onmessage.addListener((obj, sender, response) =>
        // {
        //     const { type, value, videoId } = obj;
        //
        //     if (type == "NEW")
        //     {
        //         currentVideo = videoId;
        //         newVideoLoaded();
        //     }
        // })

        //NOTE: The purpose of this function is to get all YouTube thumbnails on the page
        function getThumbnails()
        {
            const thumbnailQuery = "ytd-thumbnail:not(.ytd-video-preview, .ytd-rich-grid-slim-media) a > yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element),.ytp-videowall-still-image:not([style*='extension:'])";

            const thumbnail = document.querySelectorAll(thumbnailQuery);

            thumbnail.forEach((image) =>
                {
                    let counter = Math.random() > 0.001 ? 1 : 20;
                    let i = 0;
                    for(i = 0; i < counter; i++)
                    {
                        const index = getRandomImage();
                        let flip = getImageState();
                        let url = getImageURL(index);
                        applyThumbnails(image, url, flip);
                    }
                }
            )
        }

        //NOTE: The purpose of this function is to return the url of an image
        function getImageURL(index)
        {
            return chrome.runtime.getURL(`${imageFilePath}${index}.png`);
        }

        //NOTE: The purpose of this function is to apply the thumbnail images to the thumbnails on YouTube.com
        function applyThumbnails(image, url, flip = false)
        {
            //TODO: Implement
            if (image.nodeName === "IMG")
            {
                const overlay = document.createElement("img");
                overlay.style.position = "absolute";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.zIndex = "0";
                if(flip)
                {
                    overlay.style.transform = "scaleX(-1)";
                }
                image.style.position = "relative";
                image.parentElement.appendChild(overlay);
            }
            else if (image.nodeName === "DIV")
            {
                image.style.backgroundImage = `url("${url}"), ` + image.style.backgroundImage;
            }
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

            let random = 0;
            random = getRandomInt(numImages + 1); //NOTE: +1 is because max is not inclusive
            return random;
        }

        //NOTE: The purpose of this function is to randomly determine whether or not to flip the image or not
        function getImageState()
        {
            //NOTE: percent to flip is default 50% when flipRandomPercent = 2

            let random = 0;
            random = getRandomInt(flipRandomPercent); //returns a random number from 0 to flipRandomPercent

            if(random === 1)
            {
                return true; //STATE: flip image
            }
            else
            {
                return false; //STATE: do not flip image
            }

        }

        //NOTE: The purpose of this function is to check if an image exists
        async function doesImageExist(index)
        {
            const url = getImageURL(index);

            return fetch(url).then(() =>
            {
                return true
            }).catch(error =>
            {
                return false
            })
        }

        var indexMax;

        async function getMaxIndex()
        {
            let i = 4;

            while (await doesImageExist(i))
            {
                i *= 2;
            }

            let min = i <= 4 ? 1 : i / 2;
            let max = i;

            while (min <= max)
            {
                let mid = Math.floor((min + max) / 2);

                if(await doesImageExist(mid))
                {
                    min = mid + 1;
                }
                else
                {
                    max = mid - 1;
                }
            }
            indexMax = max;
        }

        getMaxIndex().then(() =>
        {
            setInterval(getThumbnails, 100);
        })

    }
)();
