/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Node = require('./Node');
var GroupTitle = require('./fragments/GroupTitle');
var GroupChildren = require('./fragments/GroupChildren');
const VisibilityCheck = require('./fragments/VisibilityCheck');

var DefaultGroup = React.createClass({
    propTypes: {
        node: React.PropTypes.object,
        style: React.PropTypes.object,
        sortableStyle: React.PropTypes.object,
        onToggle: React.PropTypes.func,
        onSort: React.PropTypes.func,
        propertiesChangeHandler: React.PropTypes.func,
        groupVisibilityCheckbox: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            node: {},
            onToggle: () => {},
            style: {
                marginBottom: "16px",
                cursor: "pointer"
            },
            sortableStyle: {},
            propertiesChangeHandler: () => {},
            groupVisibilityCheckbox: false
        };
    },
    render() {
        let {children, onToggle, ...other } = this.props;
        const visibilityStyle = {
            visibility: 'visible',
            marginLeft: "5px",
            marginRight: "5px", "float": "left",
            marginTop: "7px"
        };
        return (
            <Node sortableStyle={this.props.sortableStyle} style={this.props.style} type="group" {...other}>
                { this.props.groupVisibilityCheckbox &&
                  <VisibilityCheck key="visibility"
                            propertiesChangeHandler={this.props.propertiesChangeHandler}
                            style={visibilityStyle}/>}
                <GroupTitle onClick={this.props.onToggle}/>
                <GroupChildren onSort={this.props.onSort} position="collapsible">
                    {this.props.children}
                </GroupChildren>
            </Node>
        );
    }
});

module.exports = DefaultGroup;
