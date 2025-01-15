import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Script to extract version from lerna.json and create info.json
 * This is used to maintain consistent versioning across the project
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the path to the lerna.json file
const lernaFile = path.join(__dirname, '..', 'lerna.json');

// Check if lerna.json exists
if (!fs.existsSync(lernaFile)) {
    console.error('Error: lerna.json not found');
    process.exit(1);
}

try {
    // Read and parse lerna.json
    const lernaContent = JSON.parse(fs.readFileSync(lernaFile, 'utf8'));
    const version = lernaContent.version;

    if (!version) {
        console.error('Error: Unable to extract version from lerna.json');
        process.exit(1);
    }

    // Create the info.json content
    const infoContent = JSON.stringify({ version }, null, 2);

    // Ensure the src/lib directory exists
    const infoDir = path.join(__dirname, 'src', 'lib');
    fs.mkdirSync(infoDir, { recursive: true });

    // Write the info.json file
    fs.writeFileSync(path.join(infoDir, 'info.json'), infoContent);

    console.log(`info.json created with version: ${version}`);
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
