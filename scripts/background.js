chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        response = "";

        if (request.type) {
            switch (request.type) {
                case "notification":
                    response = request.content; // debugging
                    // Create a simple text notification:
                    var notify = chrome.notifications.create(
                        '', { iconUrl: '../yeeticon.png', ...request.content },
                        (id) => {
                            setTimeout(() => {
                                chrome.notifications.clear(id);
                            }, 5000);
                        }
                    );
            }
        } else {
            response = "Something went wrong while invoking bg script";
        }

        sendResponse({
            returnMsg: response
        });
    });