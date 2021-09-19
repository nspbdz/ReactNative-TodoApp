const { list, task,taskList } = require('../../models')

exports.createList = async (req, res) => {
  const { id } = req.params;
  let data = req.body
  const title = data.title
  const description = data.description
  console.log( title, description)
  try {

    let data = req.body
    console.log(data)
    data = {
      ...data,
    }
    const newList=await list.create(data, {
      
    });
    let newTaskList = await taskList.create({
      idTask: id, idList: newList.id
    });
    const tasks = await task.findOne({
      where: {
        id:id,
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
    });

    res.send({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.updateList = async (req, res) => {
  const { id } = req.params;
  try {

    let data = req.body
    console.log(data)
    data = {
      ...data,
    }


    await list.update(data, {
      where: {
        id,
      },
    });
    const lists = await list.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: lists,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};


exports.getAllList = async (req, res) => {
  try {

    let lists = await list.findAll({
      include: [
        {
          model: task,
          as: 'task',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'productId', 'transactionId'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },

    });
    lists = JSON.parse(JSON.stringify(lists))
    lists = lists.map((list) => {
      list = {
        ...list,
      }
      return list

    })
    console.log(lists)

    res.send({
      status: 'success',
      data: {
        lists
        // ,products
      }
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.getList = async (req, res) => {
  try {
    const path = process.env.PATH_FILE

    // let lists = await list.findOne({
    let lists = await list.findOne({
      where: {
        id: req.params.id,
      },
     
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },

    });
  
    res.send({

      status: "success",
      message: "resource has successfully get",
      data: lists,

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


exports.deleteList = async (req, res) => {
  const { id } = req.params;
  try {
    await list.destroy({
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


