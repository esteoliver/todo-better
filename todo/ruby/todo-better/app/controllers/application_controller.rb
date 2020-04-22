class ApplicationController < ActionController::API
  include RenderJsonapi

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def record_not_found(error)
    render json: {
      errors: [
        {
          title: "#{error.model.capitalize} not found",
          status: '404',
          detail: "Couldn\'t found #{error.model.downcase} with #{error.primary_key} = #{error.id}"
        }
      ]
    }, status: :not_found
  end
end
