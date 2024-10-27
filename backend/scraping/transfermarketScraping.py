import time
from bs4 import BeautifulSoup
from urls import matches_page, tables_page
import requests
from pprint import pprint
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}


def tables_data():
    
    try:
        
        try:
            with open("table_data.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}

        ano = 1995
        
        for _ in range(28):
            ano += 1
            
            if ano in data_dict:
                continue
            
            html = f"{tables_page}{ano}"
            response = requests.get(html, headers=headers)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser')
            
            elementos = soup.select('.items td')
            
            teams = []
            team_data = {}

            for index, elemento in enumerate(elementos):
                text = elemento.get_text().strip()
        
                if index % 10 == 0:
                    if team_data:  
                        teams.append(team_data)
                    team_data = {'Position': text}  
                elif index % 10 == 1:
                    team_data['Team'] = text
                elif index % 10 == 2:
                    team_data['Name'] = text
                elif index % 10 == 3:
                    team_data['Matches'] = text
                elif index % 10 == 4:
                    team_data['Wins'] = text
                elif index % 10 == 5:
                    team_data['Draws'] = text
                elif index % 10 == 6:
                    team_data['Losses'] = text
                elif index % 10 == 7:
                    team_data['Goals'] = text
                elif index % 10 == 8:
                    team_data['Goal Difference'] = text
                elif index % 10 == 9:
                    team_data['Points'] = text

            if team_data:
                teams.append(team_data)  

            data_dict[ano] = teams

        with open("table_data.json", "w") as file:
            json.dump(data_dict, file, indent=4)
                    
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

def matches_data():
    try:
        ano = 1995
        info_list = []
        
        for _ in range(2):
            ano = ano + 1
            print(ano)
            year_list = []
            response = requests.get(f"{matches_page}{ano}", headers=headers)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser')
        
            first_team = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.text-right.no-border-rechts.hauptlink > a')            
            score = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.zentriert.hauptlink > a')            
            scnd_team = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.no-border-links.hauptlink > a')            
            
            
            for i in range(len(first_team) - 1):
                dict = {
                'first_team': first_team[i].get_text(),
                'score': score[i].get_text(),
                'scnd_team': scnd_team[i].get_text(),
                'url': f'https://www.transfermarkt.com{(score[i].get_attribute_list("href"))[0]}',
                'ano': ano,
                'id': i,
                }
                year_list.append(dict)
            
            info_list.append(year_list)
        
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    finally:
        return info_list
       
def match_data(matches_list):
    
    base_url = 'https://www.transfermarkt.com'
    
    try:
        with open("managers_dict.json", "r") as file:
                managers_dict = json.load(file)
    except FileNotFoundError:
        managers_dict = {}
        
    try:
        with open("stadiums_dict.json", "r") as file:
                stadiums_dict = json.load(file)
    except FileNotFoundError:
        stadiums_dict = {}
        
    try:
        with open("players_dict.json", "r") as file:
                players_dict = json.load(file)
    except FileNotFoundError:
        players_dict = {}
    
    try:
        with open("referees_dict.json", "r") as file:
                referees_dict = json.load(file)
    except FileNotFoundError:
        referees_dict = {}
        
    try:
        with open("match_dict.json", "r") as file:
                match_dict = json.load(file)
    except FileNotFoundError:
        match_dict = {}
        
    
    scd_page_url = "/aufstellung"
    trd_page_url = "/statistik"
    
    try:
        
        for list in matches_list:
            for dict in list:
                
                fst_page = dict['url']
                match_id = fst_page.split("/")[-1]
                ano = str(dict['ano'])
                scd_page = fst_page.replace("/index", scd_page_url)
                trd_page = fst_page.replace("/index", trd_page_url)
                
                
                if(ano in match_dict):
                    if(match_id in match_dict[ano]):
                        continue
                    else:
                        match_dict[ano][match_id] = {}  
                else:
                    match_dict[ano] = {}
                    match_dict[ano][match_id] = {}  
                    
                
                match_dict[ano][match_id]["score"] = dict['score']
                match_dict[ano][match_id]["url"] = dict['url']  
                
                response = requests.get(fst_page, headers=headers)
                print(fst_page)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
        
                try:
                    manager = soup.select('#\\30')
                    fst_manager_url = manager[0].get_attribute_list("href")[0]
                    scnd_manager_url = manager[1].get_attribute_list("href")[0]
                    
                    fst_manager_id = manager_data(fst_manager_url, managers_dict)
                    if str(fst_manager_id) in managers_dict:
                        pass
                    else:
                        match_dict[ano][match_id]["fst_manager_url"] = fst_manager_url
                        match_dict[ano][match_id]["fst_manager_id"] = fst_manager_id
                        managers_dict[-1][fst_manager_id]["manager_url"] = base_url + fst_manager_url
                        
                    scnd_manager_id = manager_data(scnd_manager_url, managers_dict)
                    if str(scnd_manager_id) in managers_dict:
                        pass
                    else:
                        match_dict[ano][match_id]["scnd_manager_url"] = scnd_manager_url
                        match_dict[ano][match_id]["scnd_manager_id"] = scnd_manager_id
                        managers_dict[-1][scnd_manager_id]["manager_url"] = base_url + scnd_manager_url
                    
                except Exception as e:
                    print(f"Ocorreu um erro (manager): {e}")   

                try:
                    stadium = soup.select(f'#tm-main > div > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > a')
                    
                    stadium_name = stadium[0].get_text()
                    stadium_url = stadium[0].get_attribute_list("href")[0]
                    
                    stadium_id = stadium_data(stadium_url, stadiums_dict)
                    if str(stadium_id) in stadiums_dict:
                        pass
                    
                    match_dict[ano][match_id]["stadium_id"] = stadium_id
                    match_dict[ano][match_id]["stadium_name"] = stadium_name
                    
                except Exception as e:
                    print(f"Ocorreu um erro (stadium): {e}")   
                
                
                try:
                    stadium_attendence = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > strong')
                    match_dict[ano][match_id]["stadium_attendence"] = stadium_attendence[0].get_text().split(':')[-1].strip()
                    
                except Exception as e:
                    print(f"Ocorreu um erro (stadium attendence): {e}")
                    
                    
                try:
                    referees = soup.select(f'#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > a')
                    referee_name = referees[0].get_text()
                    referee_url = referees[0].get_attribute_list("href")[0]
                    # print(referees)
                    
                    referee_id = referee_data(referee_url, referees_dict)
                    print(referee_id)
                    
                    if str(referee_id) in referees_dict:
                        pass
                    else:
                        match_dict[ano][match_id]["referee_id"] = referee_id
                        match_dict[ano][match_id]["referee_name"] = referee_name
                    
                    
                except Exception as e:
                    print(f"Ocorreu um erro (referees): {e}")
                
                
                try:
                    goals_list = []

                    goalscorer = soup.select('#sb-tore > ul > li > div > div.sb-aktion-aktion > a:nth-child(1)')
                    goal_team = soup.select('#sb-tore > ul > li > div > div.sb-aktion-wappen > a > img')
                    goal_info = soup.select('.sb-aktion-aktion')

                    for i in range(len(goalscorer)):
                        goal_scorer_url = goalscorer[i].get_attribute_list("href")[0]
                        goal_team_name = goal_team[i].get_attribute_list('title')[0]
                        goal_info_name = goal_info[i].get_text().split(',')

                        goal_scorer = goal_info_name[0].strip()
                        shot_type = goal_info_name[1].strip()

                        goal_info_dict = {
                            "Team": goal_team_name,
                            "Scorer": goal_scorer,
                            "Scorer URL": base_url + goal_scorer_url,
                            "Shot Type": shot_type
                        }

                        try:
                            assist_player = goal_info_name[2].split("Assist: ")[1].strip()
                            goal_info_dict["Assist Player"] = assist_player
                        except IndexError:
                            goal_info_dict["Assist Player"] = None

                        try:
                            assist_type = goal_info_name[3].strip()
                            goal_info_dict["Assist Type"] = assist_type
                        except IndexError:
                            goal_info_dict["Assist Type"] = None

                        goals_list.append(goal_info_dict)

                    match_dict[ano][match_id]["goals_list"] = goals_list

                except Exception as e:
                    print(f"Ocorreu um erro (goals): {e}")

                
                try:
                    substitutions = soup.select('#sb-wechsel > ul > li')
                    
                    substitution_list = []

                    for substitution in substitutions:
                        substitution_name = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-ein > a').get_text()
                        substitution_url = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-ein > a').get_attribute_list("href")[0]
                        
                        substituted_name = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-aus > a').get_text()
                        substituted_url = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-aus > a').get_attribute_list("href")[0]
                        
                        substitution_team_name = substitution.select_one('div > div.sb-aktion-wappen > a > img').get_attribute_list("title")[0]

                        substitution_list.append({
                            "Team": substitution_team_name,
                            "Substitution": {
                                "Name": substitution_name,
                                "URL": substitution_url
                            },
                            "Substituted": {
                                "Name": substituted_name,
                                "URL": substituted_url
                            }
                        })
                        
                    match_dict[ano][match_id]["substitutions_list"] = substitution_list
                    
                except Exception as e:
                    print(f"Ocorreu um erro (substitutions): {e}")

                try:
                    card_elements = soup.select('#sb-karten > ul > li')
                    cards_list = []

                    for card in card_elements:
                        card_info = card.select_one('div > div.sb-aktion-aktion').get_text().split(',')
                        
                        try:
                            player = card_info[0].split('\n')[0].strip()
                        except:
                            player = None
                        
                        try:   
                            card_type = card_info[0].split('\n')[1].strip().split('.')[1].strip()
                        except:
                            card_type = None
                            
                        try:
                            reason = card_info[1].strip() if len(card_info) > 1 else None
                        except:
                            reason = None

                        team_url_element = card.select_one('div > div.sb-aktion-wappen > a')
                        team_url = base_url + team_url_element.get_attribute_list('href')[0]
                        team_name = team_url_element.get_attribute_list('title')[0]

                        cards_list.append({
                            "Team": team_name,
                            "Team URL": team_url,
                            "Player": player,
                            "Card Type": card_type,
                            "Reason": reason
                        })

                
                    match_dict[ano][match_id]["cards_list"] = cards_list

                except Exception as e:
                    print(f"Ocorreu um erro (cards): {e}")

                    
                response = requests.get(scd_page, headers=headers)
                print(scd_page)
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
                            player_id = player_data(player_page, players_dict)
                            if str(player_id) in players_dict:
                                pass
                            else:
                                players_dict[-1]["Name"] = player_name
                                players_dict[-1]["Profile URL"] = player_page
                                players_dict[-1]["player_id"] = player_id
                                players_dict_ids.append(player_id)   
                            
                    match_dict[ano][match_id]["players_id_list"] = players_dict_ids

                except Exception as e:
                    print(f"Ocorreu um erro (players): {e}")
            
                response = requests.get(trd_page, headers=headers)
                print(trd_page)
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
                    
                    dict = {   
                            'total_shots_team1': total_shots_team1,
                            'total_shots_team2': total_shots_team2,
                            'shots_off_team1': shots_team1,
                            'shots_off_team2': shots_team2,
                            'shots_saved_team1': shots_saved_team1,
                            'shots_saved_team2': shots_saved_team2,
                            'corners_team1': corners_team1,
                            'corners_team2': corners_team2,
                            'free_kicks_team1': free_kicks_team1,
                            'free_kicks_team2': free_kicks_team2,
                            'fouls_team1': fouls_team1,
                            'fouls_team2': fouls_team2,
                            'offsides_team1': offsides_team1,
                            'offsides_team2': offsides_team2,
                    }
                    
                    match_dict[ano][match_id]["match_stats"] = dict
                
                except Exception as e:
                    print(f"Ocorreu um erro (stats): {e}")
                
                with open("managers_dict.json", "w") as file:
                    json.dump(managers_dict, file, indent=4)
                with open("stadiums_dict.json", "w") as file:
                    json.dump(stadiums_dict, file, indent=4)
                with open("players_dict.json", "w") as file:
                    json.dump(players_dict, file, indent=4)
                with open("referees_dict.json", "w") as file:
                    json.dump(referees_dict, file, indent=4)
                with open("match_dict.json", "w") as file:
                    json.dump(match_dict, file, indent=4)
    
    except Exception as e:
        print(f"Ocorreu um erro: {e}")


def player_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    player_id = url.split('/')[-5]
    
    player_details = {}

    try:
        data = soup.select('.data-header__details .data-header__content')
        
        player_details["Age"] = data[0].get_text().strip()
        player_details["City"] = data[1].get_text().strip()
        player_details["Country"] = data[2].get_text().strip()
        player_details["Height"] = data[3].get_text().strip()
        player_details["Position"] = data[4].get_text().strip()

        scnd_page = soup.select_one('#tm-main > div.row > div.large-8.columns > div:nth-child(2) > div.tm-tabs > a:nth-child(2)')
        scnd_page_url = base_url + scnd_page.get_attribute_list('href')[0]
        print(scnd_page_url)
        
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
                    "Red Yellow Cards": all_stats[14].strip(),
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
        
        list[player_id] = player_details

    except Exception as e:
        print(f"Ocorreu um erro (player): {e}")

    return player_id
 
def referee_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    action_url = '/plus/0?funktion=1&saison_id=&wettbewerb_id=BRA1'

    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')

    referee_id = url.split('/')[-1]

    try:
        data = soup.select('.data-header__label')
        data2 = soup.select('.data-header__label span')
        referee_info = {}

        for i in range(len(data)):
            title_text = data[i].get_text().strip().split(':')[0].split(' ')[0]
            content_text = data2[i].get_text().strip()
            referee_info[title_text] = content_text
            
        response = requests.get(base_url + url + action_url, headers=headers)
        print(base_url + url + action_url)
        data = response.text
        soup = BeautifulSoup(data, 'html.parser')

        stats = soup.select('#tm-main > div.row > div.large-8.columns > div > div.responsive-table > table > tbody > tr > td')

        teams = []
        dict = {}
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

        referee_info["Matches"] = dict
        
        list[referee_id] = referee_info
        
        # pprint(list)
        return referee_id

    except Exception as e:
        print(f"Ocorreu um erro (referee): {e}")

def stadium_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    
    stadium_id = url.split('/')[-3]    
    
    try:
        stadium_info = {}
        titles = soup.select(f'.profilheader th')
        contents = soup.select(f'.profilheader td')
                    
        for title, content in zip(titles, contents):
            title_text = title.get_text().strip().split(':')[0].split(' ')[0]
            content_text = content.get_text().strip()
            
            stadium_info[title_text] = content_text
        
        list[stadium_id] = stadium_info
        
        return stadium_id
        
    except Exception as e:
        print(f"Ocorreu um erro (stadium): {e}")
 
def manager_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    
    manager_id = url.split('/')[-1]
    dict2 = {}
    
    try:
        title = soup.select('.data-header__items span')
        full_name = soup.select(".auflistung td")
        actual_team = soup.select('.data-header__club > a:nth-child(1)')
        
        full_name = full_name[0].get_text().strip()
        age = title[0].get_text().strip()
        birth = title[1].get_text().strip()
        country = title[2].get_text().strip()
        coaching_license = title[3].get_text().strip()
        avg_term = title[4].get_text().strip()
        actual_team = actual_team[0].get_text().strip()
        
        dict = {
            'age': age,
            'full_name': full_name,
            'birth': birth,
            'country': country,
            'coaching_license': coaching_license,
            'avg_term': avg_term,
            'actual_team': actual_team,
        }
        
        list[manager_id] = dict
        # list.append(dict2)
        
        return manager_id
        
    except Exception as e:
        print(f"Ocorreu um erro (manager): {e}")

matches_list = matches_data()
match_data(matches_list)
# tables_data()
