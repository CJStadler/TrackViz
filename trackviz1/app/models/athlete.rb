class Athlete < ActiveRecord::Base
	validates :name, presence: true
end
