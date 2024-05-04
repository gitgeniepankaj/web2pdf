const puppeteer = require("puppeteer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const sizeOf = require("image-size");
const csv = require("csv-parser");
// Function to read URLs from a CSV file
const readUrlsFromCsv = async (csvFilePath) => {
    const urls = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on("data", (row) => urls.push(row.url)) // Assumes 'url' is the column name
            .on("end", () => {
                resolve(urls);
            });
    });
};
// Function to automatically scroll through the page
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
// Function to create a PDF from an image with full-width fitting
function createPDFWithFullWidthImage(imagePath, pdfPath) {
    const doc = new PDFDocument({
        autoFirstPage: false,
        margins: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);
    const { width, height } = sizeOf(imagePath);
    let pdfWidth = 595.28; // A4 width in points
    let scaleFactor = pdfWidth / width;
    let imageHeight = height * scaleFactor;
    doc.addPage({
        size: [pdfWidth, imageHeight],
    });
    doc.image(imagePath, 0, 0, {
        width: pdfWidth,
        height: imageHeight,
    });
    doc.end();
    stream.on("finish", () => {
//        console.log(`PDF created for ${imagePath}`);
    });
}

// Main function to process each URL from the CSV
(async () => {
    const urls = await readUrlsFromCsv("./urls.csv"); // Update this to the path of your CSV file
    for (let i = 0; i < urls.length; i++) {
        console.log(`Processing ${urls[i]}`);
       const browser = await puppeteer.launch({
         headless: true, // Ensure this is set to true
         args: ["--no-sandbox", "--disable-setuid-sandbox"], // Additional arguments to enhance compatibility in non-interactive environments
       });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1,
        });
        
        await page.goto(urls[i], {
            waitUntil: "networkidle0",
        });
        
        let title = await page.title();
        let timestamp = Date.now() / 1000 | 0;
        title = title.replace(/[.*+?^${}()|[\]\\]/g, '-');
//        console.log(title);
        
        //await page.waitForSelector("footer", { timeout: 0 }); // Adjust as necessary
        await autoScroll(page);
        // Define paths for the screenshot and PDF
        const imageFileName = `${title}_${timestamp}.png`;
        const pdfFileName = `${title}_${timestamp}.pdf`;
        const imagePath = `./images/${imageFileName}`;
        const pdfPath = `./pdf/${pdfFileName}`;
        await page.screenshot({ path: imagePath, fullPage: true });
        await browser.close();
        createPDFWithFullWidthImage(imagePath, pdfPath);
    }
})();
