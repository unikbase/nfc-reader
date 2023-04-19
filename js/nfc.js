function log(message) {
    document.getElementById("log").innerHTML += message +"<br/>";
}

async function requestNFCPermission() {
    try {
      const status = await navigator.permissions.request({ name: "nfc" });
      if (status.state === "granted") {
        // Permission granted, start scanning
      } else {
        // Permission denied
        log("NFC permission request denied");
      }
    } catch (error) {
      log(`Error requesting NFC permission: ${error}`);
    }
  }
  
  
async function nfc(){
    await   requestNFCPermission();
    if ('NDEFReader' in window) {
    log("Web NFC is supported");
    const ndefReader = new NDEFReader();
  
    ndefReader.onreading = (event) => {
      log("NFC tag scanned:");
      for (const record of event.message.records) {
        log(`Record type: ${record.recordType}`);
        log(`Record data: ${record.data}`);
      }
    };
  
    try {
      await ndefReader.scan();
      log("NDEFReader started scanning");
    } catch (error) {
        log(`Error starting NDEFReader: ${error}`);
    }
  } else {
    log("Web NFC is not supported");
  }
}

nfc();