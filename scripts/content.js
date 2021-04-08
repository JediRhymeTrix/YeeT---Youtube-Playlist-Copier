chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("something happening from the extension");
    var data = request.data || {};

    var linksList = document.querySelectorAll("a");
    [].forEach.call(linksList, function(header) {
        header.innerHTML = request.data;
    });
    sendResponse({ data: data, success: true });
});

console.log("youtube-playlist-copier loaded!");

$(document).ready(function() {
    console.log("found the buttons");

    let iconUrl = chrome.extension.getURL("assets/clone.png");
    $("#top-level-buttons").append(
        /*html*/
        `<button id="clone-button" style="cursor:pointer; border:none;">
            <img src="${iconUrl}" alt="Clone playlist" title="Clone playlist"
                width="24" height="24" />
            </button>`
    );

    console.log("injected the clone button");

    $('#clone-button').on('click', function() {
        const cloneActionPromise = () => {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(["ytpCloneSrcList", "ytpCloneReqTemplate"], result => {
                    console.log(result);
                    if (result.ytpCloneSrcList && request.ytpCloneReqTemplate) {
                        resolve(result);
                    } else {
                        reject({
                            message: "Please click on the extension icon and complete the steps first.",
                        });
                    }
                });
            })
        }

        cloneActionPromise()
            .then(() => {
                console.log("Cloning completed!");
                chrome.runtime.sendMessage({
                    type: "notification",
                    content: {
                        type: "basic",
                        title: "Success",
                        message: "Cloning completed successfully!",
                    }
                }, (response) => { console.log(response.returnMsg); });
            })
            .catch((err) => {
                console.log("Not ready to clone yet!");
                chrome.runtime.sendMessage({
                        type: "notification",
                        content: {
                            type: "basic",
                            title: "Error while cloning",
                            ...err,
                        },
                    },
                    response => {
                        console.log(response.returnMsg);
                    }
                );
            });
    });
});