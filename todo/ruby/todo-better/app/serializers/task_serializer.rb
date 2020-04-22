class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :done
end
