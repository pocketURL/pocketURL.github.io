async function loadJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading JSON file:', error);
      // Handle errors (e.g., display an error message to the user)
    }
  }


const path = window.location.pathname;
// const url = "https://pocketURL.github.io/bababoi/bongo";
// const path = "linktree/aman";



function main() {
    if(path.includes("index.html")) {
        // This is the base URL, do nothing
        // Returning to home, where URL can become host/index.html again will introduce cycle in this program
    } else {
        sub_paths = path.split("/").filter(Boolean);
        console.log(sub_paths);
        let curr_path = all_urls;
        for(let i=0; i<sub_paths.length; i++) {

            // if(curr_path === "") {
            //     curr_path = all_urls[sub_paths[i]];
            // } else
            if (typeof(curr_path) === "string") {
                break;
            } else {
                // console.log(curr_path);
                if(sub_paths[i] in curr_path) {
                    curr_path = curr_path[sub_paths[i]];
                } else {
                    // No redirect url found, open error.html
                    curr_path = "/error.html";
                    break;
                }
            }
        }
        // console.log(curr_path, typeof(curr_path) === "string");
        if(typeof(curr_path) === "string") {
            window.location.href = curr_path;
        } else {
            window.location.href = "/error.html";

        }

    }
}

let all_urls = null;
loadJson("https://raw.githubusercontent.com/pocketURL/URL-Database/main/urls.json").then(data => {
    console.log(data); // Use the loaded JSON data
    all_urls = data;
    main();
}).catch(error => {
    console.error('Error:', error);
});