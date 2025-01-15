
//Elements:
// const enableButton = document.getElementById("enable");
// const disableButton = document.getElementById("disable");
const opacityDropdown = document.getElementById("opacity");
const toggleCatsDropdown = document.getElementById("toggleCats");

//enableButton.onclick = Enable;
//disableButton.onclick = Disable;
opacityDropdown.onclick = SwitchCatOpacity;
toggleCatsDropdown.onclick = ToggleCats;

function ToggleCats()
{
    const prefs =
        {
            toggledCats : toggleCatsDropdown.value
        }
    console.log(toggleCatsDropdown.value);
    chrome.runtime.sendMessage({event: 'onToggleCats', prefs})
    console.log("Sending toggleCats event");
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
chrome.storage.local.get(["toggledCats"], (result ) =>
{
    const { toggledCats } = result;

    if(toggledCats)
    {
        toggleCatsDropdown.value = toggledCats;
    }
})
