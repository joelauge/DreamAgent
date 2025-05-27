'''
Script to import city data from a CSV file into a Supabase database.

Expects the following environment variables to be set:
- SUPABASE_URL: The URL of your Supabase project.
- SUPABASE_SERVICE_KEY: The service_role key for your Supabase project.

The input CSV file is expected to be located at '../web/canada_top_100_cities_enriched.csv'
relative to this script's parent directory (i.e., in the 'web' folder if this script is in 'scripts').

CSV Columns expected:
- city (text, map to name)
- population (integer)
- province (text)
- area_km2 (numeric, optional)
- density (numeric, optional)
- founded (text, optional)
- notable_fact (text, optional)
- latitude (float/text)
- longitude (float/text)
- google_maps_url (text, optional, map to gmaps_url)
- map_definition (text, optional, map to gmaps_embed_html)
- background_image_url (text, optional, if you add this column to CSV)
'''
import csv
import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env file in the project root
# Assumes this script is in a 'scripts' directory, so .env is one level up.
DOTENV_PATH = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(DOTENV_PATH)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

# Determine the absolute path to the CSV file
# SCRIPT_DIR is the directory where this script (import_cities.py) is located.
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# INPUT_CSV_PATH is ../web/canada_top_100_cities_enriched.csv relative to SCRIPT_DIR
INPUT_CSV_PATH = os.path.join(SCRIPT_DIR, '..', 'web', 'canada_top_100_cities_enriched.csv')

def get_float_or_none(value_str):
    if value_str is None or value_str.strip() == '':
        return None
    try:
        return float(value_str)
    except ValueError:
        return None

def get_int_or_none(value_str):
    if value_str is None or value_str.strip() == '':
        return None
    try:
        return int(float(value_str)) # Handle cases like "123.0"
    except ValueError:
        return None

def import_data():
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required.")
        print(f"Please create a .env file in the project root ({os.path.abspath(os.path.join(SCRIPT_DIR, '..'))}) with these values.")
        sys.exit(1)

    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        print(f"Successfully connected to Supabase project at {SUPABASE_URL[:30]}...")
    except Exception as e:
        print(f"Error connecting to Supabase: {e}")
        sys.exit(1)

    print(f"Attempting to read city data from: {INPUT_CSV_PATH}")
    rows_processed = 0
    rows_imported = 0
    rows_skipped = 0

    try:
        with open(INPUT_CSV_PATH, mode='r', encoding='utf-8') as infile:
            reader = csv.DictReader(infile)
            required_cols = ['city', 'province', 'population', 'latitude', 'longitude']
            missing_cols = [col for col in required_cols if col not in reader.fieldnames]
            if missing_cols:
                print(f"Error: CSV is missing required columns: {', '.join(missing_cols)}")
                print(f"Available columns: {reader.fieldnames}")
                sys.exit(1)

            for row in reader:
                rows_processed += 1
                city_name = row.get('city', '').strip()
                province = row.get('province', '').strip()

                if not city_name or not province:
                    print(f"Warning: Skipping row {rows_processed} due to missing city name or province.")
                    rows_skipped += 1
                    continue

                lat = get_float_or_none(row.get('latitude'))
                lon = get_float_or_none(row.get('longitude'))
                geo_point = None
                if lat is not None and lon is not None:
                    # Format for PostGIS point: POINT(longitude latitude)
                    geo_point = f"POINT({lon} {lat})"

                city_data = {
                    'name': city_name,
                    'province': province,
                    'population': get_int_or_none(row.get('population')),
                    'geo_coordinates': geo_point,
                    'background_image_url': row.get('background_image_url'), # Will be None if col not in CSV
                    'gmaps_url': row.get('google_maps_url'),
                    'gmaps_embed_html': row.get('map_definition'),
                    'area_km2': get_float_or_none(row.get('area_km2')),
                    'density': get_float_or_none(row.get('density')),
                    'founded': row.get('founded'),
                    'notable_fact': row.get('notable_fact')
                }
                # Filter out keys with None values if you prefer not to send them,
                # or let Supabase handle them (it usually does by setting to NULL if column is nullable)
                # city_data_cleaned = {k: v for k, v in city_data.items() if v is not None}

                try:
                    # Using upsert with ignore_duplicates=True based on the (name, province) unique constraint
                    # If you don't have a unique constraint that Supabase client can use for on_conflict,
                    # you might need to query first then insert.
                    # For this, we rely on the UNIQUE (name, province) constraint in the DB.
                    # If insert fails due to unique constraint violation, it will raise an error
                    # which we catch to mean "skip duplicate".
                    data, error = supabase.table('cities').insert(city_data).execute()
                    
                    if error and hasattr(error, 'code') and error.code == '23505': # Unique violation
                        print(f"Skipping duplicate city: {city_name}, {province}")
                        rows_skipped += 1
                    elif error:
                        print(f"Error inserting {city_name}, {province}: {error.message if hasattr(error, 'message') else error}")
                        # Decide if you want to stop or continue on other errors
                        # For now, we'll log and continue, effectively skipping on error too.
                        rows_skipped += 1 
                    else:
                        print(f"Successfully imported: {city_name}, {province}")
                        rows_imported += 1
                except Exception as e_insert:
                    # This catch block is for Supabase client errors that are not PostgrestAPIError
                    # or if the error object doesn't have a .code attribute (should be rare)
                    print(f"An unexpected error occurred inserting {city_name}, {province}: {e_insert}")
                    print("Please ensure the 'cities' table exists and the schema matches (name, province should be UNIQUE).")
                    rows_skipped +=1

    except FileNotFoundError:
        print(f"Error: Input CSV file not found at {INPUT_CSV_PATH}")
        sys.exit(1)
    except Exception as e_file:
        print(f"An error occurred reading or processing the CSV: {e_file}")
        sys.exit(1)
    finally:
        print(f"\n--- Import Summary ---")
        print(f"Total rows processed from CSV: {rows_processed}")
        print(f"Rows successfully imported: {rows_imported}")
        print(f"Rows skipped (duplicates or errors): {rows_skipped}")

if __name__ == "__main__":
    import_data() 