class Poem < ApplicationRecord

   has_many :comments

   def poem
      @poem = Poem
   end

   @poem = Poem.find(ids)

end
