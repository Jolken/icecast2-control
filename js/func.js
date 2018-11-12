
let funcs = {
    render: {
        index: async () => {
            return {title:'audio server', text: 'in progress'}
        },
        xml: async (data) => {
            return `
<ezstream>
    <url>${data.url}</url>
    <sourcepassword>${data.password}</sourcepassword>
    <format>MP3</format>
    <shuffle>${data.shuffle}</shuffle>
    <filename>${data.playlist}</filename>
    <stream_once>0</stream_once><svrinfoname>${data.streamName}</svrinfoname>
    <svrinfourl>${data.infoUrl}</svrinfourl>
    <svrinfogenre>${data.theme}</svrinfogenre>
    <svrinfodescription>${data.description}</svrinfodescription>
    <svrinfobitrate>${data.bitrate}</svrinfobitrate>
    <svrinfochannels>2</svrinfochannels>
    <svrinfosamplerate>44100</svrinfosamplerate>
    <svrinfopublic>0</svrinfopublic>
</ezstream>
            `
        },
    },
    db: {
        get: async (dbName) => {
            let db = new sqlite3.Database(APP_ROOT + '/db/base.db');
            let data = await db.all(`SELECT * FROM test;`);
            db.close();
            return data
        },
    }
}
module.exports = funcs;