import React, { Component } from 'react'

export default class SearchingInput extends Component {
    render() {
        let {currSearchText, setCurrText} = this.props;
        return (
            <input type="search" value={currSearchText}
            onChange={setCurrText} />
        )
    }
}

