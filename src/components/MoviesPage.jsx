import React, { Component } from 'react'
// import { getMovies } from '../temp/MoviesService'
import List from "./List"
import Pagination from './Pagination'
import SearchingInput from './SearchingInput'
import LimitElement from './LimitElement'
import Table from './Table'

export default class MoviesPage extends Component {
    // state - > movies and currSearchText
    state = {
        movies: [],
        genres: [{ id: 1, name: "All Genres" }],
        currSearchText: "",
        limit: 4,
        currentPage: 1,
        cGenre: "All Genres"
    }
    deleteEntry = (id) => {
        let filterMovies = this.state.movies.filter((moviesObj) => {
            return moviesObj._id !== id;
        })
        this.setState({
            movies: filterMovies
        })
    }
    setCurrText = (e) => {
        let task = e.target.value;

        this.setState({
            currSearchText: task,
        })
    }
    sortByRtings = (e) => {
        let className = e.target.className;
        let sortedMovies;
        let { movies } = this.state;
        if (className == "fas fa-sort-up") {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
            })
        } else {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }
    sortByStock = (e) => {
        let className = e.target.className;
        let sortedMovies;
        let { movies } = this.state;
        if (className == "fas fa-sort-up") {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjA.numberInStock - movieObjB.numberInStock;
            })
        } else {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjB.numberInStock - movieObjA.numberInStock;
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }
    changelimit = (e) => {
        // console.log("hello");
        let currLimit = e.target.value;
        if (currLimit < 1)
            return;
        // console.log(currPage);
        this.setState({
            limit: currLimit
        })
    }
    changeCurrentPage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }
    groupByGenre = (name) => {
        this.setState({
            cGenre: name,
            currSearchText: "",
        })
    }
    async componentDidMount() {
        // console.log(2);
        // movies object
        let resp = await fetch("https://react-backend101.herokuapp.com/movies");
        let jsonMovies = await resp.json();
        this.setState({
            movies: jsonMovies.movies
        });

        // genres object
        resp = await fetch("https://react-backend101.herokuapp.com/genres");
        let jsonGenres = await resp.json();
        this.setState({
            genres: [...this.state.genres, ...jsonGenres.genres]
        });

    }

    render() {
        let { movies, genres, currSearchText, limit, currentPage, cGenre } = this.state;

        let filteredArr = movies;

        if (cGenre != "All Genres") {
            filteredArr = filteredArr.filter((movieObj) => {
                return movieObj.genre.name == cGenre;
            })
        }

        // Searching -> filter
        if (currSearchText != "") {
            filteredArr = movies.filter((movieObj) => {
                let title = movieObj.title.trim().toLowerCase();
                // console.log(title);
                return title.includes(currSearchText);
            })
        }

        // si -> (pagenumber-1)*limit;
        // eidx = si+limit;
        // number of pages 
        let numberOfPage = Math.ceil(filteredArr.length / limit);


        //pagination->implementation
        let startingIndex = (currentPage - 1) * limit;
        let endingIndex = startingIndex + limit;
        filteredArr = filteredArr.slice(startingIndex, endingIndex)

        // ui
        return (
            <div className="row">
                {/* Movies Page, */}
                <div className="col-3">
                    {/* list */}
                    <List
                        genres={genres}
                        groupByGenre={this.groupByGenre}
                    ></List>
                </div>
                <div className="col-9">

                    {/* searching bar */}
                    <SearchingInput
                        currSearchText={currSearchText}
                        setCurrText={this.setCurrText}
                    ></SearchingInput>

                    {/* limit Element */}
                    <LimitElement
                        limit={limit}
                        changelimit={this.changelimit}
                    ></LimitElement>

                    {/* table */}
                    <Table
                        sortByStock={this.sortByStock}
                        sortByRtings={this.sortByRtings}
                        filteredArr={filteredArr}
                        deleteEntry={this.deleteEntry}
                    ></Table>

                    {/*  pagination */}
                    <Pagination
                        numberOfPage={numberOfPage}
                        currentPage={currentPage}
                        changeCurrentPage={this.changeCurrentPage}
                    ></Pagination>

                </div>

            </div>

        )
    }
}


