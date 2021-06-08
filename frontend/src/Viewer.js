import React from 'react';
import { apiEndpoint } from './rest-configuration.js';

class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
        }
    }

    loadFile() {
        if (this.props.filePath !== undefined && this.props.filePath !== null) {
            fetch(apiEndpoint + this.props.filePath)
                .then((response => response.text()))
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            data: result,
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
            }
        }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.loadFile();
        }
    }
    
    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!this.props.filePath) {
            return null
        } else if (!isLoaded) {
            return (
                <div style={{textAlign: 'center'}}>
                    <p>Loading..</p>
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            )
        } else {
            return(
                <main class="column bg-white pt-1 p-4">
                    <div>
                        <p style={{'font-family': 'monospace'}} >{data}</p>
                    </div>
                </main>
            )
        }

    }
}

export default Viewer;