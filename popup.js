
//Elements:
const opacityDropdown = document.getElementById("opacity");
const toggleCatsDropdown = document.getElementById("toggleCats");
const toggleTextDropdown = document.getElementById("toggleText")

opacityDropdown.onchange = SwitchCatOpacity;
toggleCatsDropdown.onchange = ToggleCats;
toggleTextDropdown.onchange = ToggleText;

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

function ToggleText()
{
    const prefs =
        {
            toggledText : toggleTextDropdown.value
        }
        console.log(toggleTextDropdown.value);
    chrome.runtime.sendMessage({event: 'onToggleText', prefs})
    console.log("Sending toggleText event");
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

//NOTE: Ensures that the toggle cats preferences will be saved
chrome.storage.local.get(["toggledCats"], (result ) =>
{
    const { toggledCats } = result;

    if(toggledCats)
    {
        toggleCatsDropdown.value = toggledCats;
    }
})

//NOTE: Ensures the the toggle text preferences will be saved
chrome.storage.local.get(["toggledText"], (result) =>
{
    const { toggledText } = result;

    if(toggledText)
    {
        toggleTextDropdown.value = toggledText;
    }
})
