from bs4 import BeautifulSoup
import requests
import json
from Manager import manager_data
from Stadium import stadium_data
from Referee import referee_data
from Player import player_data
from GetMinute import get_minute_from_background_position

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def matches_data(ano):
    try:
        matches_page = "https://www.transfermarkt.com/campeonato-brasileiro-serie-a/gesamtspielplan/wettbewerb/BRA1/saison_id/"
        info_list = []
        year_list = []
        
        response = requests.get(f"{matches_page}{ano}", headers=headers)
        data = response.text
        soup = BeautifulSoup(data, 'html.parser')
        
        first_team = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.text-right.no-border-rechts.hauptlink > a')     
        scnd_team = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.no-border-links.hauptlink > a')            
        match = soup.select(f'.ergebnis-link')  

        for i in range(len(match)):
            dict = {
            'first_team': first_team[i].get_text(),
            'score': match[i].get_text(),
            'scnd_team': scnd_team[i].get_text(),
            'url': match[i].get_attribute_list("href")[0],
            'id': match[i].get_attribute_list("href")[0].split('/')[-1],
            'ano': ano,
            }
            year_list.append(dict)
         
        info_list.append(year_list)
                
    except Exception as e:
        print(f"Error (matches_data) aq: {e}")
    finally:
        return info_list
 
 
