const http = require('http');

class HttpError extends Error {
    constructor(code, message = 'Uh oh something went wrong.') {
        super(`${message} HTTP code ${code}`);
        this.code = code;
    }
}

const port = 8080;
const accountJackTorrance = require('./result.json');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // all cors okay.
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    handleRequest(req, res);
});

async function handleRequest(req, res) {
    try {
        switch (req.url) {
            case '/api/balance':
                handleGetBalance(req, res);
                break;
            case '/api/balance/add':
                await handleAddBalance(req, res);
                break;
            default:
                throw new HttpError(404);
        }
    } catch (ex) {
        console.error(ex);

        res.writeHead(ex.code || 500);
        res.write(ex.message);
        res.end();
    }
}

function handleGetBalance(req, res) {
    if (req.method !== 'GET') {
        throw new HttpError(405);
    }

    const random = Math.random();
    if (random >= 0.8) {
        throw new HttpError(503);
    } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(accountJackTorrance, 0, 4));
        res.end();
    }
}

async function handleAddBalance(req, res) {
    if (req.method !== 'PUT') {
        throw new HttpError(405);
    }

    const debitOrCredit = await readRequestAsJson(req);

    const propsValid = Object.keys(debitOrCredit).every(prop =>
        ['amount', 'description', 'date', 'from', 'to'].includes(prop));

    if (!propsValid) {
        throw new HttpError(400, 'Incorrect message.');
    }

    accountJackTorrance.debitsAndCredits.push(debitOrCredit);
    accountJackTorrance.account.balance += debitOrCredit.amount;

    res.writeHead(200);
    res.end();
}

function readRequestAsJson(req) {
    return new Promise((resolve, reject) => {
        let result = '';

        req.on('data', (chunk) => result += chunk)
            .on('end', () => {
                try {
                    resolve(JSON.parse(result));
                } catch (ex) {
                    reject(ex);
                }
            });
        });
}

server.listen(port, function () {
    console.log("Server listening on: http://localhost:3000", port);
});
