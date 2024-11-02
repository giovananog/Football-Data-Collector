from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

response = requests.get('https://www.transfermarkt.com/sociedade-esportiva-palmeiras_portuguesa/index/spielbericht/2210936', headers=headers)
data = response.text
soup = BeautifulSoup(data, 'html.parser')
                
goals_list = []

goalscorer = soup.select('#sb-tore > ul > li > div > div.sb-aktion-aktion > a:nth-child(1)')
goal_team = soup.select('#sb-tore > ul > li > div > div.sb-aktion-wappen > a')
goal_info = soup.select('.sb-aktion-aktion')
goal_info_a = soup.select('.sb-aktion-aktion a')
goal_minute = soup.select('.sb-sprite-uhr-klein')


for i in range(len(goalscorer)):
    goal_scorer_id = goal_info_a[i].get_attribute_list("href")[0].split('/')[-5]
    goal_team_id = goal_team[i].get_attribute_list('href')[0].split('/')[-3]
    goal_minute_time = goal_minute[i].get_attribute_list('style')[0]
    goal_info_name = goal_info[i].get_text().strip().split(',')

    shot_type = goal_info_name[1].strip()
                        
    goal_info_dict = {
        "Team ID": goal_team_id,
        "Scorer Player ID": goal_scorer_id,
        "Shot Type": shot_type,
        "Minute": goal_minute_time
    }

    try:
        assist_player = goal_info[i].select('a')[1].get_attribute_list('href')[0].split('/')[-3]
        goal_info_dict["Assist Player ID"] = assist_player
    except IndexError:
        goal_info_dict["Assist Player ID"] = None

    try:
       assist_type = goal_info_name[3].strip()
       goal_info_dict["Assist Type"] = assist_type
    except IndexError:
        goal_info_dict["Assist Type"] = None

    goals_list.append(goal_info_dict)
    
    
print(goals_list)