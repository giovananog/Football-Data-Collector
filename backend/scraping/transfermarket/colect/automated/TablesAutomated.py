import time
from bs4 import BeautifulSoup
import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def tables_data(ano):
    try:
        tables_page = "https://www.transfermarkt.com/campeonato-brasileiro-serie-a/tabelle/wettbewerb/BRA1/saison_id/"
        
        try:
            with open("./data/tables.json", "r") as file:
                data_dict = json.load(file)
        except FileNotFoundError:
            data_dict = {}

        ano = str(ano)
        
        base_url = 'https://www.transfermarkt.com'
        
        html = f"{tables_page}{ano}"
        response = requests.get(html, headers=headers)
        data = response.text
        soup = BeautifulSoup(data, 'html.parser')
                
        elementos = soup.select('.items td')
                
        teams = []
        team_data = {}  # Inicializar antes do loop

        for index, elemento in enumerate(elementos):
            text = elemento.get_text().strip()
            url = str(elemento.find('a')).split('=')

            if index % 10 == 0:
                if team_data:  # Se team_data não está vazio, adicione ao time
                    teams.append(team_data)
                team_data = {'Position': text}  
            elif index % 10 == 1:
                team_url = base_url + url[1].split(' ')[0].strip().split("\"")[1].strip()
                team_data['Team ID'] = team_url.split('/')[-3]
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

        # Adiciona o último time, se houver dados
        if team_data:
            teams.append(team_data)

        # Agora sobrescrevemos os dados para o ano específico
        data_dict[ano] = teams  # Isso irá substituir os dados existentes para o ano

        with open("./data/tables.json", "w") as file:
            json.dump(data_dict, file, indent=4)
                    
    except Exception as e:
        print(f"Error (table_data): {e}")
