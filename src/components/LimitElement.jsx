import React, { Component } from 'react'

export default class LimitElement extends Component {
    render() {
        let {limit, changelimit} = this.props;
        return (
            <input type="number" className="col-1"
                placeholder="no of elements/page"
                value={limit}
                onChange={changelimit}
            />
        )
    }
}
