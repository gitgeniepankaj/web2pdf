# Web Scraping and PDF Generation Toolkit

This project automates the process of scraping web content from URLs listed in a CSV file and converting screenshots of this content into PDF documents. It uses Puppeteer for web scraping, PDFKit for generating PDFs, and additional Node.js libraries for file and image handling.

## Features

- **Read URLs from a CSV file:** Dynamically input multiple URLs to be processed.
- **Automatic web page scrolling:** Ensures that dynamic JavaScript content is fully loaded.
- **Screenshot capture:** Takes full-page screenshots of web content.
- **PDF Conversion:** Converts screenshots into full-width PDF documents, formatted for A4 size.

## Prerequisites

Ensure you have Node.js installed on your machine. This project was developed with Node.js version 16.x.

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/gitgeniepankaj/web2pdf
cd web2pdf

```

```bash
npm install
```

To run the script, ensure that your CSV file with URLs (urls.csv) is in the project directory, then execute:

```bash
node index.js

```

## Video

Checkout the video for more details and please like/subscribe 

https://www.youtube.com/watch?v=MxgOUbrky90&t=12s


## Project Structure


/project

    ├── images/                  # Folder for storing screenshots
    ├── pdf/                     # Folder for storing generated PDFs
    ├── index.js                 # Main script file
    ├── urls.csv                 # CSV file containing URLs to process
    ├── package.json             # Node.js dependencies and project info
    └── .gitignore               # Specifies intentionally untracked files to ignore



### Configuration
 - CSV Format: The CSV file should have a header named url in the first row.
- Environment Variables: Set environmental variables in a .env file (not included) if needed.

### Dependencies

- Puppeteer: For automating browser tasks.
- PDFKit: For creating PDF documents.
- csv-parser: To parse CSV files.
- image-size: To determine dimensions of images for scaling in PDFs.

### Contributing
Contributions to this project are welcome. Please fork the repository and submit a pull request with your enhancements.

### License
This project is licensed under the MIT License - see the LICENSE.md file for details.

### Author
Pankaj Dadure - Initial work 

### Acknowledgments
- Node.js community
- Contributors who have reported bugs or submitted fixes