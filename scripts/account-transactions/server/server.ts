const http = require('http');

const server = http.createServer((req: any, res: any) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';
        req.on('data', (chunk: any) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log('Received webhook. Request details:');
            console.log('Headers:', JSON.stringify(req.headers, null, 2));

            try {
                const jsonData = JSON.parse(body);
                console.log('Parsed JSON data:');
                console.log(JSON.stringify(jsonData, null, 2));
                const fs = require('fs');
                const path = require('path');

                const filePath = path.join(__dirname, 'data', 'transactions.json');
                fs.readFile(filePath, 'utf8', (err: any, data: any) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return;
                    }

                    let existingData;
                    // Check if file is empty or contains data
                    if (!data || data.trim() === '') {
                        // If file is empty, create new structure with incoming data
                        existingData = {
                            erc20Transfers: jsonData.erc20Transfers
                        };
                    } else {
                        // If file has data, parse and append
                        try {
                            existingData = JSON.parse(data);
                            existingData.erc20Transfers.push(...jsonData.erc20Transfers);
                        } catch (parseErr) {
                            console.error('Error parsing existing JSON data:', parseErr);
                            return;
                        }
                    }

                    // Write the combined data back to file
                    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr: any) => {
                        if (writeErr) {
                            console.error('Error writing to file:', writeErr);
                        } else {
                            console.log('JSON data appended to transactions.json');
                        }
                    });
                });
            } catch (error: any) {
                console.log('Error parsing JSON:', error.message);
                console.log('Raw body:', body);
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Webhook received');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

