class CreatePerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
      t.time :time
      t.integer :place
      t.integer :distance
      t.string :meet
      t.datetime :race_datetime
      t.references :athlete, index: true

      t.timestamps
    end
  end
end
