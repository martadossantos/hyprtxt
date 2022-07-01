class Comment < ApplicationRecord
  belongs_to :poem

  validates :body, presence: true
end
