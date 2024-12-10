// Constants
const Qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
const input = document.getElementById("input-text");
const button1 = document.getElementById("btn");
const button2 = document.getElementById("btnd");
const btn_div = document.getElementById("btn_div");
const img = document.getElementById("img");

// QR Code Generation Function
const generateQRCode = () => {
  const inputValue = input.value.trim(); // Remove excess spaces
  if (inputValue) {
    const qrCodeUrl = Qr_code + encodeURIComponent(inputValue); // Generate the QR code URL
    img.classList.add("dis");
    img.src = qrCodeUrl; // Set the QR code as the image source
    img.alt = `QR Code for ${inputValue}`;
    button1.classList.add("mov");
    button2.classList.add("mov");
    btn_div.classList.add("mov");
  } else {
    alert("Please enter valid text to generate a QR code."); // Alert on empty input
  }
};

// QR Code Download Function
const downloadQRCode = async () => {
  const inputValue = input.value.trim();//for removing space
  if (inputValue) {
    const qrCodeUrl = Qr_code + encodeURIComponent(inputValue); // Generate the QR code URL
    try {
      const response = await fetch(qrCodeUrl); // Fetch the QR code image
      const blob = await response.blob(); // Convert the response to a Blob
      const link = document.createElement("a"); // Create a temporary anchor element
      link.href = URL.createObjectURL(blob); // Create a local object URL for the Blob
      link.download = "QRCode.png"; // Set the default file name
      link.click(); // Trigger the download
      URL.revokeObjectURL(link.href); // Clean up the object URL
    } catch (error) {
      alert("Failed to download the QR code. Please try again.");
      console.error("Download error:", error);
    }
  } else {
    alert("Please generate a QR code first.");
  }
};

// Event Listeners
button1.addEventListener("click", generateQRCode);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateQRCode();
  }
});
button2.addEventListener("click", downloadQRCode);