const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const db = require('./db')

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id)
    if (idea) {
        req.idea = idea
        next()
    } else {
        res.status(404).send()
    }
})

ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'))
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea)
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body)
    if (updatedIdea) {
        res.send(updatedIdea)
    } else {
        res.status(404).send()
    }
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('ideas', req.params.ideaId)
    if (deleted) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})

module.exports = ideasRouter;