// external imports
const http = require('http');
const dns = require('dns');
const os = require("os");

async function getReqIpAddresses() {
    const promisePrivateIp = new Promise((resolve, reject) => {
        dns.lookup(os.hostname(), (err, ip, family) => {
            resolve(ip);
        });
    });

    const promisePublicIp = new Promise((resolve, reject) => {
        http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function (resp) {
            resp.on('data', function (ip) {
                resolve(ip.toString());
            });
        });
    });

    return Promise.all([promisePrivateIp, promisePublicIp]);
}

module.exports = getReqIpAddresses;

