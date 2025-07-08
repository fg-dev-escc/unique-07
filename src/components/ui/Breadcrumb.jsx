import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ title, items = [] }) => {
  return (
    <div className="site-breadcrumb" style={{ background: 'url(/assets/img/breadcrumb/01.jpg)' }}>
      <div className="container">
        <h2 className="breadcrumb-title">{title}</h2>
        <ul className="breadcrumb-menu">
          {items.map((item, index) => (
            <li key={index} className={item.active ? 'active' : ''}>
              {item.active ? (
                item.label
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;