def match_data(matches_list):
    
    base_url = 'https://www.transfermarkt.com'
    
    try:
        with open("./data/managers.json", "r") as file:
            managers_dict = json.load(file)
    except FileNotFoundError:
        managers_dict = {}
        
    try:
        with open("./data/stadiums.json", "r") as file:
                stadiums_dict = json.load(file)
    except FileNotFoundError:
        stadiums_dict = {}
        
    try:
        with open("./data/players.json", "r") as file:
            players_dict = json.load(file)
    except FileNotFoundError:
        players_dict = {}
    
    try:
        with open("./data/referees.json", "r") as file:
            referees_dict = json.load(file)
    except FileNotFoundError:
        referees_dict = {}
        
    try:
        with open("./data/matches.json", "r") as file:
            match_dict = json.load(file)
    except FileNotFoundError:
        match_dict = {}
        
    
    scd_page_url = "/aufstellung"
    trd_page_url = "/statistik"
    
    try:
        
        for list in matches_list:
            for dict in list:
                
                fst_page = base_url + dict['url']
                match_id = fst_page.split("/")[-1]
                
                ano = str(dict['ano'])
                fst_team = str(dict['first_team'])
                scnd_team = str(dict['scnd_team'])
                score = str(dict['score'])
                
                scd_page = fst_page.replace("/index", scd_page_url)
                trd_page = fst_page.replace("/index", trd_page_url)
                
                print(match_id)
                if(str(match_id) not in match_dict[ano]):
                    
                    print('match_id nao esta')
                    match_dict[ano][match_id] = {}
                    match_dict[ano][match_id]["score"] = score
                    match_dict[ano][match_id]["fst_team"] = fst_team  
                    match_dict[ano][match_id]["scnd_team"] = scnd_team  
                    
                    response = requests.get(fst_page, headers=headers)
                    data = response.text
                    soup = BeautifulSoup(data, 'html.parser')
                    
                    try:
                        first_team_id = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-team.sb-heim > a.sb-vereinslink')[0].get_attribute_list('href')[0].split('/')[-3]
                        second_team_id = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-team.sb-gast > a.sb-vereinslink')[0].get_attribute_list('href')[0].split('/')[-3]
                        
                        match_dict[ano][match_id]["first_team_id"] = first_team_id
                        match_dict[ano][match_id]["second_team_id"] = second_team_id
                    except:
                        pass
                    
                    try:
                        date = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-datum.hide-for-small > a:nth-child(2)')
                        
                        match_dict[ano][match_id]["date"] = date[0].get_text().split(',')[1]
                    except:
                        pass
                    
                    try:
                        matchday = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-datum.hide-for-small > a:nth-child(1)')
                        match_dict[ano][match_id]["matchday"] = matchday[0].get_text().split('.')[0]
                    except:
                        print(f"Error (matchday)")   
            
                    try:
                        manager = soup.select('#\\30')

                        fst_manager_url = manager[0].get_attribute_list("href")[0]
                        scnd_manager_url = manager[1].get_attribute_list("href")[0]
                        
                        print(f'------------{fst_manager_url} e {scnd_manager_url}------------')
                        
                        fst_manager_id = manager_data(fst_manager_url, managers_dict)
                        match_dict[ano][match_id]["fst_manager_id"] = fst_manager_id
                            
                        scnd_manager_id = manager_data(scnd_manager_url, managers_dict)
                        match_dict[ano][match_id]["scnd_manager_id"] = scnd_manager_id                       
                    except Exception as e:
                        print(f"Error (manager): {e}")   

                    try:
                        stadium = soup.select(f'#tm-main > div > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > a')
                        
                        stadium_url = stadium[0].get_attribute_list("href")[0]
                        team_id = stadium_url.split('/')[-3]
                        
                        stadium_id = stadium_data(stadium_url, stadiums_dict)
                        
                        match_dict[ano][match_id]["stadium_id"] = stadium_id
                    except Exception as e:
                        print(f"Error (stadium): {e}")   
                            
                    try:
                        stadium_attendence = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > strong')
                        match_dict[ano][match_id]["stadium_attendence"] = stadium_attendence[0].get_text().split(':')[-1].strip()                  
                    except Exception as e:
                        print(f"Error (stadium attendence): {e}")
                                        
                    try:
                        referees = soup.select(f'#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > a')
                        referee_name = referees[0].get_text()
                        referee_url = referees[0].get_attribute_list("href")[0]
                        
                        referee_id = referee_data(referee_url, referees_dict)
                        
                        try:
                            referees_dict[referee_id]["Name"] = referee_name
                        except:
                            pass
                        
                        try:
                            match_dict[ano][match_id]["referee_id"] = referee_id
                        except:
                            pass    
                    except Exception as e:
                        print(f"Error (referees): {e}")
                        
                    try:
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
                                "Minute": get_minute_from_background_position(goal_minute_time)
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

                        match_dict[ano][match_id]["goals_list"] = goals_list
                    except Exception as e:
                        print(f"Error (goals): {e}")
                    
                    try:
                        substitutions = []

                        for item in soup.select('#sb-wechsel > ul > li'):
                            substituicao = {}
                            
                            hour = get_minute_from_background_position(item.select_one('.sb-sprite-uhr-klein').get_attribute_list("style")[0])
                            substituicao['Minute'] = hour if hour else None

                            type = item.select_one('.sb-aktion-spielstand span')
                            substituicao['Type'] = type['title'] if type else 'Desconhecido'

                            substituted = item.select_one('.sb-aktion-wechsel-aus a')
                            substituicao['Substituted ID'] = substituted['href'].split('/')[-5] if substituted else None

                            substitution = item.select_one('.sb-aktion-wechsel-ein a')
                            substituicao['Substitution ID'] = substitution['href'].split('/')[-5]  if substitution else None

                            team_id = item.select_one('.sb-aktion-wappen a')
                            substituicao['Team ID'] = team_id['href'].split('/')[-3]  if team_id else None

                            substitutions.append(substituicao)
                        
                        match_dict[ano][match_id]["substitutions_list"] = substitutions                  
                    except:
                        pass
                    
                    try:
                        card_elements = soup.select('#sb-karten > ul > li')
                        cards_list = []

                        for card in card_elements:
                            card_info = card.select_one('div > div.sb-aktion-aktion').get_text().split(',')
                            
                            try:
                                card_minute = card.select_one('.sb-sprite-uhr-klein').get_attribute_list("style")[0]
                            except:
                                card_minute = None
                            
                            try:   
                                card_type = card_info[0].split('\n')[1].strip().split('.')[1].strip()
                            except:
                                card_type = None
                                
                            try:
                                reason = card_info[1].strip() if len(card_info) > 1 else None
                            except:
                                reason = None
                            
                            try:
                                team_url_element = card.select_one('div > div.sb-aktion-wappen > a')
                                team_id = team_url_element.get_attribute_list('href')[0].split('/')[-3]
                                player_id = soup.select('.sb-aktion-spielerbild a')[0].get_attribute_list('href')[0].split('/')[-1]

                            except:
                                pass
                            
                            cards_list.append({
                                "Team ID": team_id,
                                "Player ID": player_id,
                                "Card Type": card_type,
                                "Reason": reason,
                                "Minute": get_minute_from_background_position(card_minute)
                            })
                            
                        match_dict[ano][match_id]["cards_list"] = cards_list
                    except Exception as e:
                        print(f"Error (cards): {e}")
                    
                    response = requests.get(scd_page, headers=headers)
                    data = response.text
                    soup = BeautifulSoup(data, 'html.parser')

                    try:
                        players_dict_ids = []
                        players = soup.select('.box .wichtig')
                        for player in players:
                            player_name = player.get_text()
                            player_url = player.get_attribute_list('href')[0]
                            
                            player_page = base_url + player_url
                            
                            if "trainer" not in player_page:
                                player_id = player_data(player_page, players_dict, ano)
                                players_dict[ano][player_id]["Name"] = player_name
                                players_dict_ids.append(player_id)   
                                
                        match_dict[ano][match_id]["players_id_list"] = players_dict_ids              
                    except Exception as e:
                        print(f"Error (players): {e}")
                
                    response = requests.get(trd_page, headers=headers)
                    data = response.text
                    soup = BeautifulSoup(data, 'html.parser')
                    
                    try:
                        data = soup.select('.sb-statistik-zahl')
                                        
                        total_shots_team1 = data[0].get_text()
                        total_shots_team2 = data[1].get_text()
                        shots_team1 = data[2].get_text()
                        shots_team2 = data[3].get_text()
                        shots_saved_team1 = data[4].get_text()
                        shots_saved_team2 = data[5].get_text()
                        corners_team1 = data[6].get_text()
                        corners_team2 = data[7].get_text()
                        free_kicks_team1 = data[8].get_text()
                        free_kicks_team2 = data[9].get_text()
                        fouls_team1 = data[10].get_text()
                        fouls_team2 = data[11].get_text()
                        offsides_team1 = data[12].get_text()
                        offsides_team2 = data[13].get_text()
                        
                        match_stats_dict = {
                            first_team_id: {
                                'total_shots': total_shots_team1,
                                'shots_off': shots_team1,
                                'shots_saved': shots_saved_team1,
                                'corners': corners_team1,
                                'free_kicks': free_kicks_team1,
                                'fouls': fouls_team1,
                                'offsides': offsides_team1
                            },
                            second_team_id: {
                                'total_shots': total_shots_team2,
                                'shots_off': shots_team2,
                                'shots_saved': shots_saved_team2,
                                'corners': corners_team2,
                                'free_kicks': free_kicks_team2,
                                'fouls': fouls_team2,
                                'offsides': offsides_team2
                            }
                    }

                    
                        match_dict[ano][match_id]["match_stats"] = match_stats_dict            
                    except Exception as e:
                        print(f"Error (stats): {e}")
                    
                    with open("./data/managers.json", "w") as file:
                        json.dump(managers_dict, file, indent=4)
                    with open("./data/stadiums.json", "w") as file:
                        json.dump(stadiums_dict, file, indent=4)
                    with open("./data/players.json", "w") as file:
                        json.dump(players_dict, file, indent=4)
                    with open("./data/referees.json", "w") as file:
                        json.dump(referees_dict, file, indent=4)
                    with open("./data/matches.json", "w") as file:
                        json.dump(match_dict, file, indent=4)
                else:
                    print('match_id esta')

    except Exception as e:
        print(f"Error (match_data): {e}")
