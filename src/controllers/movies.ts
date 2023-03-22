import { Request, Response } from "express";
import Movie from '../interfaces/movies';
import mongoose from 'mongoose';
import movies from "../interfaces/movies";


const getAll = (req: Request, res: Response) => {
    //TODO search in DB for all movies
    movies.find().then((movies) => {
        return res.send(movies);
    }).catch(err => {
        return res.status(400).send("Do not exist movies");
    })
};




const get = async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    try {
        const movie = await movies.findById(id);
        if (!movie) {
            return res.status(404).send({ err: "Movie does not exist" });
        }
        return res.send(movie);
    } catch (e) {
        return res.status(400).send({ err: "Movie does not exist" });
    }

};

const create = async (req: Request, res: Response) => {
    const { title, year, director } = req.body;

    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title,
        year,
        director,
    });

    const result = await movie.save();

    return res.status(200).json({
        message: 'Movie Register Sucess',
        data: {
            title,
            year,
            director,
            id: result.id
        }
    });



};


const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, year, director } = req.body;

    try {
        const updatedResult = await Movie.findByIdAndUpdate(
            { _id: id },
            {
                title,
                year,
                director,
            },
            {
                new: true,
            }
        );
        return res.send(updatedResult);
    } catch (error) {
        console.log(error);
    }
};



const remove = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const updatedResult = await Movie.findByIdAndDelete(
            { _id: id },
        );
        return res.send(updatedResult);
    } catch (error) {
        console.log(error);
    }
};


export default { getAll, get, create, update, remove };