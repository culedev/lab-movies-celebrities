const { Schema, model } = require("mongoose");
const Celebrity = require("./Celebrity.model");

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [
      {
        type: Schema.Types.ObjectId, // Esto sera un ID que apunta a otro documento de la DB
        ref: Celebrity,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
