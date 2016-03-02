var optionsObj = {
    enabled: true,
    report: true,
    audio: true
};

$(function() {
    
    $("#enabled").click(function(e)
    {
        e.preventDefault();
        
        chrome.storage.sync.get(optionsObj, function(item)
        {
            // Toggle value
            var newValue = (item['enabled']) ? false : true;
            chrome.storage.sync.set({enabled: newValue});
            
            $("#enabled img").toggle();
        });
    });
    
    $("input[type=checkbox]").change(function(e)
    {
        e.preventDefault();
        
        var id = $(this).attr("id");
        var checked = $(this).is(':checked');
        
        var options = {};
        options[id] = checked;
        
        chrome.storage.sync.set(options);
       
    });
    

    // Initially set values
    chrome.storage.sync.get(optionsObj, function(items)
    {
        var enabledIconId = (items['enabled']) ? "#icon_enabled" : "#icon_disabled";
        
        $(enabledIconId).show();
        
        $("input[type=checkbox]").each(function(i, e)
        {
            var id = $(e).attr("id");
            var checked = (items[id]) ? true : false;
            
            $(e).prop('checked', checked);
        });
    });
});
