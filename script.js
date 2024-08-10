// script.js
document.addEventListener('DOMContentLoaded', () => {
    let selectedImages = [];
    let imageElements = document.querySelectorAll('.image-container img');
    let resetButton = document.getElementById('reset');
    let verifyButton = document.getElementById('verify');
    let message = document.getElementById('h');
    let para = document.getElementById('para');

    // Shuffle images and arrange them randomly
    function shuffleImages() {
        let container = document.querySelector('.image-container');
        let imagesArray = Array.from(imageElements);
        imagesArray.sort(() => Math.random() - 0.5);
        imagesArray.forEach(img => container.appendChild(img));
    }

    shuffleImages();

    function resetState() {
        selectedImages = [];
        para.textContent = '';
        para.style.display = 'none';
        verifyButton.style.display = 'none';
        resetButton.style.display = 'none';
        message.textContent = 'Please click on the identical tiles to verify that you are not a robot';
    }

    function handleImageClick(event) {
        let img = event.target;

        if (selectedImages.includes(img)) {
            return; // Ignore double clicks on the same image
        }

        selectedImages.push(img);

        if (selectedImages.length === 1) {
            resetButton.style.display = 'block'; // Show reset button
            message.textContent = 'Please click on the identical tiles to verify that you are not a robot';
        } else if (selectedImages.length === 2) {
            verifyButton.style.display = 'block'; // Show verify button
        }

        if (selectedImages.length > 2) {
            selectedImages = []; // Reset if more than 2 images are selected
            para.textContent = '';
            para.style.display = 'none';
            verifyButton.style.display = 'none';
        }
    }

    function handleVerifyClick() {
        let [img1, img2] = selectedImages;
        if (img1.src === img2.src) {
            para.textContent = 'You are a human. Congratulations!';
        } else {
            para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
        para.style.display = 'block';
        verifyButton.style.display = 'none'; // Hide the verify button
        resetState(); // Reset the state after verification
    }

    function handleResetClick() {
        resetState();
    }

    imageElements.forEach(img => img.addEventListener('click', handleImageClick));
    verifyButton.addEventListener('click', handleVerifyClick);
    resetButton.addEventListener('click', handleResetClick);
});