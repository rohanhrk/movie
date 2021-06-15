import React, { Component } from 'react'

export default class Table extends Component {
    
    render() {
        let {sortByStock, sortByRtings, filteredArr, deleteEntry} = this.props;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                            <i className="fas fa-sort-up" onClick={sortByStock}></i>
                            Stoke
                            <i className="fas fa-sort-down" onClick={sortByStock}></i>
                        </th>
                        <th scope="col">
                            <i className="fas fa-sort-up" onClick={sortByRtings}></i>
                            Rating
                            <i className="fas fa-sort-down" onClick={sortByRtings}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredArr.map((moviesObj) => {
                            return (
                                <tr scope="row" key={moviesObj._id}>
                                    <td>{moviesObj.title}</td>
                                    <td>{moviesObj.genre.name}</td>
                                    <td>{moviesObj.numberInStock}</td>
                                    <td>{moviesObj.dailyRentalRate}</td>
                                    <td><button type="button" className="btn btn-danger"
                                        onClick={() => {
                                            deleteEntry(moviesObj._id)
                                        }}>
                                        Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}
