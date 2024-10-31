from bs4 import BeautifulSoup
import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

import os
print("Diretório atual:", os.getcwd())


def players_of_the_year():
    try:
        base_url = "https://www.transfermarkt.com/campeonato-brasileiro-serie-a/fussballerdesjahres/wettbewerb/BRA1/galerie/1/page/1"
        
        try:
            with open("../data/player_of_the_year.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}
        
        page = 1
        
        for _ in range(23):
            
            url = base_url.replace(('page/1'), (f"page/{page}"))
            page += 1
            if str(page) not in data_dict:
            
                response = requests.get(url, headers=headers)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                
                year = soup.select('.galerie-beschriftung-inhalt')[0].get_text()
                
                data_dict[year] = {}
                
                try: 
                    img = soup.select('.galerie-bild')[0].get_attribute_list('src')[0]
                    name = soup.select('.hauptlink a')[0].get_text()
                    id = soup.select('.hauptlink a')[0].get_attribute_list('href')[0].split('/')[-1]
                    image = soup.select('.bilderrahmen-fixed')[0].get_attribute_list('src')[0]
                    position = soup.select('.inline-table td')[2].get_text()
                    team_image = soup.select('.zentriert a img')[0].get_attribute_list('src')[0]
                    nat = soup.select('#yw1 > table > tbody > tr > td:nth-child(4) > img')[0].get_attribute_list('src')[0]
                except: 
                    continue
                
                data_dict[year] = {
                    'Image 1': img,
                    'Name': name,
                    'ID': id,
                    'Player ID': id,
                    'Image 2': image,
                    'Position': position,
                    'Team Image': team_image,
                    'Nat': nat,
                }
                      
                with open("../data/player_of_the_year.json", "w") as file:
                    json.dump(data_dict, file, indent=4)
                        
    except Exception as e:
        print(f"Error (players_of_the_year): {e}")
