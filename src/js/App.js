import React, {Component} from 'react';
import axios from 'axios';
import 'now-ui-kit/assets/css/now-ui-kit.css';
import 'font-awesome/css/font-awesome.min.css';
import '../style/App.css';
import logo from '../img/line.svg'

import Author from './Author';
import Repository from './Repository';
import Fork from './Fork';

class App extends Component {

  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'https://api.github.com/search/';

    this.state = {
      items: [],
      items_count: 0,
      limit: 500,
      query: "",
      category: "repositories",
      search: "",
      request_complete: false,
      page_no: 1
    };

    this.getResults = this.getResults.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPage = this.getPage.bind(this);
  }

  componentWillMount() {
    let url = `repositories?q=stars:">=1000"&sort=stars&order=desc&per_page=20`;
    this.get(url);
    this.setState({search: "repositories"});
  }

  getResults(event, page_no) {
    event.preventDefault();
    this.setState({request_complete: false});
    this.get(this.filterUrl(page_no));
  }

  filterUrl(page_no) {
    let url = `repositories?q=stars:">=${this.state.limit}"&sort=stars&order=desc&per_page=20`,
      query_type = "topic";

    if (this.state.category === "users") {
      query_type = "language";
    }

    let query = this.state.query.trim(),
      query_str = "";

    if (query.length !== 0) {
      let query_items = query.split(" ");

      query_items.forEach((q, index) => {
        query_str += `${query_type}:${q}+`;
      });
    }

    switch (this.state.category) {
      case 'repositories':
        url = `repositories?q=${query_str}stars:">=${this.state.limit}"&sort=stars&order=desc&per_page=20`;
        this.setState({search: "repositories"});
        break;
      case 'users':
        url = `users?q=${query_str}followers:">=${this.state.limit}"&sort=followers&order=desc&per_page=24`;
        this.setState({search: "users"});
        break;
      case 'forks':
        url = `repositories?q=${query_str}forks:">=${this.state.limit}"&sort=forks&order=desc&per_page=20`;
        this.setState({search: "forks"});
        break;
      default:
        url = `repositories?q=${query_str}stars:">=${this.state.limit}"&sort=stars&order=desc&per_page=20`;
        this.setState({search: "repositories"});
    }

    url += '&page='+page_no;

    return url;
  }

  get(url) {
    let vm = this;

    axios.get(url).then(function(response) {
      vm.setState({items: response.data.items});
      vm.setState({items_count: response.data.total_count});
      vm.setState({request_complete: true});
    }).catch(function(error) {
      console.log(error);
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  getPage(event){
    const target = event.target;
    const page_no = target.innerHTML;

    this.setState({page_no: page_no});
    this.getResults(event, page_no);
  }

  render() {
    let icon,
      limit_placeholder,
      query_placeholder;

    switch (this.state.category) {
      case "users":
        icon = <i className='now-ui-icons fa fa-user'></i>;
        limit_placeholder = "Followers";
        query_placeholder = "Language";
        break;

      case "forks":
        icon = <i className='now-ui-icons fa fa-code-fork'></i>;
        limit_placeholder = "Forks";
        query_placeholder = "Topic";
        break;

      default:
        icon = <i className='now-ui-icons fa fa-star'></i>;
        limit_placeholder = "Stars";
        query_placeholder = "Topic";
    }

    return (
      <div className="App">
        <div className="App-header">
          <div className="logo">
            <img src={logo} alt="github trending logo"></img>
          </div>

          <h2 className="text-uppercase">
            Github Trending
          </h2>
          <h5>Search the ins and outs of the free world.</h5>
        </div>
        <div className="content">
          <section className="query">
            <form className="form" onSubmit={this.getResults}>
              <div className="row">
                <div className="col-sm-2">
                  <div className="form-group-no-border">
                    <input name="query" value={this.state.query} onChange={this.handleChange} type="search" className="form-control" placeholder={query_placeholder}/>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group-no-border">
                    <div className="input-group">
                      <span className="input-group-addon">
                        {icon}
                      </span>
                      <input name="stars" value={this.state.limit} onChange={this.handleChange} type="number" placeholder={limit_placeholder} className="form-control"/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group-no-border">
                    <select name="category" value={this.state.category} onChange={this.handleChange} className="form-control">
                      <option value="repositories">Repositories</option>
                      <option value="users">Authors</option>
                      <option value="forks">Forks</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group">
                    <button className="btn btn-primary btn-round btn-md btn-block" type="submit">Show me</button>
                  </div>
                </div>
              </div>
            </form>
          </section>
          <section className="results">
            <h5>Total Results : {this.state.items_count}</h5>
            {this.state.search === "users" && this.state.request_complete && <Author items={this.state.items}/>}
            {this.state.search === "forks" && this.state.request_complete &&  <Fork items={this.state.items}/>}
            {this.state.search === "repositories" && this.state.request_complete && <Repository items={this.state.items}/>}

            {this.state.items_count > 20 && this.state.request_complete &&
              <section className="text-center">
                <ul className="pagination pagination-primary">
                    <li className={(this.state.page_no == 1) ? 'active page-item' : 'page-item'}>
                        <a className="page-link" onClick={this.getPage}>1</a>
                    </li>
                    <li className={(this.state.page_no == 2) ? 'active page-item' : 'page-item'}>
                        <a className="page-link" onClick={this.getPage}>2</a>
                    </li>
                    <li className={(this.state.page_no == 3) ? 'active page-item' : 'page-item'}>
                        <a className="page-link"  onClick={this.getPage}>3</a>
                    </li>
                    <li className={(this.state.page_no == 4) ? 'active page-item' : 'page-item'}>
                        <a className="page-link"  onClick={this.getPage}>4</a>
                    </li>
                    <li className={(this.state.page_no == 5) ? 'active page-item' : 'page-item'}>
                        <a className="page-link"  onClick={this.getPage}>5</a>
                    </li>
                </ul>
              </section>
            }
          </section>
        </div>
      </div>
    );
  }
}

export default App;
