import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import dotenv from 'dotenv';
import { getStrapiURLClient } from '../lib/utils';
import { fetchData } from '../lib/fetch';

// Define types
interface SectionQuery {
  populate: {
    [key: string]: {
      populate?: {
        [key: string]: {
          fields?: string[];
          populate?: any;
        }
      };
      on?: {
        [key: string]: {
          populate: any
        }
      }
    }
  }
}

interface Section {
  name: string;
  path: string;
  query: SectionQuery;
}

interface Config {
  sections: Section[];
  staticDir: string;
  buildCacheDir: string;
}

// Configuration
const config: Config = {
  sections: [
    {
      name: 'navbar',
      path: '/api/global',
      query: {
        populate: {
          topnav: {
            populate: {
              logoLink: {
                populate: {
                  image: { fields: ['url', 'alternativeText', 'name'] }
                }
              }
            }
          }
        }
      }
    },
    {
      name: 'footer',
      path: '/api/global',
      query: {
        populate: {
          footer: {
            populate: {
              logoLink: {
                populate: {
                  image: { fields: ['url', 'alternativeText', 'name'] }
                }
              }
            }
          }
        }
      }
    },
    {
      name: 'homepage',
      path: '/api/home-page',
      query: {
        populate: {
          blocks: {
            on: {
              'blocks.hero-section': {
                populate: {
                  cta: true,
                  image: {
                    fields: ['url', 'alternativeText', 'name']
                  },
                  image_dark: {
                    fields: ['url', 'alternativeText', 'name']
                  }
                }
              },
              'blocks.logo-carousel': {
                populate: {
                  logoItems: {
                    populate: {
                      image: {
                        fields: ['url', 'alternativeText', 'name']
                      }
                    }
                  }
                }
              },
              'blocks.content-items': {
                populate: {
                  image: {
                    fields: ['url', 'alternativeText', 'name']
                  },
                  items: {
                    populate: '*'
                  }
                }
              }
            }
          }
        }
      }
    }
  ],
  staticDir: path.join(process.cwd(), 'public/static-images'),
  buildCacheDir: path.join(process.cwd(), '.next/cache/images')
};


// Utility to ensure a directory exists
function ensureDirectoryExistence(filePath: string): boolean {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
  return true;
}

// Function to download an image
function downloadImage(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ensureDirectoryExistence(destination);
    const file = fs.createWriteStream(destination);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

// Function to extract image URLs from Strapi response
function extractImageUrls(data: any): string[] {
  const urls: string[] = [];
  
  function traverse(obj: any): void {
    if (!obj || typeof obj !== 'object') return;
    
    if (Array.isArray(obj)) {
      obj.forEach(item => traverse(item));
      return;
    }
    
    Object.keys(obj).forEach(key => {
      if (key === 'url' && typeof obj[key] === 'string' && obj[key].startsWith('/uploads')) {
        urls.push(obj[key]);
      } else if (typeof obj[key] === 'object') {
        traverse(obj[key]);
      }
    });
  }
  
  traverse(data);
  return urls;
}

// Function to convert nested query object to Strapi query string format
function stringifyQueryObject(obj: any, prefix = ''): string {
  if (!obj || typeof obj !== 'object') return '';
  
  return Object.keys(obj).map(key => {
    const value = obj[key];
    const keyPath = prefix ? `${prefix}[${key}]` : key;
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return stringifyQueryObject(value, keyPath);
    } else if (Array.isArray(value)) {
      return value.map(item => `${keyPath}[]=${encodeURIComponent(item)}`).join('&');
    } else {
      return `${keyPath}=${encodeURIComponent(value)}`;
    }
  }).join('&');
}

