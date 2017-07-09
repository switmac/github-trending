import React from 'react';

export default(props) => {
  return (
    <div>
      {props.items.map(item => (
        <div key={item.id} className="col-sm-2">
          <div className="card">
            <a href={item.html_url} target="_blank">
            <h6 className="text-center">
              {item.login}
            </h6>
            <div>
              <img src={item.avatar_url} className="rounded-circle" alt="user avatar"/>
            </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
