import json
import csv
import requests
from concurrent.futures import ThreadPoolExecutor
import os
import re
import time

def process_id(id, value, images, failed_downloads):
    ad_endpoint = f'https://ad-archive.nexxxt.cloud/ad/{value}'
    retries = 5  # Maximum number of retries for fetching ad data
    ad_data = None

    for _ in range(retries):
        try:
            ad_response = requests.get(ad_endpoint)
            if ad_response.status_code == 200:
                ad_data = ad_response.json()
                break  # Break the loop if successful
            else:
                print(f"Non-200 status code received for ID {id}. Retrying in 5 seconds...")
                time.sleep(5)  # Wait for 5 seconds before retrying
        except requests.RequestException as e:
            print(f"Request failed for ID {id}: {e}. Retrying in 5 seconds...")
            time.sleep(5)

    if ad_data and images:
        image_link = images[0]  # Get the first image link
        try:
            response = requests.get(image_link)
            if response.status_code == 200:
                os.makedirs('images', exist_ok=True)
                with open(f'images/{value}.jpg', 'wb') as image_file:
                    image_file.write(response.content)
                print(f"Downloaded image for id: {id}")
            else:
                print(f"Failed to download image for ID {id}. Logging to failed downloads...")
                failed_downloads.append(id)
        except requests.RequestException as e:
            print(f"Image download failed for ID {id}: {e}. Logging to failed downloads...")
            failed_downloads.append(id)

    return {str(id): ad_data} if ad_data else None

def read_large_csv(file_path):
    image_links = {}
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            images = re.findall(r'https?://[^\s,]+', row['images'])
            image_links[row['id']] = images
    return image_links

def main():
    failed_downloads = []
    with open('mapping.json', 'r') as json_file:
        mapping = json.load(json_file)

    image_links = read_large_csv('filtered_output_id_original.csv')

    ad_responses = {}
    with ThreadPoolExecutor() as executor:
        futures = []
        for id, value in mapping.items():
            images = image_links.get(str(id))
            futures.append(executor.submit(process_id, id, value, images, failed_downloads))

        for future in futures:
            result = future.result()
            if result:
                ad_responses.update(result)

    # Write to JSON file at once
    with open('ad_responses.json', 'w') as f:
        json.dump(ad_responses, f, indent=4)

    # Saving failed downloads
    if failed_downloads:
        with open('failed_downloads.json', 'w') as f:
            json.dump(failed_downloads, f, indent=4)
        print(f"Failed downloads for the following IDs: {failed_downloads}")
    else:
        print("No failed downloads.")

    print("All tasks completed.")

if __name__ == "__main__":
    main()
