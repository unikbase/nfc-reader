function log(message) {
    document.getElementById("log").innerHTML += message +"<br/>";
}
 

const nfcPermissionStatus = await navigator.permissions.query({ name: "nfc" });
if (nfcPermissionStatus.state === "granted") {
  // NFC access was previously granted, so we can start NFC scanning now.
  startScanning();
} else {
  // Show a "scan" button.
  document.querySelector("#scanButton").style.display = "block";
  document.querySelector("#scanButton").onclick = event => {
    // Prompt user to allow UA to send and receive info when they tap NFC devices.
    startScanning();
  };
}

async function startScanning(){
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
