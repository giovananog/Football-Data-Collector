from bs4 import BeautifulSoup
import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def top_goalscorers(ano, range_value):
    try:
        base_url = "https://www.transfermarkt.com/campeonato-brasileiro-serie-a/torschuetzenliste/wettbewerb/BRA1/plus/1?saison_id=1995&detailpos=&altersklasse=alle"
        
        try:
            with open("../data/top_goalscorers.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}
        
        for _ in range(range_value):
            
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
                
                try:
                    id = elemento.select('a')[0].get_attribute_list('href')[0].split('/')[-5]
                    team_data['ID'] = id
                except:
                    pass
                
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

        with open("../data/top_goalscorers.json", "w") as file:
            json.dump(data_dict, file, indent=4)
                    
    except Exception as e:
        print(f"Error (top_goalscorers_dict): {e}")
 