import createContestTemplate from "./contest.js";

const createListTemplate = (contestList) => {
    return `
        <ul class="list-group list-group-flush">
            ${contestList.map(contest => createContestTemplate(contest))}
        </ul>
    `
}

export default createListTemplate;