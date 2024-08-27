// let data =
//     {
//         "event": "onEnable/onDisable",
//         "prefs":
//             {
//                 "opacity": '100'
//             }
//     }

chrome.runtime.onMessage.addListener(data =>
{
    const { prefs } = data
    switch (data.event)
    {
        case 'onEnable':
            handleOnEnable();
            break;
        case 'onDisable':
            handleOnDisable();
            break;
        case 'onSwitchOpacity':
            handleOnSwitchOpacity(prefs);
            break;
        default:
            break;
    }
})

const handleOnEnable = () =>
{
    console.log("Enabled")
}

const handleOnDisable = () =>
{
    console.log("Disabled")
}

const handleOnSwitchOpacity = (prefs) =>
{
    console.log("prefs for opacity received: ", prefs)
    chrome.storage.local.set(prefs)
}