class MapsController < ApplicationController

  # GET /maps
  # GET /maps.json
  def index
    all_type = Image.all + Video.all + Text.all
    @map = all_type.to_gmaps4rails

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @map }
    end
  end

  def search
    # search for an address, return JSON with result
    require 'gmaps4rails/geocoding'
    @result = Gmaps4rails.geocode params[:address]
    render :json => @result
  end

end

