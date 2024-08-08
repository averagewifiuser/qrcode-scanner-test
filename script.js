let html5QrCode = new Html5Qrcode("reader");

// Retrieve previously scanned QR codes from localStorage or initialize an empty array
let scannedCodes = JSON.parse(localStorage.getItem('scannedCodes')) || [];

// Display the initially stored scanned QR codes
displayScannedCodes();

function onScanSuccess(decodedText, decodedResult) {
    // Check if the QR code has already been scanned
    if (scannedCodes.includes(decodedText)) {
        alert("This QR code has already been scanned.");
    } else {
        // Store the new QR code in the array and localStorage
        scannedCodes.push(decodedText);
        localStorage.setItem('scannedCodes', JSON.stringify(scannedCodes));

        // Update the displayed list of scanned QR codes
        displayScannedCodes();
    }
    document.getElementById('result').textContent = `Scanned result: ${decodedText}`;
}

function onScanError(errorMessage) {
    console.error(`Scan error: ${errorMessage}`);
}

document.getElementById('startButton').addEventListener('click', function() {
    html5QrCode.start(
        { facingMode: "environment" }, // Use rear camera
        {
            fps: 10,    // Frames per second
            qrbox: { width: 250, height: 250 }  // QR code scanning box
        },
        onScanSuccess,
        onScanError
    ).then(() => {
        document.getElementById('startButton').disabled = true;
        document.getElementById('stopButton').disabled = false;
    }).catch((err) => {
        console.error(`Unable to start scanning, error: ${err}`);
    });
});

document.getElementById('stopButton').addEventListener('click', function() {
    html5QrCode.stop().then(() => {
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
        document.getElementById('result').textContent = 'Scan a QR code';
    }).catch((err) => {
        console.error(`Unable to stop scanning, error: ${err}`);
    });
});

// Function to display the scanned QR codes in a list
function displayScannedCodes() {
    const list = document.getElementById('scannedList');
    list.innerHTML = ''; // Clear the existing list

    scannedCodes.forEach((code) => {
        const listItem = document.createElement('li');
        listItem.textContent = code;
        list.appendChild(listItem);
    });
}
