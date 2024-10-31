import time
from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def player_data(url, list, ano):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    player_id = url.split('/')[-5]
    
    if(player_id not in list[ano]):
        player_id[ano][player_id] = {}
        player_details = {}

        try:
            try: 
                data = soup.select('.data-header__details .data-header__content')
                img = soup.select('.data-header__profile-image')
                
                
                player_details["Age"] = data[0].get_text().strip()
                player_details["City"] = data[1].get_text().strip()
                player_details["Country"] = data[2].get_text().strip()
                player_details["Height"] = data[3].get_text().strip()
                player_details["Position"] = data[4].get_text().strip()
                player_details["Image"] = img[0].get_attribute_list('src')[0]

                scnd_page = soup.select_one('#tm-main > div.row > div.large-8.columns > div:nth-child(2) > div.tm-tabs > a:nth-child(2)')
                scnd_page_url = base_url + scnd_page.get_attribute_list('href')[0]
            except:
                pass
            
            try:
                response = requests.get(scnd_page_url, headers=headers)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                
                stats_elements = soup.select('#tm-main > div.row > div > div:nth-child(2) > div.responsive-table > table > tbody > tr')
                
                player_stats = []
                
                for stats in stats_elements:
                    all_stats = stats.get_text().strip().split('\n')
                    
                    length = len(all_stats)
                    
                    if(length == 1):
                        break
                    elif (length > 9):
                        stat_record = {
                            "Matchday": all_stats[0].strip(),
                            "Date": all_stats[2].strip(),
                            "First Team": all_stats[4].split('(')[0].strip(),
                            "Second Team": all_stats[6].split('(')[0].strip(),
                            "Result": all_stats[7].strip(),
                            "Position on Matchday": all_stats[8].strip(),
                            "Goals": all_stats[9].strip(),
                            "Assists": all_stats[10].strip(),
                            "Own Goals": all_stats[11].strip(),
                            "Yellow Cards": all_stats[12].strip(),
                            "Second Yellow Cards": all_stats[13].strip(),
                            "Red Cards": all_stats[14].strip(),
                            "Substitutions on": all_stats[15].strip(),
                            "Substitutions off": all_stats[16].strip(),
                            "Minutes Played": all_stats[17].strip(),
                        }
                        player_stats.append(stat_record)
                    else:
                        stat_record = {
                            "Matchday": all_stats[0].strip(),
                            "Date": all_stats[2].strip(),
                            "First Team": all_stats[4].split('(')[0].strip(),
                            "Second Team": all_stats[6].split('(')[0].strip(),
                            "Result": all_stats[7].strip(),
                            "Position on Matchday": all_stats[8].strip(),
                            "Goals": '-',
                            "Assists": '-',
                            "Own Goals": '-',
                            "Yellow Cards": '-',
                            "Second Yellow Cards": '-',
                            "Red Yellow Cards": '-',
                            "Substitutions on": '-',
                            "Substitutions off": '-',
                            "Minutes Played": '-',
                        }
                        player_stats.append(stat_record)
                
                player_details["Match Statistics"] = player_stats
            except:
                pass
        
            list[ano][player_id] = player_details

        except Exception as e:
            print(f"Error (player): {e}")

    return player_id
 