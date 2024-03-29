const express = require('express');
const router = express.Router();
const {
    updateList,
    addList,
    deleteList,
    getListById,
    getLists,
} = require('../../controllers/listsController');

const { getTodosByListId } = require('../../controllers/todosController');
router.get('/', async (req, res) => {
    try {
        const result = await getLists();

        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:list_id([0-9]+)/todos', async (req, res) => {
    try {
        const result = await getTodosByListId(req.params.list_id);

        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/:id([0-9]+)', async (req, res) => {
    try {
        const result = await getListById(req.params.id);
        res.status(result ? 200 : 404).json(result ? result : null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.delete('/:id([0-9]+)', async (req, res) => {
    try {
        const deleted = await deleteList(req.params.id);
        res.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await addList(req.body.name, req.body.user_id);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.patch('/:id([0-9]+)', async (req, res) => {
    try {
        const updList = await updateList(req.params.id, req.body.name);
        res.status(updList[0] ? 200 : 404).json(
            updList ? updList[0] : ' Record not found'
        );
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
module.exports = router;
