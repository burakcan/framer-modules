import React, { Component, PropTypes } from 'react';
import { Spring } from 'react-motion';

class ModuleListItem extends Component {

  setSpringEnd() {
    const detailEl = React.findDOMNode(this._detail)

    detailEl.style.display = 'block';

    this.springEnd = {
      height : {val : detailEl.getClientRects()[0].height + 20, config: [50, 8]}
    }

    detailEl.style.display = 'none';
  }

  getSpringEnd() {
    return this.springEnd || { height : {val : 0} };
  }

  componentDidMount() {
    this.setSpringEnd();
  }

  render() {
    const { selected, data, onClick, onClose } = this.props;
    const { name, url, description, demo, title } = data;
    const author = data.author[0];

    const defaultValue = { height : {val : 0} }
    const endValue = this.getSpringEnd();

    return (
      <li data-selected={selected} onClick={selected ? null : onClick} className="module">
        <div className="container">
          <div className="module-info">
            <h2 className="module-info_name">{name || title}</h2>
            <p className="module-info_description">{description}</p>
            <button onClick={selected ? onClose : null} type="button" className="module_switch">
              <i className="icon icon-close"></i>
              <i className="icon icon-expand"></i>
            </button>
          </div>
          <Spring defaultValue={defaultValue} endValue={selected ? endValue : defaultValue}>
          {interpolated => {
            let calculated = {};

            if (this.springEnd) {
              calculated = {
                height   : interpolated.height.val + 'px',
                display  : 'block',
                overflow : 'hidden'
              }
            }

            return (
              <ul className="module-detail" style={calculated} ref={(c)=> this._detail = c}>
                <li>
                  <a href={author.url} target="_blank">
                    <i className="icon icon-profile"></i>
                    {author.name}
                  </a>
                </li>
                <li>
                  <a href={url} target="_blank">
                    <i className="icon icon-url"></i>
                    {url}
                  </a>
                </li>
                <li>
                  <a href={demo} target="_blank">
                    <i className="icon icon-demo"></i>
                    {demo}
                  </a>
                </li>
              </ul>
            )
          }.bind(this)}
          </Spring>
        </div>
      </li>
    )
  }
}

export default ModuleListItem;