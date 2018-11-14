const db = require('./db');
const func = require('./func');
const child = require('./child');
const util = require('util');
const files = require('./file');
var exec = require('child_process').exec;
let childs = {};
xmlconf = {
  url: 'http://127.0.0.1:8000/jusic/',
  password: 'qwerty',
  shuffle: 1,
  playlist: '/home/jolken/music/playlist.m3u',
  streamName: 'Just music',
  infoUrl: 'none',
  theme: 'metal/mixed',
  description: 'my radio :)',
}
module.exports = (app) => {
  app.get('/', async (req, res) => {
    res.render(APP_ROOT + '/public/index', await func.render.index());
  });

  app.get('/db', async (req, res) => {
    await db.open(APP_ROOT+'/db/base.db');
    let sql = `SELECT * FROM test;`
    let data = await db.all(sql);
    res.send(data)
  });

  app.get('/:proc/start', async (req, res) => {
    config = req.body.config || '/home/jolken/frenki/jusic.xml';
    childs[req.params.proc] = child('ezstream', ['-c', config]);
    res.send('try to start');
  });
  app.get('/:proc/kill', async (req,res) => {
    childs[req.params.proc].kill(2);
    delete childs[req.params.proc];
    res.send('try to kill :D')
  });
  app.get('/:proc/skip', async (req, res) => {
    childs[req.params.proc].kill(10);
    res.send('try to skip')
  });
  app.get('/process/', async (req, res) => {
    res.send(util.inspect(childs));
  });
  app.post('/create/playlist', async (req, res) => {
    //find dir -iname "*.mp3" -print > playlist.m3u
    exec(`find ${req.body.dir} -iname "*.mp3" -print > ${req.body.output}`);
    //get output
    res.sendFile(req.body.output)  
  });
  app.post('/create/config', async (req, res) => {
    
  });
  app.post('/read/', async (req, res) => {
    file = files(req.body.output);
    res.send(await file.read())
  });
  app.post('/write/', async (req, res) => {
    file = files(req.body.output);
    res.send(await file.write(await func.render.xml(xmlconf)))
  })
}