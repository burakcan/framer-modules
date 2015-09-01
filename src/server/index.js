import 'babel-core/polyfill';
import path from 'path';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';
import serveStatic from 'serve-static';
import fs from 'fs';

const app      = Express();
const port     = process.env.PORT || 8080;
const distPath = path.join(__dirname, '../../dist');
const template = fs.readFileSync(distPath + '/index.html', 'utf8');

app.use(serveStatic(distPath + '/assets'));
app.use(handleRender);

function handleRender(req, res) {
  const html = React.renderToString( <App /> );
  res.send(renderFullPage(html));
}

function renderFullPage(html) {
  return template.replace('<!--PRERENDER-->', html);
}

app.listen(port, function(err) {
  if (err) throw err;

  console.log('App is running on: ' + port);
});
