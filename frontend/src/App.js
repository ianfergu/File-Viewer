import './App.css';
import Viewer from './Viewer.js';
import FileList from './FileList';
import Tabs from './Tabs'
import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      filePath: null,
      search: "",
      tabList: [],
      activeTab: null,
    }
  }

  render() {
    return (
      <div className="App">
        <div class="shadow container-lg container-fluid flex overflow-auto rounded pt-1 h-100 w-100 bg-light mt-5" sytle={{'height': '800px!important'}}>
          <div class="jumbotron">
          <div class="row">
            
              {/* Search Bar */}
              <div class="col-md-3">
                <div class="input-group rounded">
                  <input type="search" onChange={this.searchUpdate} value={this.state.search} class="form-control rounded" placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon" />
                </div>

                {/* File List */}
                <nav id="sidebarMenu" class="column flex-column d-flex">
                  <div class="pt-3 list-group scrollarea">
                    <FileList search={this.state.search} activeTab={this.state.activeTab} setState={p=>{this.setState(p)}} tabList={this.state.tabList}></FileList>
                  </div>
                </nav>
              </div>

              {/* Nav Bar */}
              <div class="col-md-9">
                <Tabs setState={p=>{this.setState(p)}} tabList={this.state.tabList} activeTab={this.state.activeTab}></Tabs>
              
                {/* File Viewer */}
                <Viewer filePath={this.state.filePath}></Viewer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  searchUpdate = (event) => {
    this.setState({
      search: event.target.value
    })
  }
}

export default App;