// Additional utility to check if the Strapi server is reachable
async function checkStrapiConnection(): Promise<boolean> {
  try {
    const strapiUrl = getStrapiURLClient();
    console.log('ENV STRAPI_URL:', process.env.NEXT_PUBLIC_STRAPI_BASE_URL);
    console.log(`Checking connection to Strapi at: ${strapiUrl}`);
    
    // Try to connect with a timeout - using native http/https modules instead of fetch
    // This avoids potential issues with fetch API in Node.js environments
    return new Promise<boolean>((resolve) => {
      const protocol = strapiUrl.startsWith('https') ? https : http;
      const req = protocol.get(strapiUrl, (res) => {
        // Any response (even error responses) means server is reachable
        console.log(`Strapi server responded with status: ${res.statusCode ?? 'unknown'}`);
        resolve(true);
        res.resume(); // Consume response data to free memory
      });
      
      // Set a timeout for the request
      req.setTimeout(5000, () => {
        console.log('Connection timeout to Strapi server');
        req.destroy();
        resolve(false);
      });
      
      req.on('error', (err : any) => {
        console.error(`Connection error to Strapi server: ${err.message}`);
        // Log more details if available
        if (err.code) console.error(`Error code: ${err.code}`);
        if (err.stack) console.error(`Stack: ${err.stack}`);
        resolve(false);
      });
    });
  } catch (error) {
    console.error('Strapi connection check failed with exception:', error);
    return false;
  }
}

// Process a single section
async function processSection(section: Section): Promise<string[]> {
  try {
    const baseUrl = getStrapiURLClient();
    // Use our custom query stringifier instead of qs.stringify
    const queryString = stringifyQueryObject(section.query);
    
    // Combine the base URL, path, and query string
    const url = `${baseUrl}${section.path}?${queryString}`;
    
    console.log(`Fetching data for section: ${section.name}`);
    console.log(`URL: ${url}`);
    
    // Add timeout to prevent hanging if server is unreachable
    const data = await Promise.race([
      fetchData(url),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout - Check if Strapi server is running')), 5000)
      )
    ]);
    
    const imageUrls = extractImageUrls(data);
    console.log(`Found ${imageUrls.length} images in ${section.name}`);
    
    // Download each image
    const downloads = imageUrls.map(async (imageUrl) => {
      const fullUrl = `${getStrapiURLClient()}${imageUrl}`;
      const destination = path.join(config.staticDir, imageUrl);
      
      console.log(`Downloading: ${fullUrl}`);
      await downloadImage(fullUrl, destination);
      console.log(`Downloaded to: ${destination}`);
      
      return destination;
    });
    
    return Promise.all(downloads);
  } catch (error) {
    console.error(`Error processing section ${section.name}:`, error);
    console.log(`Skipping section ${section.name} due to error`);
    return [];
  }
}

// Main function
async function main(): Promise<void> {
  dotenv.config();
  // Create directories if they don't exist
  if (!fs.existsSync(config.buildCacheDir)) {
    fs.mkdirSync(config.buildCacheDir, { recursive: true });
  }
  
  if (!fs.existsSync(config.staticDir)) {
    fs.mkdirSync(config.staticDir, { recursive: true });
  }
  
  let hasErrors = false;
  
  try {
    // Display the Strapi URL being used
    const strapiUrl = getStrapiURLClient();
    console.log(`Strapi URL: ${strapiUrl}`);
    console.log('Starting image download process...');
    
    // Attempt alternative connection if main check fails
    const isConnected = await checkStrapiConnection();
    if (!isConnected) {
      console.warn('\n⚠️ WARNING: Cannot connect to Strapi server using standard method!');
      console.warn('Attempting alternative connection methods...');
    }
    
    // Process all configured sections
    for (const section of config.sections) {
      console.log(`\n--- Processing ${section.name} ---`);
      try {
        await processSection(section);
      } catch (sectionError) {
        console.error(`Failed to process section ${section.name}:`, sectionError);
        console.log(`Continuing with next section...`);
        hasErrors = true;
      }
    }
    
    if (hasErrors) {
      console.log('\nImage download completed with some errors. Check the logs above.');
      console.log('Common issues:');
      console.log('1. Strapi server not running during build');
      console.log('2. Invalid URL in getStrapiUrlClient() function');
      console.log('3. Network connectivity or firewall issues');
      console.log('\nTo fix:');
      console.log('- Ensure Strapi is running when executing this script');
      console.log('- Check environment variables (NEXT_PUBLIC_STRAPI_BASE_URL)');
      console.log('- Manually download and place images if needed');
    } else {
      console.log('\nAll images downloaded successfully!');
    }
  } catch (error) {
    console.error('Error downloading images:', error);
    
    // Don't exit with error to allow build to continue
    console.log('\nImage download failed, but continuing with build.');
    console.log('You may need to manually add missing images to public/static-images/');
  }
}

// Run the script
main();