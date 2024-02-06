// * IMPORTS * //
const Quest = require('../modules/quests.model')
const aysncwrapper = require("../lib/aysncwrapper")

// * CONTROLLER FUNCTIONS * //

// ? GET ALL
 const getAllQuests = aysncwrapper( async (req, res) => {
   // GET ALL ITEMS FROM DB
   const allQuests = await Quest.find()

   // RETURN SUCCESS MESSAGE AND TEMPLATES
   res.status(200).json({
    success: true,
    data: {
        templates: allQuests,
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

    // RETURN SUCCESS MESSAGE AND FOUND TEMPLATE
    res.status(200).json({
        success: true,
        data: {
            templates: foundQuest,
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

    // RETURN SUCCESS MESSAGE AND NEW TEMPLATE
    res.status(200).json({
        success: true,
        data: {
            templates: createdQuest,
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

    // RETURN SUCCESS MESSAGE AND UPDATED TEMPLATE
    res.status(200).json({
        success: true,
        data: {
            templates: upadteQuest,
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

    // RETURN SUCCESS MESSAGE AND UPDATED TEMPLATE
    res.status(200).json({
        success: true,
        data: {
            templates: deletedQuest,
            message: "SUCCESS"
        }
         })
  })


// * EXPORTS * //
module.exports = {
    getAllQuests,
    getSingleQuestByID,
    createSingleQuest,
    updateSingleQuest,
    deleteSingleQuest
}