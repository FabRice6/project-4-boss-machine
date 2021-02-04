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

module.exports = minionsRouter;