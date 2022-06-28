class CreatePoems < ActiveRecord::Migration[6.1]
  def change
    create_table :poems do |t|
      t.string :title
      t.text :body
      t.integer :unique_visits
      t.integer :total_visits
      t.integer :total_read_time
      t.datetime :created_time
      t.string :location

      t.timestamps
    end
  end
end
