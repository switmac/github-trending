import React from 'react';

export default (props) => {
  return (
    <div>
      {props.items.map(item => (
        <div key={item.id} className="card">
          <h6><a href={item.html_url} target="_blank">{item.login}</a></h6>
          <div className="col-sm-2">
            <img src={item.avatar_url} className="rounded-circle" alt="user avatar" />
          </div>
        </div>
      ))}
    </div>
  );
}
