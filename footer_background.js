    document.addEventListener("DOMContentLoaded", function() {
        // Get the user's IPv4 address
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
            const ipAddress = data.ip; 

            // Function to convert a number to 8-bit binary representation
            function toBinary8Bit(number) {
                let binaryString = number.toString(2);
                while (binaryString.length < 8) {
                    binaryString = "0" + binaryString;
                }
                return binaryString;
            }

            // Split the IPv4 address into individual numbers and convert each number to 8-bit binary representation
            const binaryParts = ipAddress.split('.').map(part => toBinary8Bit(parseInt(part)));

            // Create the background colors based on the 8-bit binary representation
            let backgroundColors = "";
            let currentPercentage = 0; // Initialize current percentage

            // Loop through each binary part
            binaryParts.forEach(part => {
                // Loop through each bit in the binary part
                part.split('').forEach(bit => {
                    // Add black or white color based on bit value
                    if (bit === '0') {
                        backgroundColors += `#000000 ${currentPercentage}%,`;
                        currentPercentage += 3.125; // Add 3.125 to current percentage
                        backgroundColors += `#000000 ${currentPercentage}%,`;
                    } else {
                        backgroundColors += `#000001 ${currentPercentage}%,`;
                        currentPercentage += 3.125; // Add 3.125 to current percentage
                        backgroundColors += `#000001 ${currentPercentage}%,`;
                    }
                });
            });

            // Remove the last comma
            backgroundColors = backgroundColors.slice(0, -1);


            // Apply the generated background colors to the footer element
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.background = `linear-gradient(90deg, ${backgroundColors})`;
            } else {
            }
        });
    });
