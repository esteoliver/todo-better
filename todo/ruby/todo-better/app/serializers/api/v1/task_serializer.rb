class Api::V1::TaskSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :description, :done
end
