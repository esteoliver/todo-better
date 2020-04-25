import {
  basicController,
  basicControllerHandler
} from '../../basicController';
import TaskSerializer from '../../../serializers/taskSerializer';
import models from '../../../models';
import render from '../../helpers/render';

const Task = models.Task;

const taskController = (controller) => (new Proxy(Object.assign({
  index: async (req, res, next) => {
    const pageSize = 5;
    const page = (req.query.page || 1)

    const {
      count,
      rows: data
    } = await Task.findAndCountAll({
      order: [
        ['id', 'asc']
      ],
      offset: pageSize * (page - 1),
      limit: pageSize
    });

    res.data = data;
    res.meta = {
      meta: {
        'current_page': parseInt(page),
        'total_pages': Math.ceil(count / pageSize)
      }
    }
    render(res, TaskSerializer);
  },

  show: async (req, res, next) => {
    const data = await Task.findByPk(req.params.id)

    if (!data) {
      res.status(404);
      res.json({
        errors: [{
          title: "Task not found",
          status: '404',
          detail: `Couldn\'t found task with id = ${req.params.id}`
        }]
      })
    }

    res.data = data;
    render(res, TaskSerializer);
  },

  create: async (req, res, next) => {

    const data = await Task.create({
      description: req.body.description,
      done: req.body.done
    }, {
      fields: ['description', 'done']
    });

    res.status(201);
    res.data = data;
    render(res, TaskSerializer);
  },

  update: async (req, res, next) => {
    const instance = await Task.findByPk(req.params.id)

    if (!instance) {
      res.status(404);
      res.json({
        errors: [{
          title: "Task not found",
          status: '404',
          detail: `Couldn\'t found task with id = ${req.params.id}`
        }]
      })
    }

    const data = await instance.update({
      description: req.body.description,
      done: req.body.done
    })
    res.data = data;
    render(res, TaskSerializer);
  },

  destroy: async (req, res, next) => {
    const instance = await Task.findByPk(req.params.id)

    if (!instance) {
      res.status(404);
      res.json({
        errors: [{
          title: "Task not found",
          status: '404',
          detail: `Couldn\'t found task with id = ${req.params.id}`
        }]
      })
    }

    const data = await instance.destroy()
    res.data = data;
    render(res, TaskSerializer);
  }
}, controller), basicControllerHandler));

export default taskController(basicController);