// Wait until the full HTML document is loaded and parsed before running this script
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed."); // Log that script execution begins

    // Get the HTML element where the GIF images will be displayed
    const gifGrid = document.getElementById("dino-gifs");
    // Get the search form element to detect when user submits a search
    const searchForm = document.getElementById("search-form");
    // Get the input field where the user types their search term
    const searchInput = document.getElementById("search-input");

    // Your Giphy API key, needed to authenticate the API requests
    const apiKey = "HZY3ZgP5jlwxrFD7v5iV7GRjeWPIjil3";
    // Limit the number of GIF results fetched per query to 15
    const limit = 21;
    const offset = 5; // Skip first 5 results
    // Define a function that fetches and displays GIFs for a given search query
    function fetchGifs(query) {
        console.log(`Fetching GIFs for query: "${query}"`); // Log the current search query

        // Show a loading message in the gifGrid container while waiting for results
        gifGrid.innerHTML = '<p class="text-center">Loading GIFs...</p>';

        // Fetch GIFs from Giphy's search API with the given query
        // encodeURIComponent(query) ensures special characters in the query are URL-safe
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`)
            .then(res => {
                console.log("Response received from Giphy API."); // Log when response is received
                return res.json(); // Parse the response body as JSON
            })
            .then(data => {
                console.log(`Number of GIFs received: ${data.data.length}`); // Log number of GIFs received
                gifGrid.innerHTML = ""; // Clear the loading message before displaying results

                // If no GIFs were found for the search query, display a warning message
                if (data.data.length === 0) {
                    console.warn(`No GIFs found for query: "${query}"`); // Log a warning for no results
                    gifGrid.innerHTML = `<p class="text-center text-warning">No GIF found for "${query}". Try another search.</p>`;
                    return; // Exit the function early as there are no results to show
                }

                // Loop through each GIF object in the returned data array
                data.data.forEach(gif => {
                    // Create a Bootstrap column div to wrap the image for responsive layout
                    const col = document.createElement("div");
                    col.className = "col-12 col-sm-6 col-md-4";

                    // Create an image element for the GIF
                    const img = document.createElement("img");
                    // Set the image source URL to the fixed height version of the GIF
                    img.src = gif.images.fixed_height.url;
                    // Set alt text on the image for accessibility and SEO
                    img.alt = gif.title;
                    // Add CSS classes for styling and responsive sizing
                    img.className = "img-fluid rounded w-100 h-100 my-4 pb-4";

                    // Append the image element inside the column div
                    col.appendChild(img);
                    // Append the column div inside the main GIF container on the page
                    gifGrid.appendChild(col);
                });

                console.log(`Displayed ${data.data.length} GIFs on the page.`); // Log successful display
            })
            .catch(error => {
                // If there is an error during the fetch process, show an error message
                console.error("Error fetching Giphy:", error); // Log the error details
                gifGrid.innerHTML = `<p class="text-center text-danger">Failed to load GIFs. Try again later.</p>`;
            });
    }

    // Perform an initial fetch of GIFs for the default search term when the page loads
    console.log("Initial fetch for default query: indominus-rex-dinosaurs");
    fetchGifs("indominus-rex-dinosaurs");

    // Add an event listener for when the user submits the search form
    searchForm.addEventListener("submit", event => {
        event.preventDefault(); // Prevent the form's default behavior (page reload)

        // Get the user's search input, removing extra spaces from start/end
        const userInput = searchInput.value.trim();
        console.log(`User submitted search: "${userInput}"`); // Log the user's input

        // Build the final search query:
        // If user input exists, prepend "dinosaur" to focus the search,
        // otherwise fallback to the default query.
        const query = userInput ? `${userInput} dinosaur` : "indominus-rex-dinosaurs";
        console.log(`Constructed query: "${query}"`); // Log the constructed query

        // Call fetchGifs to fetch and display GIFs for the constructed query
        if (query) {
            fetchGifs(query);
        }
    });
});
