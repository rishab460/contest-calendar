const createContestTemplate = (contest) => {
    return `
        <div class="contest-card" id="${contest.id}">
            <h3>${contest.name}</h3>
            <p>Type: ${contest.type}</p>
            <p>Phase: ${contest.phase}</p>
            <p>Duration: ${contest.duration} ${contest.timeUnit}</p>
            <p>Start Time: ${contest.startTime}</p>
            <a href="${contest.url}" target="_blank">Join Contest</a>
        </div>
    `;
}

export default createContestTemplate;