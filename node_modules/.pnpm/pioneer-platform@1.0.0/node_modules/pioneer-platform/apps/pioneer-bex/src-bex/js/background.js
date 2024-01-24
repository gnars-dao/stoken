/*
    Pioneer Platform
      Browser Extension



 */
const TAG = ' | Background | '

/*
    OnStart()
 */
console.log(TAG,"onStart()")
const Hardware = require('@pioneer-platform/pioneer-hardware')

let onStart = async function(){
  try{

    let KEEPKEY = await Hardware.start()
    KEEPKEY.events.on('event', async function(event) {
      //console.log("EVENT: ",event)
    });

    let info = await Hardware.info()
    console.log("info: ",info)

    //get lock status
    let lockStatus = await Hardware.isLocked()
    console.log("lockStatus: ",lockStatus)

    if(!lockStatus){
      //get pubkeys
      let pubkeys = await Hardware.getPubkeys()
      console.log("pubkeys: ",prettyjson.render(pubkeys))
    }

    // Hardware.displayPin()
    //
    // Hardware.getPubkeys()
    //
    //
    // KEEPKEY.events.on('event', async function(event) {
    //     console.log("EVENT: ",event)
    // });
    //
    // //TODO claim from already claimed



  }catch(e){
    console.error(e)
  }
}
onStart()



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.log(TAG,"browserTabUpdated()")
    //bridge.send('browserTabUpdated', { tab, changeInfo })
  }
})

// Background code goes here
chrome.browserAction.onClicked.addListener((/* tab */) => {
  console.log(TAG,"bex clicked()")
  // Opens our extension in a new browser window.
  // Only if a popup isn't defined in the manifest.
  chrome.tabs.create({
    url: chrome.extension.getURL('www/index.html')
  }, (/* newTab */) => {
    // Tab opened.
  })
})
