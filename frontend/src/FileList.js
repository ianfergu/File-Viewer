import React, { isValidElement } from 'react';
import { apiEndpoint } from './rest-configuration';
import './App.css'
import tabs from './Tabs';

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            filePath: null,
            tabs: this.props.tabs,
        }
    }

    componentDidMount() {
        fetch(apiEndpoint + "/tree/")
            .then((response => response.json()))
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
        }
    
    render() {
        const { error, isLoaded, data } = this.state;
        // if (error) {
        //     return <div>Error: {error.message} </div>
        // } else 
        if (!isLoaded) {
            return (
                <div style={{textAlign: 'center'}}>
                    <p>Loading..</p>
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            )
        } else {
            return (
                <ul class="text-truncate">
                    {data.filter(data => data.includes(this.props.search)).map(item => (
                        // <li onClick={ () => {this.changePath.bind(this, item); this.addNav.bind(this,item);}} class="link d-flex list-group-item list-group-item-action lh-tight" key={item}>
                        <li onClick={this.update.bind(this, item)} class="link d-flex list-group-item list-group-item-action lh-tight" key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
            )
        }
    }

    update(item) {
        this.changePath(item);
        this.addNav(item);
    }

    changePath(item) {
        this.props.setState({
            filePath: item
        });
    }

    addNav(item) {
        if (!this.props.tabList.includes(item )){
            this.props.setState({
                activeTab: this.props.tabList.length,
                tabList: [...this.props.tabList, item ]
            });
        } else {
            this.props.setState({
                activeTab: this.props.tabList.indexOf(item),
            });
        }
    }
}

export default FileList;