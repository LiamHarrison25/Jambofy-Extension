
//Elements:
const enableButton = document.getElementById("enable");
const disableButton = document.getElementById("disable");


//SECTION: Opacity Slider
// const slider = document.getElementById("myRange");
// const output = document.getElementById("demo");
// output.innerHTML = slider.value;
//
// slider.oninput = (e) => {
//     output.innerHTML = e.target.value;
// }

//SECTION: Toggle Button

var imagesEnabled = true;

enableButton.onclick = ToggleImages;

disableButton.onclick = ToggleImages;

function ToggleImages(event)
{
    console.log("toggles the images");
    imagesEnabled = !imagesEnabled;
}

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


