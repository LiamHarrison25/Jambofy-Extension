
chrome.runtime.onMessage.addListener((data, sender, sendResponse) =>
{
    const { prefs } = data
    switch (data.event)
    {
        case 'onToggleCats':
            handleOnToggleCats(prefs);
            break;
        case 'onSwitchOpacity':
            handleOnSwitchOpacity(prefs);
            break;
        default:
            break;
    }

    sendResponse({status: 'success'});
});

const handleOnToggleCats = (prefs) =>
{
    console.log("Toggle cats in background", prefs)
    chrome.storage.local.set(prefs, () =>
    {
        console.log("Toggle cats saved in local storage");
    });
}

const handleOnSwitchOpacity = (prefs) =>
{
    console.log("prefs for opacity received: ", prefs)
    chrome.storage.local.set(prefs, () =>
    {
        console.log("Opacity saved in local storage");
    });
}
