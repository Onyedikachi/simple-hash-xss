chrome.extension.onMessage.addListener(function(message, sender)
{
    var bgcolor = [190, 190, 190, 230];
    var tabId = sender.tab.id;
    
    if(message > 0)
    {
        bgcolor = [255, 0, 0, 255];
    }
    
    chrome.browserAction.setBadgeBackgroundColor({color:bgcolor, tabId: tabId});
    chrome.browserAction.setBadgeText({text:message.toString(), tabId: tabId});
    
});
