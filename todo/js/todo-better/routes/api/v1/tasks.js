import express from 'express';
import TaskSerializer from '../../../serializers/taskSerializer';
import models from '../../../models';

const router = express.Router();
const Task = models.Task

// index
router.get('/', function(req, res, next) {

  const pageSize = 5;
  const page = (req.query.page || 1)

  Task.findAndCountAll({
    order: [['id', 'asc']],
    offset: pageSize * (page - 1),
    limit: pageSize
  }).then( data => {
      res.json({...TaskSerializer.serialize(data.rows), ...{ meta: { 'current_page': parseInt(page), 'total_pages': Math.ceil(data.count / pageSize) }}});
    })
});

// show
router.get('/:id', function(req, res, next) {
  Task.findByPk(req.params.id)
    .then( data => {

      if (!data) {
        res.status(404);
        res.json({
          errors: [
            {
              title: "Task not found",
              status: '404',
              detail: `Couldn\'t found task with id = ${req.params.id}`
            }
          ]
        })
      }

      res.json(TaskSerializer.serialize(data));
    })
});

// create
router.post('/', function(req, res, next) {

  Task.create({
    description: req.body.description,
    done: req.body.done
  }, { fields: ['description', 'done'] })
    .then( data => {
      res.status(201);
      res.json(TaskSerializer.serialize(data));
    })
});

// update
router.put('/:id', function(req, res, next) {
  Task.findByPk(req.params.id)
      .then( instance => {

        if (!instance) {
          res.status(404);
          res.json({
            errors: [
              {
                title: "Task not found",
                status: '404',
                detail: `Couldn\'t found task with id = ${req.params.id}`
              }
            ]
          })
        }
  
        instance.update({
          description: req.body.description,
          done: req.body.done
        })
        .then( data => {
          res.json(TaskSerializer.serialize(data));
        })
      })
});

// delete
router.delete('/:id', function(req, res, next) {
  Task.findByPk(req.params.id)
      .then( instance => {

        if (!instance) {
          res.status(404);
          res.json({
            errors: [
              {
                title: "Task not found",
                status: '404',
                detail: `Couldn\'t found task with id = ${req.params.id}`
              }
            ]
          })
        }

        instance.destroy()
          .then( data => {
            res.json(TaskSerializer.serialize(data));
          })
      })
});

export default router;
