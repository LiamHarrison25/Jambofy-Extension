
//Elements:
// const enableButton = document.getElementById("enable");
// const disableButton = document.getElementById("disable");
const opacityDropdown = document.getElementById("opacity");
const toggleDropdown = document.getElementById("toggle");

//enableButton.onclick = Enable;
//disableButton.onclick = Disable;
opacityDropdown.onclick = SwitchCatOpacity;
toggleDropdown.onclick = ToggleCats;

function ToggleCats()
{
    const prefs =
        {
            toggled : toggleDropdown.value
        }
    console.log(toggleDropdown.value);
    chrome.runtime.sendMessage({event: 'onToggle', prefs})
    console.log("Sending toggle event");
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
}

//NOTE: Ensures that the opacity preferences will be saved
chrome.storage.local.get(["opacity"], (result) =>
{
    const { opacity } = result;

    if(opacity)
    {
        opacityDropdown.value = opacity;
    }
})

//NOTE: Ensures that the toggle preferences will be saved
chrome.storage.local.get(["toggled"], (result ) =>
{
    const { toggled } = result;

    if(toggled)
    {
        toggleDropdown.value = toggled;
    }
})
