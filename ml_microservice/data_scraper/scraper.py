import csv
import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def download_image(url, save_folder, ad_id):
    if not os.path.exists(save_folder):
        os.makedirs(save_folder)
    filename = f"{ad_id}.jpg"
    filepath = os.path.join(save_folder, filename)
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded image to: {filename}")
        else:
            print(f"Failed to download image for ID {ad_id}. Status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"Error downloading image for ID {ad_id}:", e)
        return False
    return True

def scrape_and_download(driver, ad_id, problematic_ids_writer):
    url = f"https://www.facebook.com/ads/library/?active_status=all&ad_type=political_and_issue_ads&country=ALL&id={ad_id}&media_type=all"
    driver.get(url)
    try:
        img_tag = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.x1gzqxud.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x1xp1s0c.x5yr21d.xh8yej3.x78zum5.xdt5ytf.xqui1pq img.x1ll5gia.x19kjcj4.xh8yej3"))
        )
        img_src = img_tag.get_attribute("src")
        if img_src:
            download_image(img_src, "downloaded_images", ad_id)
        else:
            print(f"No image found for ID {ad_id}")
            problematic_ids_writer.writerow([ad_id])
    except Exception as e:
        print(f"Error scraping and downloading for ID {ad_id}:", e)
        problematic_ids_writer.writerow([ad_id])

def process_batch(driver, ad_ids, problematic_ids_writer):
    for ad_id in ad_ids:
        scrape_and_download(driver, ad_id, problematic_ids_writer)

def main():
    service = Service(executable_path='C:\\Users\\rhoth\\Desktop\\chromedriver.exe')
    options = webdriver.ChromeOptions()
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(service=service, options=options)

    batch_size = 20

    with open('problematic_ids.csv', 'w', newline='') as problematic_ids_file, \
         open('ad_ids.csv', newline='') as ad_ids_file:

        problematic_ids_writer = csv.writer(problematic_ids_file)
        reader = csv.reader(ad_ids_file)
        next(reader)  # Skip header
        
        ad_ids = [row[0] for row in reader]
        for i in range(0, len(ad_ids), batch_size):
            batch = ad_ids[i:i+batch_size]
            process_batch(driver, batch, problematic_ids_writer)

    driver.quit()

if __name__ == "__main__":
    main()
