const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
async function convertToPdf(htmlContent, outputFile) {
    
    // Launch a headless browser instance
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome'
    });
    const page = await browser.newPage();

    // Load your HTML content from a file
    // const htmlContent = fs.readFileSync('contract.html', 'utf8');

    // Set the page content to the HTML
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Generate a PDF
    await page.pdf({
        path: outputFile, // Path to save the PDF
        format: 'A4', // Paper format
        printBackground: true, // Include background colors
        margin: {
            top: '10mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm'
        }
    });

    await browser.close();
}
const htmlFilePath = path.join(__dirname, '..', 'contract', 'contract.html');
const outputDir = path.join(__dirname, './../generate');
const outputFile = path.join(outputDir, 'contract.pdf');

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }

// const htmlContent = fs.readFileSync('./../contract/contract.html', 'utf8');
convertToPdf(htmlContent, outputFile)
  .then(() => {
      console.log('PDF generated successfully');
  })
  .catch(e => console.log('Error: ', e));

});