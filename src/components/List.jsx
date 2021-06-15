import React, { Component } from 'react'

export default class List extends Component {
    render() {
        let { genres, groupByGenre } = this.props;
        return (
            <ul className="list-group">
                {
                    genres.map((cgObj) => {
                        return (<li className="list-group-item" key={cgObj.id} onClick={() => {
                            groupByGenre(cgObj.name)
                        }}>{cgObj.name}</li>)
                    })
                }

            </ul>
        )
    }
}
