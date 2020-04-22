class ApplicationController < ActionController::API
  include RenderJsonapi
  include ApiErrorHandling
end
