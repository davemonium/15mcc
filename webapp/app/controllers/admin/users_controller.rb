class Admin::UsersController < ApplicationController

  before_filter :check_role

  def index
    @users = User.desc(:created_at)
  end

  respond_to :html, :json
  def update_role
    @user = User.where(:username => params[:username]).first
    @user.role = params[:user][:role]
    @user.save
    respond_with @user
  end

  protected

  def check_role
    if current_user.role != 'admin'
      flash[:error] = 'Acceso no autorizado'
      redirect_to root_path
    end
  end
end
