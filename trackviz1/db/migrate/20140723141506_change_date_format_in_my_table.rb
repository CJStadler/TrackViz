class ChangeDateFormatInMyTable < ActiveRecord::Migration
	def change
		change_column :performances, :time, :float
	end
end
