class PoemsController < ApplicationController

   def index
      @poems = Poem.all

      @total_number_of_poems = @poems.count

      @poem = Poem.new

   end

   def show
      @poem = Poem.find(params[:id])

      render json: @poem
   end


   def edit
      @poem = Poem.find(params[:id])
   end

   def update
      @poem = Poem.find(params[:id])

      @poem.update(form_params)
   end


   def form_params
      params.require(:poem).permit(:total_read_time)
   end


end
