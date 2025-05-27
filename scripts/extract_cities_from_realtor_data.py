import csv
import os

# Get the directory where the script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# Construct the path to the CSV file, assuming it's in a 'web' directory sibling to 'scripts'
INPUT_CSV_PATH = os.path.join(SCRIPT_DIR, '..', 'web', 'top_100_realtors_canada_top10cities.csv')

def extract_unique_cities():
    unique_cities = set()
    try:
        with open(INPUT_CSV_PATH, mode='r', encoding='utf-8') as infile:
            reader = csv.DictReader(infile)
            if 'City' not in reader.fieldnames:
                print(f"Error: 'City' column not found in {INPUT_CSV_PATH}")
                print(f"Available columns: {reader.fieldnames}")
                return

            for row in reader:
                city_province = row['City'].strip()
                if city_province:
                    unique_cities.add(city_province)
    except FileNotFoundError:
        print(f"Error: Input CSV file not found at {INPUT_CSV_PATH}")
        return
    except Exception as e:
        print(f"An error occurred: {e}")
        return

    if unique_cities:
        print("Unique Cities/Provinces found in the realtor data:")
        for cp in sorted(list(unique_cities)):
            print(cp)
    else:
        print("No city data found or extracted.")

if __name__ == '__main__':
    extract_unique_cities() 