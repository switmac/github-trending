import React from 'react';

export default (props) => {
  let is_min = (props.pageNo === 1) ? 'page-item disabled' : 'page-item',
      is_max = (props.pageNo === props.maxPage) ? 'page-item disabled' : 'page-item';

  return (
    <section className="text-center">
      <ul className="pagination pagination-primary">
        <li className={is_min} >
          <a className="page-link" onClick={props.getPrevPage} aria-label="Previous">
              <span aria-hidden="true"><i className="fa fa-angle-double-left" aria-hidden="true"></i></span>
          </a>
        </li>
        <li className='active page-item'>
          <a className="page-link">{props.pageNo}</a>
        </li>
        <li className={is_max}>
          <a className="page-link" onClick={props.getNextPage} aria-label="Next">
            <span aria-hidden="true"><i className="fa fa-angle-double-right" aria-hidden="true"></i></span>
          </a>
        </li>
      </ul>
    </section>
  );
}
