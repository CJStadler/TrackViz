class PerformancesController < ApplicationController

	def new
		@performance = Performance.new
	end
	
	def create
		
		@performance = Performance.new(performance_params)
		
		if @performance.save
			redirect_to @performance.athlete
		else
			render 'new'
		end
	end
	
	private
		def performance_params
			params.require(:performance).permit(:time, :place, :meet, :distance, :race_datetime, :athlete_id)
			#params[:athlete] = Athlete.find(1)
			#params.delete(:athlete_id)
		end

end
