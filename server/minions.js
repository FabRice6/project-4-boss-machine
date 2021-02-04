const express = require('express');
const minionsRouter = express.Router();

const db = require('./db');

// Return 404 if the parameter doesn't exist
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById('minions', id)
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Invalid minion ID.');
    }
});

// Get all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
  });

// Post a new minion
minionsRouter.post('/', (req, res, next) => {
    const response = db.addToDatabase('minions', req.body);
    res.status(201).send(response);
});

// Get specific minion
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});


// Update a single Minion
minionsRouter.put('/:minionId', (req, res, next)=> {
    const response = db.updateInstanceInDatabase('minions', req.body);
    if (response === null ) {
        res.status(404).send('Invalid Minion instance');
    } else {
        res.send(response);
    }
});

// Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = db.getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId == req.params.minionId
    })
    res.send(work)
})

minionsRouter.post('/:minionId/work', (req, res, next) => {
    res.status(201).send(db.addToDatabase('work', req.body))
})

minionsRouter.param('workId', (req, res, next, id) => {
    const work = db.getFromDatabaseById('work', id)
    if (work) {
        req.work = work
        next()
    } else {
        res.status(404).send()
    }

})

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.body.minionId !== req.params.minionId) {
        res.status(400).send()
    } else {
        const newWork = db.updateInstanceInDatabase('work', req.body)
        if (newWork) {
            res.send(newWork)
        } else {
            res.status(404).send()
        }
    }
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('work', req.params.workId)
    if (deleted) {
        res.status(204).send()
    } else {
        res.status(500).send()
    }
})

module.exports = minionsRouter;