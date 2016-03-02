chrome.storage.sync.get({    
    enabled: true,
    }, function(items) 
    {
        if(items.enabled)
        {
            var hash_xss_count = 0;

            document.addEventListener('hash_xss_executed', function(e){
               //send message to ext
                hash_xss_count++;
                chrome.extension.sendMessage(hash_xss_count);
                
                chrome.storage.sync.get(null, function(items)
                {
                    if(items.report)
                    {
                        // Send anayltics
                        var origin = encodeURIComponent(window.top.location.href);
                        var url = "https://www.google-analytics.com/collect?v=1&tid=UA-17761407-7&cid=1&t=event&ec=hash_xss&ea=" + origin;
                        
                        var xmlHttp = new XMLHttpRequest();
                        xmlHttp.open("GET", url, true);
                        xmlHttp.send(null);
                    }
                    
                    if(items.audio)
                    {
                        // Audio notification
                        var url = chrome.extension.getURL('alert.mp3');
                        
                        var markup = '<audio autoplay>' + 
                                        '<source src="' + url + '" type="audio/mpeg" />' + 
                                        '</audio>';
                                        
                        var div = document.createElement('div');
                        div.innerHTML = markup;
                        div.setAttribute('style', "display:none;");
                        document.documentElement.appendChild(div);
                    }
                });
                
            }, false);
            
            var payload = '!function(){window.hash_xss_callback=function(){var n=document.createEvent("Event");n.initEvent("hash_xss_executed",!0,!0);document.dispatchEvent(n)}}()';

            // Expose a global callback function to the page
            var iframe = document.createElement('iframe');
            iframe.id = "hash_xss_iframe";
            iframe.setAttribute('style', "display:none;");
            iframe.setAttribute('src',"javascript: top.window.eval.call(top.window,'" + payload + "')");

            document.documentElement.appendChild(iframe);


            // Initially set count to 0
            chrome.extension.sendMessage(0);


            if(location.hash == "")
            {
                location.hash = "#9876'-window.top.hash_xss_callback()-'\"-window.top.hash_xss_callback()-\"";
            }

        }
    
    });

