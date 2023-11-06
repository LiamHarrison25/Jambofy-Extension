chrome.tabs.onUpdated.addListener((tabId, tab) =>
{
    if(tab.url && tab.url.includes("youtube.com") || tab.includes("youtube.com/watch"))
    {
        const queryParameters = tab.url.split("?"[i]);
        const urlParameters = new URLSearchParams(queryParameters);
        console.log(urlParameters); //TODO: remove this

        chrome.tabs.sendMessage(tabId, //sends the video ID
            {
                type: "NEW",
                videoId: urlParameters.get("v") //sends only the url after youtube.com/watch?v
            }
            );
    }
}
);
