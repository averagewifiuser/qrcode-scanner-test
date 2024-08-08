let html5QrCode = new Html5Qrcode("reader");

        function onScanSuccess(decodedText, decodedResult) {
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