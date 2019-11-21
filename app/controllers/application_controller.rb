class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!, except: [:new, :create]
  before_action :configure_permitted_parameters, if: :devise_controller?

  def authenticate_user!
    redirect_to new_user_session_path unless user_signed_in?
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

end