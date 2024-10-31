import time
from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def manager_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
        
    manager_id = url.split('/')[-1]
    
    if(manager_id not in list):
        try:
            full_name = soup.select("#tm-main > header > div.data-header__headline-container > h1")
            actual_team = soup.select('.data-header__club > a:nth-child(1)')
            img = soup.select('.data-header__profile-image')
            
            age = None
            birth = None
            country = None
            avg_term = None
            formation = None
            license = None
            
            for item in soup.select('.data-header__items'):
                for li in item.find_all('li'):
                    label = li.get_text(strip=True)
                    content = li.find('span', class_='data-header__content')
                    
                    if content:
                        content_text = content.get_text(strip=True)
                        if label.startswith("Date of birth/Age:"):
                            age = content_text
                        elif label.startswith("Place of birth:"):
                            birth = content_text
                        elif label.startswith("Citizenship:"):
                            country = content_text
                        elif label.startswith("Avg. term as coach:"):
                            avg_term = content_text
                        elif label.startswith("Preferred formation"):
                            formation = content_text
                        elif label.startswith("Coaching Licence"):
                            license = content_text
            
            full_name = full_name[0].get_text().strip()
            actual_team = actual_team[0].get_text().strip()
            img = img[0].get_attribute_list('src')[0]
            
            dict = {
                'age': age,
                'name': full_name,
                'birth': birth,
                'country': country,
                'formation': formation,
                'coaching_license': license,
                'avg_term': avg_term,
                'actual_team': actual_team,
                'img': img,
            }
            
            list[manager_id] = dict
            
            stats_url = (base_url + url).replace('/profil', '/leistungsdatenLigenNational')
            response = requests.get(stats_url + 'plus/1', headers=headers)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser')

            table = soup.select('.items')
            all_data = []

            for row in table[1].find_all('tr'):
                if "Campeonato Brasileiro Série A" in row.get_text():
                    for next_row in row.find_next_siblings('tr'):
                        if(next_row.find('td').get_attribute_list('colspan')[0]):
                            if int(next_row.find('td').get_attribute_list('colspan')[0]) > 8:
                                break

                        dados = [td.get_text().strip() for td in next_row.find_all('td')]
                        all_data.append(dados)
                
            list[manager_id]["competition_data"] = {}
            dict = {}
            i = 0
            for dados in all_data:
                dict[i] = {
                    'season': dados[0],
                    'team_id': dados[1].get_attribute_list('href')[0].split('/')[-3],
                    'matches': dados[3],
                    'wins': dados[4],
                    'draws': dados[5],
                    'losts': dados[6],
                    'points': dados[7],
                    'ppm': dados[8],
                    'placement': dados[9],
                }
                i += 1
            
            list[manager_id]["competition_data"] = dict
            
            return manager_id
            
        except Exception as e:
            print(f"Error (manager): {e}")
