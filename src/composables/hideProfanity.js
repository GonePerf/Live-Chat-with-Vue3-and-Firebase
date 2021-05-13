const regexps = [
    /kurw./i,
    /chuj[\W]*$/i,
    /huj[\W]*$/i,
    /cwel/i,
    /ciota/i,
    /pizd/i,
    /jeba/i,
    /jebać/i,
    /wypierdalaj/i,
    /spierdalaj/i,
    /pierdol/i,
    /zjeb/i
]

const hideProfanity = (mess) => {
    let checkedMessage = mess
    for (let i = 0; i < regexps.length; i++) {
        checkedMessage = checkedMessage.replace(regexps[i], '***')
    }
    return { checkedMessage }
}

export default hideProfanity