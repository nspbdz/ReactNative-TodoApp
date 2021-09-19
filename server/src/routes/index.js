const { Router } = require("express");

// Controller
const { createList,getAllList,getList,updateList,deleteList } = require('../controllers/list')
const { getListByIdTask,createTask,getTask,updateTask,deleteTask,getAllTask } = require('../controllers/task')

const router = Router();



router.post('/task', createTask)
router.get('/task/:id', getTask)
router.get('/tasks', getAllTask)
router.delete('/task/:id', deleteTask)
router.put('/task/:id', updateTask)

// router.get('/lists', getAllList)
// router.get('/taskList/:id', getListByIdTask)
router.get('/list/:id', getList)
router.put('/list/:id', updateList)
router.delete('/list/:id', deleteList)
router.post('/list/:id', createList)


module.exports = router;
