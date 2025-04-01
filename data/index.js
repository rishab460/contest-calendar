const contests = {
    codeforces: [],
    topcoder: [],
    codechef: [],
    leetcode: [],
}

async function getContestsCodeforces() {
    fetch("https://codeforces.com/api/contest.list")
        .then(response => response.json())
        .then(data => {
            contests.codeforces = data.result.map(contest => {
                if (contest.phase !== "FINISHED")
                    return {
                        id: contest.id,
                        name: contest.name,
                        type: contest.type,
                        phase: contest.phase,
                        duration: contest.durationSeconds / 60,
                        timeUnit: "minutes",
                        url: `https://codeforces.com/contests/${contest.id}`,
                        startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
                    }
            }).filter(contest => contest !== undefined);
        })
        .catch(err => console.log(err));
}

async function getContestsTopcoder() {
    fetch("https://api.topcoder.com/v5/challenges")
        .then(response => response.json())
        .then(data => {
            const currentTime = new Date();
            contests.topcoder = data.map(contest => {
                const endDate = new Date(contest.endDate);
                if (endDate > currentTime && contest.status !== "FINISHED") {
                    return {
                        id: contest.id,
                        name: contest.name,
                        type: contest.type,
                        phase: contest.status,
                        duration: Math.round(contest.phases[1].duration / 60 / 60 / 24),
                        timeUnit: "days",
                        url: `https://www.topcoder.com/challenges/${contest.id}`,
                        startTime: new Date(contest.startDate).toLocaleString(),
                    };
                }
            }).filter(contest => contest !== undefined);
        })
        .catch(err => console.log(err));
}


export async function getAllContests() {
    await getContestsCodeforces();
    await getContestsTopcoder();
    let allContests = [...contests.codeforces, ...contests.codechef, ...contests.leetcode, ...contests.topcoder];
    allContests.sort((a, b) => {
        if (a.startTime && b.startTime)
            return a.startTime < b.startTime;
        return true;
    });
    return allContests;
}

export default contests;