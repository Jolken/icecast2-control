const db = require('./db')
const func = require('./func');
const child = require('./child');
let childs = {}
module.exports = (app) => {
  app.get('/', async (req, res) => {
    res.render(APP_ROOT + '/public/index', await func.render.index());
  });

  app.get('/db', async (req, res) => {
    await db.open(APP_ROOT+'/db/base.db')
    let sql = `SELECT * FROM test;`
    let data;
    data = await db.all(sql)
    res.send(data)
  });

  app.get('/:proc/start', async (req, res) => {
    childs[req.params.proc] = child('ezstream', ['-c', '/etc/ezstream/jusic.xml']);
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
}