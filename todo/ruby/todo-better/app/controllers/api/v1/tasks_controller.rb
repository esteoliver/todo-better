class Api::V1::TasksController < ApplicationController

  before_action :set_task, only: %i[show update destroy]

  def index
    render_jsonapi Task.all
  end

  def show
    render_jsonapi @task
  end

  def create
    render_jsonapi Task.create(task_params), status: :created
  end

  def update
    @task.update(task_params)
    render_jsonapi @task
  end

  def destroy
    @task.destroy
    render_jsonapi @task
  end

  private

  def task_params
    params.require(:task).permit(:description, :done)
  end

  def set_task
    @task = Task.find(params[:id])
  end

end
