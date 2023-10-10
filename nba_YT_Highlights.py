import pandas as pd
import csv
from googleapiclient.discovery import build

# Replace 'YOUR_API_KEY' with your actual API key.
api_key = 'AIzaSyDgluMhPYXPZWkFh8ky9VkmvopvOwNTjZI'
youtube = build('youtube', 'v3', developerKey=api_key)

# List of NBA player names.
player_csv = 'nba_player_names.csv'
player_list = pd.read_csv(player_csv,sep = ',')
nba_players = list(player_list)[75:]


# Initialize an empty list to store data.
data = []

for player in nba_players:
    # Perform a YouTube search for the player's highlights.
    search_response = youtube.search().list(
        part='snippet',
        q=f"{player} highlights mixtape 2022-23",
        type='video',
        maxResults=1
    ).execute()

    # Extract the YouTube URL from the search results.
    if 'items' in search_response:
        video_id = search_response['items'][0]['id']['videoId']
        youtube_url = f'https://www.youtube.com/watch?v={video_id}'
        data.append([player, youtube_url])

# Write the data to a CSV file.
with open('nba150_highlights.csv', 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['player_name', 'youtube_url'])
    writer.writerows(data)
