import csv
import json
import traceback
import time  # Import the time module
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import os

def create_mapping(library_id, ad_id, file_path="mapping.json"):
    try:
        # Check if the JSON file exists
        if not os.path.exists(file_path):
            # If the file doesn't exist, create it and initialize with an empty dictionary
            with open(file_path, 'w') as f:
                json.dump({}, f)

        # Load existing JSON data
        with open(file_path, 'r') as f:
            try:
                data = json.load(f)
            except json.decoder.JSONDecodeError:
                # If the file is empty or contains invalid JSON data, initialize with an empty dictionary
                data = {}

        # Add or update the key-value pair
        data[ad_id] = library_id

        # Write the updated data back to the JSON file
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=0)  # Ensure each entry is written on a new line
    except Exception as e:
        log_exception("create_mapping", e)

def scrape_and_find(driver, ad_id, problematic_ids_writer):
    url = f"https://www.facebook.com/ads/library/?active_status=all&ad_type=political_and_issue_ads&country=US&q={ad_id}&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=keyword_unordered&media_type=all"
    driver.get(url)
    try:
        span_tag = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "span.x8t9es0.xw23nyj.xo1l8bm.x63nzvj.x108nfp6.xq9mrsl.x1h4wwuj.xeuugli"))
        )
        library_id_text = span_tag.text.strip()
        # Use regular expressions to extract the integer after "Kütüphane Kodu"
        splitted_txt = re.search(r'Kütüphane Kodu:\s*(\d+)', library_id_text).group().split()
        library_id = splitted_txt[2]
        if library_id:
            create_mapping(library_id, ad_id)
        else:
            print(f"No id found for ID {ad_id}")
            problematic_ids_writer.writerow([ad_id])
    except Exception as e:
        log_exception("scrape_and_find", e)
        problematic_ids_writer.writerow([ad_id])
    finally:
        time.sleep(20)  # Wait for 1 second after each scraping operation

def process_batch(driver, ad_ids, problematic_ids_writer):
    for ad_id in ad_ids:
        scrape_and_find(driver, ad_id, problematic_ids_writer)

def main():
    service = Service(executable_path='C:\\Users\\rhoth\\Desktop\\chromedriver.exe')
    options = webdriver.ChromeOptions()
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(service=service, options=options)

    batch_size = 20

    with open('unfound_ids.csv', 'w', newline='') as unfound_ids_file, \
         open('filtered_output_id.csv', newline='') as filtered_output_ids_file, \
         open('error_log.txt', 'w') as error_log:

        problematic_ids_writer = csv.writer(unfound_ids_file)
        reader = csv.reader(filtered_output_ids_file)
        next(reader)  # Skip header
        
        ad_ids = [row[0] for row in reader]
        for i in range(0, len(ad_ids), batch_size):
            batch = ad_ids[i:i+batch_size]
            process_batch(driver, batch, problematic_ids_writer)

    driver.quit()

def log_exception(function_name, exception):
    with open('error_log.txt', 'a') as error_log:
        error_log.write(f"Exception in function '{function_name}': {exception}\n")

if __name__ == "__main__":
    main()
