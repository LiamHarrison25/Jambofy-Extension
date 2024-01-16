(() =>
    {
        const imageFilePath = "assets/images/";
        const numImages = 103;
        const flipRandomPercent = 2; //NOTE: the number represents how many numbers to randomly choose. bigger = less likely, smaller = more likely.
        var isEnabled = true;

        //NOTE: The purpose of this function is to get all YouTube thumbnails on the page

        function getThumbnails()
        {
            let thumbnails = [];

            function pullThumbnail(query, type) {

                const thumbnails_recieved = document.querySelectorAll(query);

                thumbnails_recieved.forEach( thumbnail => {

                    thumbnails.push({
                        image: thumbnail,
                        type: type,
                        index: null, flip: null, url: null
                    });

                })
            }

            let default_ignorables = [".ytd-compact-station-renderer", ".ytd-station-renderer"]

            pullThumbnail(
                query = `ytd-thumbnail:not(.ytd-video-preview, .ytd-rich-grid-slim-media, .ytd-reel-item-renderer, ${default_ignorables.join()} ) a > yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element),.ytp-videowall-still-image:not([style*='extension:'])`,
                type = "standard_video"
            ) // This query selects all yt thumbnails that are regular videos. (rich-grid-media, grid-video-renderer, compact-video-renderer)

            pullThumbnail(
                query = `ytd-thumbnail:not(.ytd-video-preview, .ytd-rich-grid-media, .ytd-video-renderer, .ytd-grid-video-renderer, .ytd-compact-video-renderer, .ytd-playlist-panel-video-renderer, ${default_ignorables.join()} ) a > yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element),.ytp-videowall-still-image:not([style*='extension:'])`,
                type = "shorts_video"
            ) // This query selects all yt thumbnails that are shorts (rich-grid-slim-media). Note that this also works for reel-items.

            pullThumbnail(
                query =  `ytd-playlist-video-thumbnail-renderer:not(${default_ignorables.join()}) yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element),.ytp-videowall-still-image:not([style*='extension:'])`,
                type = "standard_video"
            ) // This query selects all yt playlist thumbnails, treats them as standard thumbnails

            // Images that cut off / originate at the top will look bad. These are those images. It's not necessary but more of a QOL fix.
            let images_cut_off_at_the_top = [12, 23, 93, 6];

            thumbnails.forEach((thumbnail) =>
                {   
                    let counter = Math.random() > 0.001 ? 1 : 20;
                    let i = 0;
                    for(i = 0; i < counter; i++)
                    {        

                        // Sometimes standard videos can be standardized shorts thumbnails ( shorts in the dimensions of a standard video )
                        if (thumbnail.type == "standard_video" && thumbnail.image.parentNode.parentNode.children[1]?.children[0]?.attributes[1]?.value == "SHORTS")
                        {
                            thumbnail.type = "standardized_shorts_video"
                            console.log(thumbnail.image)
                        } 

                        if (thumbnail.type != "standard_video") thumbnail.index = getRandomImage(ignore = images_cut_off_at_the_top); // Only standard videos don't need to disinclude images that cut off at the top.
                        else thumbnail.index = getRandomImage()
                        
                        thumbnail.flip = getImageState();
                        thumbnail.url = getImageURL(thumbnail.index);

                        applyThumbnail(thumbnail);
                        
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
        function applyThumbnail(thumbnail)
        {

            if (thumbnail.image.nodeName == "IMG")
            {
                const overlay = document.createElement("img");

                switch(thumbnail.type) {

                    case "shorts_video":
                        overlay.src = thumbnail.url;
                        overlay.style.position = "absolute";
                        overlay.style.top = "37.5%";
                        if (thumbnail.flip) overlay.style.left = "0";
                        else overlay.style.right = "0";
                        overlay.style.width = "175%";
                        overlay.style.height = "65.625%";
                        overlay.style.zIndex = "0";
                        break;

                    case "standard_video":
                        overlay.src = thumbnail.url;
                        overlay.style.position = "absolute";
                        overlay.style.top = "0";
                        overlay.style.left = "0";
                        overlay.style.right = "0";
                        overlay.style.width = "100%";
                        overlay.style.height = "100%";
                        overlay.style.zIndex = "0";
                        break;
                    
                    case "standardized_shorts_video":
                        overlay.src = thumbnail.url;
                        overlay.style.position = "absolute";
                        overlay.style.top = "65%";
                        if (thumbnail.flip) overlay.style.left = "34%";
                        else overlay.style.right = "34%";
                        overlay.style.width = "48%";
                        overlay.style.height = "35%";
                        overlay.style.zIndex = "0";
                        break;
                    

                }

                if(thumbnail.flip)
                {
                    overlay.style.transform = "scaleX(-1)"; //flips the image
                }

                thumbnail.image.style.position = "relative";
                thumbnail.image.parentElement.appendChild(overlay);

            }
            else if (thumbnail.image.nodeName == "DIV")
            {
                thumbnail.image.style.backgroundImage = `url("${thumbnail.url}"), ` + thumbnail.image.style.backgroundImage;
            }
        }

        //NOTE: The purpose of this function is to take in a max number, and return a random number from 0 to that max number
        function getRandomInt(max)
        {
            return Math.floor(Math.random() * max);
        }

        //NOTE: The purpose of this function is to get a random image to display. It ignores all numbers in `ignore` (array)
        function getRandomImage( ignore = null )
        {
            //NOTE: percent is even across the board for any given image to be chosen

            let random = 0;
            while (random == 0 || ignore?.includes(random)) // If random isn't initialized or if it's a number that's included in ignore, get another random number.
            {
                random = getRandomInt(numImages + 1); //NOTE: +1 is because max is not inclusive
            }
            
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

        //runs the functions
        if(isEnabled) //checks if the user has disabled the plugin or not
        {
            setInterval(getThumbnails, 100);
        }
    }
)();
