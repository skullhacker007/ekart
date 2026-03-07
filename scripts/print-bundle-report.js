const fs = require('fs');
const path = require('path');
const reportPath = path.join(process.cwd(), '.next', 'static', 'chunks', 'webpack-stats.json');
if (!fs.existsSync(reportPath)) {
    console.error('Bundle report not found:', reportPath);
    process.exit(1);
}
const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
console.log('Bundle report entries:', Object.keys(data));
