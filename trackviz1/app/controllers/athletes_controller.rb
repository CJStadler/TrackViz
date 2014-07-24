class AthletesController < ApplicationController

	def new
		@athlete = Athlete.new
	end

	def index
		@athletes = Athlete.all
		
		respond_to do |format|
			format.html
			format.json { render json: @athletes }
		end
	end
	
	def show
		@athlete = Athlete.find(params[:id])
		
		js :performances => @athlete.performances.order(:race_datetime)
		
		respond_to do |format|
			format.html
			format.json { render json: @athlete.performances }
		end
	end
	
	def create
		@athlete = Athlete.new(athlete_params)
		
		if @athlete.save
			redirect_to @athlete
		else
			render 'new'
		end
	end
	
	private
		def athlete_params
			params.require(:athlete).permit(:name)
		end

end
