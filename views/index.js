import { getAllContests } from "../data/index.js";
import createListTemplate from "./list.js";

const createHomePage = async () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="public/htmx.min.js"></script>
        <link rel="stylesheet" href="public/bootstrap.min.css">
        <title>Contest Page</title>
    </head>
    <body>
        <button class="btn btn-primary mt-2 ms-2" hx-get="/contests/codeforces" hx-target=".container">Codeforces</button>
        <button class="btn btn-primary mt-2 ms-2" hx-get="/contests/topcoder" hx-target=".container">Topcoder</button>
        <button class="btn btn-primary mt-2 ms-2" hx-get="/contests/codechef" hx-target=".container">Codechef</button>
        <button class="btn btn-primary mt-2 ms-2" hx-get="/contests/leetcode" hx-target=".container">Leetcode</button>
        <div class="container">
            ${createListTemplate(await getAllContests())}
        </div>
    </body>
    </html>
`;

export default createHomePage;