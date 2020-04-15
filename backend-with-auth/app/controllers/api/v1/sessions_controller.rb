class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.authenticate(params[:user][:password])
      # success = log in!
      session[:user_id] = user.id
      render json: {
        current_user: current_user.as_json(except: [:password_digest, :created_at, :updated_at]),
        logged_in: true
      }
    else
      render json: {
        error: "invalid credentials"
      }
    end
  end

  def get_current_user
    if logged_in?
      render json: {
        current_user: current_user.as_json(except: [:password_digest, :created_at, :updated_at]),
        logged_in: logged_in?
      }
    else
      render json: {
        message: "no one logged in",
        logged_in: logged_in?
      }
    end
  end

  def destroy
    reset_session
    render json: {
      message: "successful logout",
      logged_in: logged_in?
    }
  end
end
