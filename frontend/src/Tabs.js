import React from 'react';
import './App.css'

class tabs extends React.Component {
    constructor(props) {
        super(props);
        // this.changePath = this.changePath.bind(this);
    }

    update(item) {
        this.props.setState({
            filePath: item,
            activeTab: this.props.tabList.indexOf(item),
        });
    }

    removeItem(item) {
        console.log(this.props.activeTab);
        this.props.setState({
            tabList: this.props.tabList.filter(x => x !== item),
            activeTab: this.props.activeTab - 1,
        })
        console.log(this.props.activeTab);
    }

    render() {
        console.log(this.props.activeTab);
        if (this.props.tabList.length != 0) {
            return(
                <div>
                    <ul class="nav nav-tabs">
                        {this.props.tabList.map(item => (
                            <li class="nav-item">
                                <a class={this.props.activeTab == this.props.tabList.indexOf(item) 
                                ? "nav-link active" : "nav-link-custom"} 
                                onClick={this.update.bind(this, item)}>{item}
                                    <button onClick={this.removeItem.bind(this,item)} type="button" class="btn-close" aria-label="Close"></button>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}



export default tabs