import { Serializer } from 'jsonapi-serializer';

export default new Serializer('tasks', {
  attributes: ['id', 'description', 'done']
});