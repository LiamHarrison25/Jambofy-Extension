
chrome.runtime.onMessage.addListener((data, sender, sendResponse) =>
{
    const { prefs } = data
    switch (data.event)
    {
        case 'onToggle':
            handleOnToggle(prefs);
            break;
        case 'onSwitchOpacity':
            handleOnSwitchOpacity(prefs);
            break;
        default:
            break;
    }

    sendResponse({status: 'success'});
});

const handleOnToggle = (prefs) =>
{
    console.log("Toggle in background", prefs)
    chrome.storage.local.set(prefs, () =>
    {
        console.log("Toggle saved in local storage");
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
