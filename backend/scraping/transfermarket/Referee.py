import time
from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def referee_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    action_url = '/plus/0?funktion=1&saison_id=&wettbewerb_id=BRA1'

    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')

    referee_id = url.split('/')[-1]
    
    if(referee_id not in list):
        try:
            data = soup.select('.data-header__label')
            referee_info = {}
            img = soup.select('.data-header__profile-image')

            try:
                referee_info = {
                    "date_of_birth_age": None,
                    "citizenship": None,
                    "first_league_debut": None,
                }

                for item in soup.select('.data-header__items'):
                    for li in item.find_all('li', class_='data-header__label'):
                        label = li.get_text(strip=True)
                        content = li.find('span', class_='data-header__content')
                        
                        if content:
                            content_text = content.get_text(strip=True)
                            if label.startswith("Date of birth/Age:"):
                                referee_info["date_of_birth_age"] = content_text
                            elif label.startswith("Citizenship:"):
                                referee_info["citizenship"] = content_text
                            elif label.startswith("1st league debut:"):
                                referee_info["first_league_debut"] = content_text
            except:
                pass 
              
            try:
                referee_info["Image"] = img[0].get_attribute_list('src')[0]
            except:
                pass
            
            response = requests.get(base_url + url + action_url, headers=headers)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser')
            
            
            dict = {}
            try:
                stats = soup.select('#tm-main > div.row > div.large-8.columns > div > div.responsive-table > table > tbody > tr > td')

                teams = []
                team_data = {}
                filtered_stats = []

                for elemento in stats:
                    colspan = elemento.get('colspan')
                    if not colspan and elemento:
                        filtered_stats.append(elemento)                
                
                i = 0
                for index, elemento in enumerate(filtered_stats):
                    text = elemento.get_text().strip().split('  ')[0]

                    if index % 11 == 0:
                        if team_data:
                            teams.append(team_data)
                        team_data = {'Matchday': text }
                    elif index % 11 == 1:
                        team_data['Date'] = text
                    elif index % 11 == 3:
                        team_data['Home Team'] = text
                    elif index % 11 == 5:
                        team_data['Away Team'] = text
                    elif index % 11 == 6:
                        team_data['Result'] = text
                    elif index % 11 == 7:
                        team_data['Yellow Cards'] = text
                    elif index % 11 == 8:
                        team_data['Scnd Yellow Cards'] = text
                    elif index % 11 == 9:
                        team_data['Red Cards'] = text
                    elif index % 11 == 10:
                        team_data['Penalty Kicks'] = text
                        i = i + 1

                    teams.append(team_data)
                    teams = []
                    
                    dict[i] = teams
            except:
                pass
            
            referee_info["Matches"] = dict
            
            list[referee_id] = referee_info

        except Exception as e:
            print(f"Error (referee): {e}")
        
    return referee_id
