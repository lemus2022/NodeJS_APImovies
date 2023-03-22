import mongoose, { Schema }  from "mongoose";
import { Movie } from "../models/movies";

    const MovieSchema: Schema = new Schema({
            title: {type: String, required: true},
            year: {type: String, required: true},
            director: {type: String, required: true}
},{
    timestamps: true
});

export default mongoose.model<Movie>('movie', MovieSchema);