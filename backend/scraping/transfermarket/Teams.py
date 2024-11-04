import time
from bs4 import BeautifulSoup
import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def teams_data(url):
    try:
        
        try:
            with open("../data/teams.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}
            
        season = url.split('/')[-1]
        
        overview_page = url.replace('spielplan', 'startseite')
        players_page = url.replace('spielplan', 'kader') + '/plus/1'
        info_page = url.replace('spielplan', 'datenfakten').replace(f'/saison_id/{season}', "")
        
        response = requests.get(overview_page, headers=headers)
        data = response.text
        soup = BeautifulSoup(data, 'html.parser')
        
        team_id = url.split('/')[-3]
        
        if(team_id not in data_dict):
            data_dict[team_id] = {}
        
        if(season not in data_dict[team_id]): 
            data_dict[team_id][season] = {}
            header_contents = soup.select('.data-header__details .data-header__content')
            header_contents_a = soup.select('.data-header__details .data-header__content a')            
            
            manager = soup.select('#\\30')[0]            
            manager_id = manager.get_attribute_list('href')[0].split('/')[-1]
            
            try:
                names = soup.select('.no-border-links .hauptlink a')[0].get_attribute_list('href')[0].split('/')[-3]
                
                for name in names:
                    if(name == team_id):
                        if("General" not in data_dict[team_id]):
                            data_dict[team_id]["General"] = {}
                            data_dict[team_id]["General"]["Name"] = name
            except:
                pass
            
            try:
                if ("General" not in data_dict[team_id]):
                    data_dict[team_id]["General"] = {
                        "Squad Size": header_contents[0].get_text().strip(),
                        "Average age:": header_contents[1].get_text().strip(),
                        "Foreigners": header_contents_a[0].get_text(),
                        "National team players": header_contents_a[1].get_text(),
                        "Stadium": header_contents_a[2].get_text(),
                        "Manager ID": manager_id
                    }
            except:
                pass
                
            try:
                data_dict[team_id]["General"]["Info"] = {
                    "Official club name:": None,
                    "Address:": None,
                    "Tel:": None,
                    "Website:": None,
                    "Founded:": None,
                    "Members:": None,
                }
                 
                response = requests.get(info_page, headers=headers)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                
                data_dict[team_id]["General"]["Info"] = {}
                other_info_title = soup.select('.profilheader th')
                other_info_content = soup.select('.profilheader td')
                
                for i in range(len(other_info_content)):
                    label = other_info_title[i].get_text().strip()
                    content_text = other_info_content[i].get_text().strip()
                    
                    if label == "Official club name:":
                        data_dict[team_id]["General"]["Info"]["Address"] = content_text
                    elif label == "Tel:":
                        data_dict[team_id]["General"]["Info"]["Tel"] = content_text
                    elif label == "Website:":
                        data_dict[team_id]["General"]["Info"]["Website"] = content_text
                    elif label == "Founded:":
                        data_dict[team_id]["General"]["Info"]["Founded"] = content_text
                    elif label == "Built:":
                        data_dict[team_id]["General"]["Info"]["built"] = content_text
                    elif label == "Members:":
                        data_dict[team_id]["General"]["Info"]["Members"] = content_text  
            except:
                pass
            
            players_data = [] 
            try:
                response = requests.get(players_page, headers=headers)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                
                rows = soup.select('.items tbody tr')       
                
                for row in rows:
                    player = {}
                    columns = row.find_all('td')
                    if(len(columns) == 13):
                        player['Number'] = columns[0].get_text().strip()
                        player['ID'] = columns[1].find_all('a')[0].get_attribute_list('href')[0].split('/')[-1]
                        player['Image'] = columns[1].find_all('img')[0].get_attribute_list('data-src')[0]
                        player['Name'] = columns[3].get_text().strip()
                        player['Position'] = columns[4].get_text().strip()
                        player['Birth'] = columns[5].get_text().strip()
                        player['Height'] = columns[8].get_text().strip()
                        player['Foot'] = columns[9].get_text().strip()
                        player['Joined'] = columns[10].get_text().strip()
                    
                        players_data.append(player)
            except:
                pass
                
            data_dict[team_id][season]["Players List"] = players_data
        
        with open("../data/teams.json", "w") as file:
            json.dump(data_dict, file, indent=4)
            
    except Exception as e:
        print(f"Error (teams): {e}")
 