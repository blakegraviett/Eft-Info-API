// * IMPORTS * //
const Quest = require('../models/quests.model')
const aysncwrapper = require("../lib/aysncwrapper")

// * CONTROLLER FUNCTIONS * //

// ? GET ALL
 const getAllQuests = aysncwrapper( async (req, res) => {
    // GET ALL ITEMS FROM DB
   let allQuests = await Quest.aggregate([
    {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: req.query.name,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
            tokenOrder: "sequential",
          },
        },
      },
      {
        $project: {
          name: 1,
          trader: 1,
          _id: 1,
        },
      },
      {
        $limit: 12,
      },
    ]);

   // RETURN SUCCESS MESSAGE AND QUEST
   res.status(200).json({
    success: true,
    data: {
        quest: allQuests,
        message: "SUCCESS"
    }
   })
 })

// ? GET SINGLE BY ID
const getSingleQuestByName = aysncwrapper( async (req, res) => {
  const name = req.query.name
  
  // GET BY NAME
  const foundQuest = await Quest.find({name: name})

  // RETURN SUCCESS MESSAGE AND FOUND QUEST
  res.status(200).json({
      success: true,
      data: {
          quest: foundQuest,
          message: "SUCCESS"
      }
     })
})

// ? GET SINGLE BY ID
const getSingleQuestByID = aysncwrapper( async (req, res) => {
    // GET ID
    const id = req.params.id
    
    // GET BY ID
    const foundQuest = await Quest.findById(id)

    // RETURN SUCCESS MESSAGE AND FOUND QUEST
    res.status(200).json({
        success: true,
        data: {
            quest: foundQuest,
            message: "SUCCESS"
        }
       })
  })


// ? CREATE SINGLE 
const createSingleQuest = aysncwrapper( async (req, res) => {
    // SEPERATE BODY 
   const newQuest = {
    name: req.body.name
   }

    // CREATE A NEW TEMPLATE
    const createdQuest = await Quest.create(newQuest)

    // RETURN SUCCESS MESSAGE AND NEW QUEST
    res.status(200).json({
        success: true,
        data: {
            quest: createdQuest,
            message: "SUCCESS"
        }
       })
     })

// ? UPDATE SINGLE BY ID
const updateSingleQuest = aysncwrapper( async (req, res) => {
       // GET ID
       const id = req.params.id

       // UPDATED TEMPLATE
       const updatedQuest = {
        name: req.body.name
       }

       // UPDATE THE TEMPLATE
       const upadteQuest = await Quest.findByIdAndUpdate(id, updatedQuest)

    // RETURN SUCCESS MESSAGE AND UPDATED QUEST
    res.status(200).json({
        success: true,
        data: {
            quest: upadteQuest,
            message: "SUCCESS"
        }
       })
     })

// ? DELETE SINGLE BY ID
const deleteSingleQuest = aysncwrapper( async (req, res) => {
    // GET ID
    const id = req.params.id

    // FIND AND DELETE TEMPLATE
    const deletedQuest= await Quest.findByIdAndDelete(id)

    // RETURN SUCCESS MESSAGE AND UPDATED QUEST
    res.status(200).json({
        success: true,
        data: {
            quest: deletedQuest,
            message: "SUCCESS"
        }
         })
  })


// * EXPORTS * //
module.exports = {
    getAllQuests,
    getSingleQuestByName,
    getSingleQuestByID,
    createSingleQuest,
    updateSingleQuest,
    deleteSingleQuest
}