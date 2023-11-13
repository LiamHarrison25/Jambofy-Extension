document.addEventListener('DOMContentLoaded', function()
{
    var checkPageButton = document.getElementById('DisableButton');
    checkPageButton.addEventListener('click', function()
    {
        chrome.tabs.getSelected(null, function(tab)
        {
            alert("Test");
            var enabledBool = document.getElementById("isEnabled");
            enabledBool = !enabledBool;
        });
    }, false);
}, false);
