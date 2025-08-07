import os
from supabase import create_client, Client
from dotenv import load_dotenv

#load environment variables
load_dotenv()



supabase: Client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

results = supabase.table('user').select('*').execute()
print(results)

