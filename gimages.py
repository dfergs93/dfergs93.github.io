import pandas as pd
import csv
import requests
from bs4 import BeautifulSoup
# List of NBA player names.
player_csv = 'nba_player_names.csv'
player_list = pd.read_csv(player_csv,sep = ',')
nba_players = list(player_list)[75:]
data = []

for player in nba_players:
    word = player + ' espn'
    url = 'https://www.google.com/search?q={0}&tbm=isch'.format(word)
    content = requests.get(url).content
    soup = BeautifulSoup(content,'lxml')
    image = list(soup.findAll('img',limit=2))[1]
    image_link = image.get('src')
    data.append([player,image_link])
with open('nba150_profile_pics.csv', 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['player_name', 'image_url'])
    writer.writerows(data)
