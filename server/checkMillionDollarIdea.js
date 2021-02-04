const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body
    if(!idea.numWeeks || !idea.weeklyRevenue) {
        res.status(400).send()
    }
    const millionDollar = (idea.numWeeks * idea.weeklyRevenue) >= 1000000
    if (millionDollar) {
        next()
    } else {
        res.status(400).send()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
