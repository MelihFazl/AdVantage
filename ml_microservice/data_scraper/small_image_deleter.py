import os
import time
from PIL import Image
import subprocess

def try_delete(file_path, max_attempts=1, wait_seconds=1):
    """Attempt to delete a file with retries on permission errors."""
    for attempt in range(max_attempts):
        try:
            os.remove(file_path)
            print(f"Deleted {file_path}")
            break
        except PermissionError as e:
            if attempt < max_attempts - 1:
                print(f"Delete failed, retrying in {wait_seconds} seconds...")
                time.sleep(wait_seconds)
            else:
                print(f"Failed to delete {file_path} after {max_attempts} attempts. Error: {e}")

def delete_low_resolution_images(min_width, min_height):
    """
    Delete images with a resolution lower than specified width and height in the 'images' subfolder
    of the directory where this script is located.

    Args:
    min_width (int): The minimum width of the images to keep.
    min_height (int): The minimum height of the images to keep.
    """
    folder_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'images')
    print(f"Checking images in {folder_path}")  # Print the folder being checked
    files_processed = 0  # Counter to track the number of images processed

    if not os.path.exists(folder_path):
        print("The 'images' folder does not exist.")
        return

    # Iterate through all files in the folder
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff')):
            file_path = os.path.join(folder_path, filename)
            try:
                with Image.open(file_path) as img:
                    # Ensure all operations on the image happen here
                    width, height = img.width, img.height
                    print(f"{filename}: Width = {width}, Height = {height}")
                    if width < min_width or height < min_height:
                        # Image processing complete, now attempt deletion
                        try_delete(file_path)
            except Exception as e:
                print(f"Failed to open or process {filename}. Error: {e}")
            files_processed += 1

    if files_processed == 0:
        print("No image files found in the 'images' directory.")

# Example usage
min_width = 50  # Minimum width in pixels
min_height = 50  # Minimum height in pixels
delete_low_resolution_images(min_width, min_height)
