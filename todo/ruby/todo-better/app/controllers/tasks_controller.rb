class TasksController < ApplicationController

  before_action :set_task, only: %i[show update destroy]

  def index
    render json: Task.all
  end

  def show
    render json: @task
  end

  def create
    render json: Task.create(task_params)
  end

  def update
    @task.update(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    render json: @task
  end

  private

  def task_params
    params.require(:task).permit(:description, :done)
  end

  def set_task
    @task = Task.find(params[:id])
  end

end
