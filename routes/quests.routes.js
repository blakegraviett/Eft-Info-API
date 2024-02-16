// * IMPORTS * //
const router = require('express').Router();

const {
    getAllQuests,
    getSingleQuestByID,
    createSingleQuest,
    updateSingleQuest,
    deleteSingleQuest
} = require('../controllers/quests.controllers')

// * ROUTES * //

// GET ALL  
router.get('/', getAllQuests)

// GET SINGLE BY ID 
router.get('/:id', getSingleQuestByID)

// POST SINGLE (CREATE) 
router.post('/', createSingleQuest)

// PATCH SINGLE BY ID (UPDATE) 
router.patch('/:id', updateSingleQuest)

// DELETE SINGLE BY ID 
router.delete('/:id', deleteSingleQuest)

// * EXPORTS * //
module.exports = router;


