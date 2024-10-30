import time
from bs4 import BeautifulSoup
from urls import matches_page, tables_page
import requests
from pprint import pprint
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def players_of_the_year():
    try:
        base_url = "https://www.transfermarkt.com/campeonato-brasileiro-serie-a/fussballerdesjahres/wettbewerb/BRA1/galerie/1/page/1"
        
        try:
            with open("players_of_the_year.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}
        
        page = 1
        
        for _ in range(23):
            
            url = base_url.replace(('page/1'), (f"page/{page}"))
            page += 1
            if str(page) in data_dict:
                continue
            
            print(url)
            response = requests.get(url, headers=headers)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser')
            
            year = soup.select('.galerie-beschriftung-inhalt')[0].get_text()
            
            data_dict[year] = {}
            
            try: 
                img = soup.select('.galerie-bild')[0].get_attribute_list('src')[0]
                name = soup.select('.hauptlink a')[0].get_text()
                image = soup.select('.bilderrahmen-fixed')[0].get_attribute_list('src')[0]
                position = soup.select('.inline-table td')[2].get_text()
                team_image = soup.select('.zentriert a img')[0].get_attribute_list('src')[0]
                nat = soup.select('#yw1 > table > tbody > tr > td:nth-child(4) > img')[0].get_attribute_list('src')[0]
            except: 
                continue
            
            data_dict[year] = {
                'Image 1': img,
                'Name': name,
                'Image 2': image,
                'Position': position,
                'Team Image': team_image,
                'Nat': nat,
            }
                      
        with open("players_of_the_year.json", "w") as file:
            json.dump(data_dict, file, indent=4)
                    
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

def get_minute_from_background_position(background_position):
    width_cell = 36  
    height_cell = 36.3
    
    position = background_position.replace('background-position:', '').strip().split(' ')
    x = float(position[0].replace('px', '').strip())
    y = float(position[1].replace('px', '').replace(';', '').strip())

    col = int(-x // width_cell)  
    row = int(-y // height_cell)  

    if row == 11 and col == 0:
        minute = 120  
    elif row == 13:
        minute = -1  
    elif 0 <= row < 12 and 0 <= col < 10:  
        minute = (row * 10) + col + 11 
    else:
        minute = -1  

    return minute

def teams_data(url):
    try:
        
        try:
            with open("teams_data.json", "r") as file:
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
            header_contents = soup.select('.data-header__details .data-header__content')
            header_contents_a = soup.select('.data-header__details .data-header__content a')
            
            try:
                if ("General" not in data_dict[team_id]):
                    data_dict[team_id]["General"] = {
                        "Squad Size": header_contents[0].get_text().strip(),
                        "Average age:": header_contents[1].get_text().strip(),
                        "Foreigners": header_contents_a[0].get_text(),
                        "National team players": header_contents_a[1].get_text(),
                        "Stadium": header_contents_a[2].get_text(),
                    }
            except:
                pass
                
            try:
                manager = soup.select('#\\30')[0]            
                manager_name = manager.get_attribute_list('title')[0]
                manager_id = manager.get_attribute_list('href')[0].split('/')[-1]
                
                if (season not in data_dict[team_id]):
                    data_dict[team_id][season] = {
                        "Manager Name": manager_name,
                        "Manager ID": manager_id,
                    }
            except:
                pass
            
            try:
                response = requests.get(info_page, headers=headers)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                
                data_dict[team_id]["General"]["Info"] = {}
                other_info_title = soup.select('.profilheader th')
                other_info_content = soup.select('.profilheader td')
                
                for i in range(len(other_info_content)):
                    data_dict[team_id]["General"]["Info"][other_info_title[i].get_text().strip()] = other_info_content[i].get_text().strip()
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
                        player['ID'] = columns[1].find_all('a')[0].get_attribute_list('href')[0][-1]
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
            
            if(season not in data_dict[team_id]):
                data_dict[team_id][season] = {}
                
            data_dict[team_id][season]["Players List"] = players_data
        
        with open("teams_data.json", "w") as file:
            json.dump(data_dict, file, indent=4)
            
    except Exception as e:
        print(f"Ocorreu um erro (teams): {e}")
 
def top_goalscorers():
    try:
        base_url = "https://www.transfermarkt.com/campeonato-brasileiro-serie-a/torschuetzenliste/wettbewerb/BRA1/plus/1?saison_id=1995&detailpos=&altersklasse=alle"
        
        try:
            with open("top_goalscorers_dict.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}
        
        ano = 1995
        
        for _ in range(28):
            
            url = base_url.replace(str(1995), str(ano))
            ano += 1
            if str(ano) in data_dict:
                continue
                                    
            response = requests.get(url, headers=headers)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser')
            
            elementos = soup.select('.responsive-table td')
            img = soup.select('.inline-table img')
            
            teams = []
            team_data = {}
            clean_elements = []
            i = 0
            
            for e in elementos:
                if (e.get_text().strip() != "" and e.get_text().strip() != "-"):
                    clean_elements.append(e)

            for index, elemento in enumerate(clean_elements):
                text = elemento.get_text().strip()
        
                if index % 12 == 0:
                    if team_data:  
                        teams.append(team_data)
                    team_data = {'Table Position': text}  
                elif index % 12 == 2:
                    team_data['Name'] = text
                elif index % 12 == 3:
                    team_data['Position'] = text
                elif index % 12 == 4:
                    team_data['Age'] = text.split('(')[0]
                elif index % 12 == 5:
                    team_data['Appearances'] = text
                elif index % 12 == 6:
                    team_data['Assists'] = text
                elif index % 12 == 7:
                    team_data['Penalty Kicks'] = text
                elif index % 12 == 8:
                    team_data['Minutes Played'] = text
                elif index % 12 == 9:
                    team_data['Minutes per Goal'] = text
                elif index % 12 == 10:
                    team_data['Goals per Match'] = text
                elif index % 12 == 11:
                    team_data['Goals'] = text
                    team_data["Image"] = img[i].get_attribute_list('data-src')[0]
                    i += 1

                if(i == 5): break
            if team_data:
                teams.append(team_data)  

            data_dict[ano] = teams

        with open("top_goalscorers_dict.json", "w") as file:
            json.dump(data_dict, file, indent=4)
                    
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
  
def tables_data():
    try:
        try:
            with open("table_data.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}
        
        ano = 1995
        base_url = 'https://www.transfermarkt.com'
        
        for _ in range(28):
            ano += 1
            
            if str(ano) not in data_dict:
            
                html = f"{tables_page}{ano}"
                response = requests.get(html, headers=headers)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                
                elementos = soup.select('.items td')
                
                teams = []
                team_data = {}

                for index, elemento in enumerate(elementos):
                    text = elemento.get_text().strip()
                    url = str(elemento.find('a')).split('=')
            
                    if index % 10 == 0:
                        if team_data:  
                            teams.append(team_data)
                        team_data = {'Position': text}  
                    elif index % 10 == 1:
                        team_url = base_url + url[1].split(' ')[0].strip().split("\"")[1].strip()
                        team_data['Team'] = team_url
                        
                        teams_data(team_url)
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
        ano = 2022
        info_list = []
        
        for _ in range(1):
            ano = ano + 1
            print(ano)
            year_list = []
            response = requests.get(f"{matches_page}{ano}", headers=headers)
            data = response.text
            soup = BeautifulSoup(data, 'html.parser')
        
            first_team = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.text-right.no-border-rechts.hauptlink > a')     
            score = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.zentriert.hauptlink > a')            
            scnd_team = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td.no-border-links.hauptlink > a')            
            
            for i in range(len(first_team)):
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
    
    # try:
    #     with open("managers_dict.json", "r") as file:
    #         managers_dict = json.load(file)
    # except FileNotFoundError:
    #     managers_dict = {}
        
    # try:
    #     with open("stadiums_dict.json", "r") as file:
    #             stadiums_dict = json.load(file)
    # except FileNotFoundError:
    #     stadiums_dict = {}
        
    # try:
    #     with open("players_dict.json", "r") as file:
    #         players_dict = json.load(file)
    # except FileNotFoundError:
    #     players_dict = {}
    
    try:
        with open("referees_dict.json", "r") as file:
            referees_dict = json.load(file)
    except FileNotFoundError:
        referees_dict = {}
        
    # try:
    #     with open("match_dict.json", "r") as file:
    #         match_dict = json.load(file)
    # except FileNotFoundError:
    #     match_dict = {}
        
    
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
                
                
                # if(ano in match_dict):
                #     if(match_id in match_dict[ano]):
                #         continue
                #     else:
                #         match_dict[ano][match_id] = {}  
                # else:
                #     match_dict[ano] = {}
                #     match_dict[ano][match_id] = {}  
                
                # if(ano not in players_dict):
                #     players_dict[ano] = {}  
                    
                
                # match_dict[ano][match_id]["score"] = dict['score']
                # match_dict[ano][match_id]["url"] = dict['url']  
                
                response = requests.get(fst_page, headers=headers)
                print(fst_page)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                
                # try:
                #     matchday = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-datum.hide-for-small > a:nth-child(1)')
                #     match_dict[ano][match_id]["matchday"] = matchday[0].get_text().split('.')[0]
                # except:
                #     print(f"Ocorreu um erro (matchday): {e}")   
        
                # try:
                #     manager = soup.select('#\\30')
                #     fst_manager_url = manager[0].get_attribute_list("href")[0]
                #     scnd_manager_url = manager[1].get_attribute_list("href")[0]
                    
                #     fst_manager_id = manager_data(fst_manager_url, managers_dict)
                #     if str(fst_manager_id) in managers_dict:
                #         pass
                #     else:
                #         # match_dict[ano][match_id]["fst_manager_url"] = fst_manager_url
                #         # match_dict[ano][match_id]["fst_manager_id"] = fst_manager_id
                #         managers_dict[-1][fst_manager_id]["manager_url"] = base_url + fst_manager_url
                        
                #     scnd_manager_id = manager_data(scnd_manager_url, managers_dict)
                #     if str(scnd_manager_id) in managers_dict:
                #         pass
                #     else:
                #         # match_dict[ano][match_id]["scnd_manager_url"] = scnd_manager_url
                #         # match_dict[ano][match_id]["scnd_manager_id"] = scnd_manager_id
                #         managers_dict[-1][scnd_manager_id]["manager_url"] = base_url + scnd_manager_url                 
                # except Exception as e:
                #     print(f"Ocorreu um erro (manager): {e}")   

                # try:
                #     stadium = soup.select(f'#tm-main > div > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > a')
                    
                #     stadium_name = stadium[0].get_text()
                #     stadium_url = stadium[0].get_attribute_list("href")[0]
                    
                #     stadium_id = stadium_data(stadium_url, stadiums_dict)
                #     if str(stadium_id) in stadiums_dict:
                #         pass
                    
                #     # match_dict[ano][match_id]["stadium_id"] = stadium_id
                #     # match_dict[ano][match_id]["stadium_name"] = stadium_name                   
                # except Exception as e:
                #     print(f"Ocorreu um erro (stadium): {e}")   
                        
                # try:
                #     stadium_attendence = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > strong')
                #     match_dict[ano][match_id]["stadium_attendence"] = stadium_attendence[0].get_text().split(':')[-1].strip()                  
                # except Exception as e:
                #     print(f"Ocorreu um erro (stadium attendence): {e}")
                                      
                try:
                    referees = soup.select(f'#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > a')
                    referee_name = referees[0].get_text()
                    referee_url = referees[0].get_attribute_list("href")[0]
                    
                    referee_id = referee_data(referee_url, referees_dict)
                    
                    try:
                        referees_dict[referee_id]["Name"] = referee_name
                    except:
                        pass
                    
                    # try:
                    #     match_dict[ano][match_id]["referee_id"] = referee_id
                    # except:
                    #     pass    
                except Exception as e:
                    print(f"Ocorreu um erro (referees): {e}")
                       
                # try:
                #     goals_list = []

                #     goalscorer = soup.select('#sb-tore > ul > li > div > div.sb-aktion-aktion > a:nth-child(1)')
                #     goal_team = soup.select('#sb-tore > ul > li > div > div.sb-aktion-wappen > a > img')
                #     goal_info = soup.select('.sb-aktion-aktion')
                #     goal_minute = soup.select('#sb-tore > ul > li > div > div.sb-aktion-uhr > span')
                    

                #     for i in range(len(goalscorer)):
                #         goal_scorer_url = goalscorer[i].get_attribute_list("href")[0]
                #         goal_team_name = goal_team[i].get_attribute_list('title')[0]
                #         goal_minute_time = goal_minute[i].get_attribute_list('style')[0]
                #         goal_info_name = goal_info[i].get_text().split(',')

                #         goal_scorer = goal_info_name[0].strip()
                #         shot_type = goal_info_name[1].strip()
                        
                #         goal_info_dict = {
                #             "Team": goal_team_name,
                #             "Scorer": goal_scorer,
                #             "Scorer URL": base_url + goal_scorer_url,
                #             "Shot Type": shot_type,
                #             "Minute": get_minute_from_background_position(goal_minute_time)
                #         }

                #         try:
                #             assist_player = goal_info_name[2].split("Assist: ")[1].strip()
                #             goal_info_dict["Assist Player"] = assist_player
                #         except IndexError:
                #             goal_info_dict["Assist Player"] = None

                #         try:
                #             assist_type = goal_info_name[3].strip()
                #             goal_info_dict["Assist Type"] = assist_type
                #         except IndexError:
                #             goal_info_dict["Assist Type"] = None

                #         goals_list.append(goal_info_dict)

                #     match_dict[ano][match_id]["goals_list"] = goals_list
                # except Exception as e:
                #     print(f"Ocorreu um erro (goals): {e}")
              
                # try:
                #     substitutions = soup.select('#sb-wechsel > ul > li')
                    
                #     substitution_list = []

                #     for substitution in substitutions:
                #         substitution_name = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-ein > a').get_text()
                #         substitution_url = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-ein > a').get_attribute_list("href")[0]
                        
                #         substituted_name = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-aus > a').get_text()
                #         substituted_url = substitution.select_one('div > div.sb-aktion-aktion > span.sb-aktion-wechsel-aus > a').get_attribute_list("href")[0]
                        
                #         substitution_team_name = substitution.select_one('div > div.sb-aktion-wappen > a > img').get_attribute_list("title")[0]
                #         substitution_minute = substitution.select_one('.sb-sprite-uhr-klein').get_attribute_list("style")[0]

                #         substitution_list.append({
                #             "Team": substitution_team_name,
                #             "Minute": get_minute_from_background_position(substitution_minute),
                #             "Substitution": {
                #                 "Name": substitution_name,
                #                 "URL": substitution_url
                #             },
                #             "Substituted": {
                #                 "Name": substituted_name,
                #                 "URL": substituted_url
                #             }
                #         })
                        
                #     match_dict[ano][match_id]["substitutions_list"] = substitution_list                  
                # except Exception as e:
                #     print(f"Ocorreu um erro (substitutions): {e}")

                # try:
                #     card_elements = soup.select('#sb-karten > ul > li')
                #     cards_list = []

                #     for card in card_elements:
                #         card_info = card.select_one('div > div.sb-aktion-aktion').get_text().split(',')
                        
                #         try:
                #             card_minute = card.select_one('.sb-sprite-uhr-klein').get_attribute_list("style")[0]
                #         except:
                #             card_minute = None
                                                    
                #         try:
                #             player = card_info[0].split('\n')[0].strip()
                #         except:
                #             player = None
                        
                #         try:   
                #             card_type = card_info[0].split('\n')[1].strip().split('.')[1].strip()
                #         except:
                #             card_type = None
                            
                #         try:
                #             reason = card_info[1].strip() if len(card_info) > 1 else None
                #         except:
                #             reason = None

                #         team_url_element = card.select_one('div > div.sb-aktion-wappen > a')
                #         team_url = base_url + team_url_element.get_attribute_list('href')[0]
                #         team_name = team_url_element.get_attribute_list('title')[0]

                #         cards_list.append({
                #             "Team": team_name,
                #             "Team URL": team_url,
                #             "Player": player,
                #             "Card Type": card_type,
                #             "Reason": reason,
                #             "Minute": get_minute_from_background_position(card_minute)
                #         })

                
                #     match_dict[ano][match_id]["cards_list"] = cards_list
                # except Exception as e:
                #     print(f"Ocorreu um erro (cards): {e}")
                 
                # response = requests.get(scd_page, headers=headers)
                # print(scd_page)
                # data = response.text
                # soup = BeautifulSoup(data, 'html.parser')
                
                # try:
                #     players_dict_ids = []
                #     players = soup.select('.box .wichtig')
                #     for player in players:
                #         player_name = player.get_text()
                #         player_url = player.get_attribute_list('href')[0]
                        
                #         player_page = base_url + player_url
                        
                #         if "trainer" not in player_page:
                #             player_id = player_data(player_page, players_dict, ano)
                #             # if str(player_id) in players_dict[ano]:
                #             #     pass
                #             # else:
                #             players_dict[ano][player_id]["Name"] = player_name
                #             players_dict[ano][player_id]["Profile URL"] = player_page
                #             players_dict_ids.append(player_id)   
                            
                #     match_dict[ano][match_id]["players_id_list"] = players_dict_ids              
                # except Exception as e:
                #     print(f"Ocorreu um erro (players): {e}")
            
                # response = requests.get(trd_page, headers=headers)
                # print(trd_page)
                # data = response.text
                # soup = BeautifulSoup(data, 'html.parser')
                
                # try:
                #     data = soup.select('.sb-statistik-zahl')
                                    
                #     total_shots_team1 = data[0].get_text()
                #     total_shots_team2 = data[1].get_text()
                #     shots_team1 = data[2].get_text()
                #     shots_team2 = data[3].get_text()
                #     shots_saved_team1 = data[4].get_text()
                #     shots_saved_team2 = data[5].get_text()
                #     corners_team1 = data[6].get_text()
                #     corners_team2 = data[7].get_text()
                #     free_kicks_team1 = data[8].get_text()
                #     free_kicks_team2 = data[9].get_text()
                #     fouls_team1 = data[10].get_text()
                #     fouls_team2 = data[11].get_text()
                #     offsides_team1 = data[12].get_text()
                #     offsides_team2 = data[13].get_text()
                    
                #     dict = {   
                #             'total_shots_team1': total_shots_team1,
                #             'total_shots_team2': total_shots_team2,
                #             'shots_off_team1': shots_team1,
                #             'shots_off_team2': shots_team2,
                #             'shots_saved_team1': shots_saved_team1,
                #             'shots_saved_team2': shots_saved_team2,
                #             'corners_team1': corners_team1,
                #             'corners_team2': corners_team2,
                #             'free_kicks_team1': free_kicks_team1,
                #             'free_kicks_team2': free_kicks_team2,
                #             'fouls_team1': fouls_team1,
                #             'fouls_team2': fouls_team2,
                #             'offsides_team1': offsides_team1,
                #             'offsides_team2': offsides_team2,
                #     }
                    
                #     match_dict[ano][match_id]["match_stats"] = dict            
                # except Exception as e:
                #     print(f"Ocorreu um erro (stats): {e}")
                
                # with open("managers_dict.json", "w") as file:
                #     json.dump(managers_dict, file, indent=4)
                # with open("stadiums_dict.json", "w") as file:
                #     json.dump(stadiums_dict, file, indent=4)
                # with open("players_dict.json", "w") as file:
                #     json.dump(players_dict, file, indent=4)
                with open("referees_dict.json", "w") as file:
                    json.dump(referees_dict, file, indent=4)
                # with open("match_dict.json", "w") as file:
                #     json.dump(match_dict, file, indent=4)
    
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

def player_data(url, list, ano):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    player_id = url.split('/')[-5]
    
    if(player_id not in list[ano][player_id]):
    
        player_details = {}

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
            
            list[ano][player_id] = player_details

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
    
    if(referee_id not in list):
        try:
            data = soup.select('.data-header__label')
            data2 = soup.select('.data-header__label span')
            referee_info = {}
            img = soup.select('.data-header__profile-image')

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

            print(referee_info)
                        
            try:
                referee_info["Image"] = img[0].get_attribute_list('src')[0]
            except:
                pass
            
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

            return referee_id

        except Exception as e:
            print(f"Ocorreu um erro (referee): {e}")

def stadium_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    
    stadium_id = url.split('/')[-3]   
    print(base_url + url) 
    
    try:
        img = soup.select('.datenfakten-wappen img')
        team_img = soup.select('#tm-main > header > div.data-header__profile-container > img')
        
        try:
            stadium_info["Image"] = img[0].get_attribute_list('src')[0]
        except:
            pass
        
        try:
            stadium_info["Team Image"] = team_img[0].get_attribute_list('src')[0]
        except:
            pass
        
        stadium_info = {
            "name": None,
            "capacity": None,
            "boxes": None,
            "box_seats": None,
            "built": None,
            "formerly": None,
            "undersoil_heating": None,
            "running_track": None,
            "surface": None,
            "pitch_size": None,
            "telefone": None,
            "address": []
        }

        full_address = []
        for row in soup.select('.profilheader tr'):
            th = row.find('th')
            td = row.find('td')
            
            if th and td:
                label = th.get_text(strip=True)
                content_text = td.get_text(strip=True)

                if label == "Name of stadium:":
                    stadium_info["name"] = content_text
                elif label == "Total capacity:":
                    stadium_info["capacity"] = content_text
                elif label == "Boxes:":
                    stadium_info["boxes"] = content_text
                elif label == "Box seats:":
                    stadium_info["box_seats"] = content_text
                elif label == "Built:":
                    stadium_info["built"] = content_text
                elif label == "Formerly:":
                    stadium_info["formerly"] = content_text
                elif label == "Undersoil heating:":
                    stadium_info["undersoil_heating"] = content_text
                elif label == "Running track:":
                    stadium_info["running_track"] = content_text
                elif label == "Surface:":
                    stadium_info["surface"] = content_text
                elif label == "Pitch size:":
                    stadium_info["pitch_size"] = content_text
                elif label == "Tel:":
                    stadium_info["tel"] = content_text
                if label == "Address:" or label == "":
                    if(not content_text.startswith('(') and not content_text.startswith('including')):
                        full_address.append(content_text)
        
        complete_address = "\n".join(full_address)
        stadium_info["address"] = complete_address
        list[stadium_id] = stadium_info
        return stadium_id
        
    except Exception as e:
        print(f"Ocorreu um erro (stadium): {e}")
 
def manager_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    
    print(base_url + url)
    
    manager_id = url.split('/')[-1]
    
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
                'team': dados[2],
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
        print(f"Ocorreu um erro (manager): {e}")

matches_list = matches_data()
match_data(matches_list)
# tables_data()
# top_goalscorers()
# players_of_the_year()