import React from 'react';

export default (props) => {
  return (
    <div>
      {props.items.map(item => (
        <div key={item.id} className="card">
          <h6><a href={item.html_url}  target="_blank">{item.name}</a></h6>
          <p>
            By:
            <a href={item.owner.html_url} target="_blank">{item.owner.login}</a>
            <i className="fa fa-code-fork fa-lg"></i>
            : {item.forks}
          </p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
