class PoemsController < ApplicationController

   def index
      @poems = Poem.all

      @total_number_of_poems = @poems.count
   end

   def show
      @poem = Poem.find(params[:id])
   end


   
end
