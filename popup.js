
// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

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
    browserAPI.runtime.sendMessage({event: 'onToggleCats', prefs})
    console.log("Sending toggleCats event");
}

function SwitchCatOpacity()
{
    const prefs =
        {
            opacity: opacityDropdown.value
        }
    console.log(opacityDropdown.value);
    browserAPI.runtime.sendMessage({event: 'onSwitchOpacity', prefs})
    console.log("Sending switchOpacity event");
}

function ToggleText()
{
    const prefs =
        {
            toggledText : toggleTextDropdown.value
        }
        console.log(toggleTextDropdown.value);
    browserAPI.runtime.sendMessage({event: 'onToggleText', prefs})
    console.log("Sending toggleText event");
}

//NOTE: Ensures that the opacity preferences will be saved
browserAPI.storage.local.get(["opacity"], (result) =>
{
    const { opacity } = result;

    if(opacity)
    {
        opacityDropdown.value = opacity;
    }
})

//NOTE: Ensures that the toggle cats preferences will be saved
browserAPI.storage.local.get(["toggledCats"], (result ) =>
{
    const { toggledCats } = result;

    if(toggledCats)
    {
        toggleCatsDropdown.value = toggledCats;
    }
})

//NOTE: Ensures the the toggle text preferences will be saved
browserAPI.storage.local.get(["toggledText"], (result) =>
{
    const { toggledText } = result;

    if(toggledText)
    {
        toggleTextDropdown.value = toggledText;
    }
})
