const { list, task, taskList } = require('../../models')

exports.getListByIdTask = async (req, res) => {
  try {
    const path = process.env.PATH_FILE

    // let lists = await list.findOne({
    let taskLists = await taskList.findOne({
      where: {
        idTask: req.params.id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },

    });
  
    res.send({
      status: "success",
      message: "resource has successfully get",
      data: taskLists,
    });
  } catch (error) {
    console.log(error);
    // console.log(req.query.amenities)


    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
exports.createTask = async (req, res) => {
  let data = req.body
  console.log(data)
  const name = data.name
  const title = data.title
  const description = data.description
  console.log(name, title, description)
  try {

    //  membuat task 
    let newTask = await task.create({
      name: name,
    });
    // membuat list 
    const newList = await list.create({
      title: title, description: description
    });
    //  membuat penghubung antara task dengan list
    let newTaskList = await taskList.create({
      idTask: newTask.id, idList: newList.id
    });

    newTasks = await task.findOne({
      where: {
        id: newTask.id
      },
      include: [

        {
          model: list,
          as: "list",
          through: {
            model: taskList,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },


      ],
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    })

    // console.log(tasks) 

    res.send({
      status: "success",
      message: "resource has successfully get",
      // data: "tasks"
      data: newTasks

    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {

    let data = req.body
    data = {
      ...data,
    }


    await task.update(data, {
      where: {
        id,
      },
    });
    const tasks = await task.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "resource has successfully deleted",
      data: tasks,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};


exports.getTask = async (req, res) => {
  try {
    const path = process.env.PATH_FILE

    // let lists = await list.findOne({
    let tasks = await task.findOne({
      where: {
        id: req.params.id,
      },
      include: [

        {
          model: list,
          as: "list",
          through: {
            model: taskList,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },


      ],

      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },

    });


    res.send({

      status: "success",
      message: "resource has successfully get",
      data: tasks,

    });
  } catch (error) {
    console.log(error);
    // console.log(req.query.amenities)


    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
exports.getAllTask = async (req, res) => {
  try {
    const path = process.env.PATH_FILE

    // let lists = await list.findOne({
    let tasks = await task.findAll({
      include: [

        {
          model: list,
          as: "list",
          through: {
            model: taskList,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },

    });


    res.send({

      status: "success",
      message: "resource has successfully get",
      data: tasks,

    });
  } catch (error) {
    console.log(error);
    // console.log(req.query.amenities)


    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};


exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await task.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "resource has successfully deleted",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
