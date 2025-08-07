import os
from supabase import create_client, Client
from dotenv import load_dotenv

#load environment variables
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

if not all (SUPABASE_URL, SUPABASE_KEY):
    raise EnvironmentError("One or more Supabase environment variables are missing")

#Connect supabase database
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

results = supabase.table('user').select('*').execute()
print(results)

