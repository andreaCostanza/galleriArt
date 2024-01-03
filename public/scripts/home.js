document.addEventListener("DOMContentLoaded", function () {
    // The API endpoint to fetch random images
    const apiUrl = "http://localhost:3080/api/posts/random-imgs";

    // Reference to the carousel inner container
    const carouselInner = document.querySelector("#imageCarousel .carousel-inner");

    // Fetch random images from your API
    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            // Update the Bootstrap carousel with the fetched images
            updateCarousel(response);
        })
        .catch(error => console.error("Error fetching images:", error));

    // Function to update the Bootstrap carousel with images
    function updateCarousel(response) {
        // Clear existing content in the carousel
        carouselInner.innerHTML = "";
        console.log(response);

        const { images } = response;

        console.log(images);

        const imgSrc = images.map( obj => obj.img_path );
        console.log(imgSrc);

        // Create and append new carousel item elements with images
        imgSrc.forEach((image, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");

            // Add 'active' class to the first item for initial display
            if (index === 0) {
                carouselItem.classList.add("active");
            }

            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = "Random Image-" + index;
            

            carouselItem.appendChild(imgElement);
            carouselInner.appendChild(carouselItem);
        });
    }
});