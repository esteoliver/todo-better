import TaskSerializer from '../../../serializers/taskSerializer';
import models from '../../../models';
import render from '../../helpers/render';

const Task = models.Task;

// Return a Proxy 
// resolver = () => {
//   ...
//   method
//   ...
//   render
// }

export default class TasksController  {

  static index(req, res, next) {
    const pageSize = 5;
    const page = (req.query.page || 1)
  
    Task.findAndCountAll({
      order: [
        ['id', 'asc']
      ],
      offset: pageSize * (page - 1),
      limit: pageSize
    }).then(data => {
      res.data = data.rows;
      res.meta = {
        meta: {
          'current_page': parseInt(page),
          'total_pages': Math.ceil(data.count / pageSize)
        }
      }
      render(res, TaskSerializer);
    })
  }
  
  static show(req, res, next) {
    Task.findByPk(req.params.id)
      .then(data => {
  
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
      })
  }
  
  static create(req, res, next) {
  
    Task.create({
        description: req.body.description,
        done: req.body.done
      }, {
        fields: ['description', 'done']
      })
      .then(data => {
        res.status(201);
        res.data = data;
        render(res, TaskSerializer);
      })
  }
  
  static update(req, res, next) {
    Task.findByPk(req.params.id)
      .then(instance => {
  
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
  
        instance.update({
            description: req.body.description,
            done: req.body.done
          })
          .then(data => {
            res.data = data;
            render(res, TaskSerializer);
          })
      })
  }
  
  static destroy(req, res, next) {
    Task.findByPk(req.params.id)
      .then(instance => {
  
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
  
        instance.destroy()
          .then(data => {
            res.data = data;
            render(res, TaskSerializer);
          })
      })
  }
};
