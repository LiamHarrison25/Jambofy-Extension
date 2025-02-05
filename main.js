(() =>
    {
        const imageFilePath = "assets/images/";
        const numImages = 209;
        const flipExcludedCutoff = 204; //NOTE: this number represents the cutoff for where the non flippable images start
        const flipRandomPercent = 2; //NOTE: the number represents how many numbers to randomly choose. bigger = less likely, smaller = more likely.

        const schlattNames = "assets/text/schlattNames.txt";
        const schlattNameSearchArray = ["Jschlatt", "jschlatt", "schlatt", "Schlatt", "JSCHLATT", "SCHLATT", "JSchlatt"];

        let numSchlattNames = 0;
        //let schlattNameArray = ["Jcat"];

        //Variables exposed to the popup:
        let isCatsEnabled = true;
        let isTextEnabled = false;
        let opacityPercentage = 100;

        //NOTE: The purpose of this function is to get all YouTube thumbnails on the page
        function getThumbnails()
        {
            if(isCatsEnabled)
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

                            let flip = getImageState(index);

                            let url = getImageURL(index);
                            applyThumbnails(image, url, flip);
                        }
                    }
                )
            }
        }

        //NOTE: The purpose of this function is to get all Youtube titles on the page
        function getTitles()
        {
            if(isTextEnabled)
            {
                const titles = document.querySelectorAll("#video-title-link, #video-title, #title"); //works while watching the video: '#below #title h1'

                titles.forEach( (title) =>
                {
                    let counter = Math.random() > 0.001 ? 1 : 20;
                    let i = 0;
                    for(i = 0; i < counter; i++)
                    {
                        applyTitles(title, editTitle(title));
                    }
                })
            }
        }

        chrome.storage.local.get(["opacity", "toggledCats", "toggledText"], (result) =>
        {
            if(result.opacity)
            {
                opacityPercentage = result.opacity;
            }
            if(result.toggledCats !== undefined)
            {

                const { toggledCats } = result;

                if(typeof toggledCats === "string")
                {
                    switch (toggledCats)
                    {
                        case 'On':
                        {
                            isCatsEnabled = true;
                            break;
                        }
                        case 'Off':
                        {
                            isCatsEnabled = false;
                            break;
                        }
                    }
                }
            }
            if(result.toggledText)
            {
                const { toggledText } = result;

                if(typeof toggledText === "string")
                {
                    switch (toggledText)
                    {
                        case 'On':
                        {
                            isTextEnabled = true;
                            break;
                        }
                        case 'Off':
                        {
                            isTextEnabled = false;
                            break;
                        }
                    }
                }
            }

            setInterval(getThumbnails, 100);
            setInterval(getTitles, 100);
        });

        //Ensures that it updates whenever the user changes it
        chrome.storage.onChanged.addListener((changes, areaName) =>
        {
            if(areaName === 'local')
            {
                if(changes.opacity)
                {
                    if(typeof changes.opacity === "number")
                    {
                        opacityPercentage = changes.opacity.newValue;
                    }
                }

                if(changes.toggledCats !== undefined)
                {
                    if(typeof changes.toggledCats === "string")
                    {
                        switch(changes.toggledCats.newValue)
                        {
                            case 'On':
                            {
                                isCatsEnabled = true;
                                break;
                            }
                            case 'Off':
                            {
                                isCatsEnabled = false;
                                break;
                            }
                        }
                    }
                }
                if(changes.toggledText !== undefined)
                {
                    if(typeof changes.toggledText === "string")
                    {
                        switch(changes.toggledText.newValue)
                        {
                            case 'On':
                            {
                                isTextEnabled = true;
                                break;
                            }
                            case 'Off':
                            {
                                isTextEnabled = false;
                                break;
                            }
                        }
                    }
                }
                setInterval(getThumbnails, 100);
                setInterval(getTitles, 100);
            }
        });

        //NOTE: The purpose of this function is to return the url of an image
        function getImageURL(index)
        {
            return chrome.runtime.getURL(`${imageFilePath}${index}.png`);
        }

        //NOTE: The purpose of this function is to apply the thumbnail images to the thumbnails on YouTube.com
        function applyThumbnails(image, imageUrl, flip = false)
        {
            if (image.nodeName == "IMG")
            {``
                const overlay = document.createElement("img");
                overlay.src = imageUrl;
                overlay.style.position = "absolute";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.zIndex = "0";
                overlay.style.opacity = opacityPercentage / 100.0;

                if(flip)
                {
                    overlay.style.transform = "scaleX(-1)"; //flips the image
                }
                image.style.position = "relative";
                image.parentElement.appendChild(overlay);
            }
            else if (image.nodeName == "DIV")
            {
                image.style.backgroundImage = `url("${imageUrl}"), ` + image.style.backgroundImage;
            }
        }

        //NOTE: The purpose of this function is to apply the text to a title on YouTube.com
        function applyTitles(title, text)
        {
            title.innerText = text;
        }

        //NOTE: The purpose of this function is to check a title for key words and replace them
        function editTitle(title)
        {
            let text = title.innerText; //{ ...title.innerText }; //Creates a copy of the text
            let i = 0;
            for(i = 0; i < schlattNameSearchArray.length; i++)
            {
                if(text.includes(schlattNameSearchArray[i]))
                {
                    //foundName = true;

                    //splits the string to separate out the name
                    let splitString = text.split(schlattNameSearchArray[i]);

                    text = "";

                    //Reconnects the string around the replaced word
                    let j = 0;
                    for(j = 0; j < splitString.length; j++)
                    {
                        //Append the string back together with a random word from the schlatt names

                        text = text.concat(splitString[j]);

                        if(j !== splitString.length - 1)
                        {
                            let replacedName = getRandomSchlattName();
                            let quotes = '"';
                            replacedName = quotes + replacedName + quotes;
                            text = text.concat((replacedName));
                        }
                    }

                }
            }

            text.fontSize = title.fontSize;
            return text;
        }

        //NOTE: The purpose of this function is to get a random schlatt name to replace in a video title
        function getRandomSchlattName()
        {
            let random = 0;
            random = getRandomInt(schlattList.length);

            if(random <= schlattList.length)
            {
                return schlattList[random]; //TODO: Fill this array with names from the .txt file
            }
            else
            {
                return "Jcat";
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
        function getImageState(num)
        {
            //NOTE: percent to flip is default 50% when flipRandomPercent = 2

            //Prevents flipping non-flippable images
            if(num >= flipExcludedCutoff)
            {
                return false;
            }


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

        const schlattList =
            [
                "Bear Schlrills",
                "Bénédictine",
                "Bigfoot",
                "Big Gay Man",
                "Big Guy",
                "big hot man hot sweaty hot big man so hot big very large hot sweaty man",
                "Buddy Holly",
                "Button Man",
                "Cigarette",
                "DEFINITELY NOT GAY",
                "Funny Mic",
                "Furry",
                "Gay",
                "Gay Slut",
                "Homosexual M Jason Schlatum",
                "Hot Gay Man",
                "I only date men",
                "Jared",
                "Jaylor Schwift",
                "Jebediah",
                "J Money",
                "Joe Biden",
                "Jroll Face",
                "Jschitt",
                "Jschlit",
                "Jschlitt",
                "Jschlong",
                "Jschlutt",
                "Jschort",
                "Jschort Simpson",
                "Jshat",
                "Jshit",
                "JShlaticus",
                "Jshmuck",
                "Jsquirt",
                "Jurg",
                "Ladder Man",
                "Logan from Big Time Rush",
                "Ludwig",
                "Mr. Schlog",
                "MY FAVORITE WHITE BOY!",
                "NutSchlack",
                "Perry the schlatypus",
                "REPENT OR BURN IN HELL!",
                "Scat",
                "Schittlestick",
                "Schlab",
                "Schlabberghasted",
                "Schlagg",
                "Schlakers",
                "Schlalcoholic",
                "Schlambled Eggs",
                "Schlambles",
                "Schlambo",
                "Schlamboozled",
                "Schlamega",
                "Schlamera schlens",
                "Schland",
                "Schlart",
                "Schlobama",
                "Schlaticus",
                "Schlatina",
                "Schlatistics",
                "Schlatorious",
                "Schlatpat",
                "Schlatsuni Miku",
                "Schlaumatized",
                "Schlerodichop",
                "Schleroin Addict",
                "Schlesticle",
                "Schleumonoultramicroscopicsilicovolcanoconiosis",
                "Schleven Schleleven",
                "Schliggles",
                "Schlim Jim",
                "Schlitt",
                "Schlobama",
                "Schlock 17",
                "Schlois",
                "Schlomp",
                "Schloney",
                "Schlong",
                "Schlonic the Hedgehog",
                "schloofenschmirtz schlevil schilcorporated",
                "Schlooksmaxxing",
                "Schlop",
                "Schloppenheimer",
                "Schlorm",
                "Schluatese",
                "Schluddle",
                "Schlugn",
                "Schlumbfounded",
                "Schlumpus",
                "Schlungus",
                "Schlunk",
                "Schlunk Schliving",
                "Schlunt",
                "Schlurp",
                "Schlurt",
                "Schlutt the fuck up",
                "Schmellg",
                "Scholarship",
                "Schquidward",
                "Schrinkles",
                "Schteal",
                "Schtonks",
                "Schumpel",
                "Shlantidisestablishmentarianism",
                "Slat",
                "Smag",
                "Squirt",
                "The AI",
                "The Parkour God",
                "The PVP God",
                "The Steel Toe",
                "They thought I was gay",
                "Tomska",
                "Ultraschound",
                "Weezer",
                "⋮ᓭᓵ⍑ꖎᔑℸ ̣ℸ ̣"
            ]
    }
)();
