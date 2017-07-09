import React from 'react';

export default(props) => {
  return (
    <div>
      {props.items.map(item => (
        <div key={item.id} className="card col-sm-12">
          <h6 className="col-sm-12">
            <a href={item.html_url} target="_blank">{item.name}</a>
          </h6>
          <div className="col-sm-6">
            by: &nbsp;
            <a href={item.owner.html_url} target="_blank">{item.owner.login}</a>
          </div>
          <div className="col-sm-6">
            <i className="fa fa-star fa-lg"></i>
              &nbsp; {item.stargazers_count}
          </div>
          <p className="col-sm-12">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
