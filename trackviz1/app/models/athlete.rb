class Athlete < ActiveRecord::Base
	has_many :performances
	validates :name, presence: true
end
