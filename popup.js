
//Elements:
const enableButton = document.getElementById("enable");
const disableButton = document.getElementById("disable");
const opacityDropdown = document.getElementById("opacity");

enableButton.onclick = Enable;
disableButton.onclick = Disable;
opacityDropdown.onclick = SwitchCatOpacity;

function Enable()
{

    chrome.runtime.sendMessage({event: 'onEnable'})
    console.log("Sending enable event");
    //TODO: Connect to main.js to toggle the cats
}

function Disable()
{
    chrome.runtime.sendMessage({event: 'onDisable'})
    console.log("Sending disable event");
}

function SwitchCatOpacity()
{
    const prefs =
        {
            opacity: opacityDropdown.value
        }
    console.log(opacityDropdown.value);
    chrome.runtime.sendMessage({event: 'onSwitchOpacity', prefs})
    console.log("Sending switchOpacity event");
    //TODO: Connect to main.js to switch the opacity
}

chrome.storage.local.get(["opacity"], (result) =>
{
    const { opacity } = result;

    if(opacity)
    {
        opacityDropdown.value = opacity;
    }
})

//document.getElementById("ToggleButton").addEventListener('click', ToggleImages);


//Outdated:
// document.addEventListener('DOMContentLoaded', function()
// {
//     var checkPageButton = document.getElementById('DisableButton');
//     checkPageButton.addEventListener('click', function()
//     {
//         chrome.tabs.getSelected(null, function(tab)
//         {
//             alert("Test");
//             var enabledBool = document.getElementById("isEnabled");
//             enabledBool = !enabledBool;
//         });
//     }, false);
// }, false);


