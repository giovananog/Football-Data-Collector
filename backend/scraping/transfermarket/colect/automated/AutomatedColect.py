import schedule
import time
import datetime
import TablesAutomated
import MatchesAutomated
import requests


def job():
    ano_atual = datetime.datetime.now().year  
    season = ano_atual - 1
    TablesAutomated.tables_data(season)    
    matches = MatchesAutomated.matches_data(season) 
    MatchesAutomated.match_data(matches)
    
    try:
        response = requests.post('http://localhost:5000/populate-table')
        if response.status_code == 200:
            print("Dados enviados para o servidor com sucesso!")
        else:
            print(f"Erro ao enviar dados: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar-se ao servidor: {e}")
        
    try:
        response = requests.post('http://localhost:5000/populate-matches')
        if response.status_code == 200:
            print("Dados enviados para o servidor com sucesso!")
        else:
            print(f"Erro ao enviar dados: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar-se ao servidor: {e}")
        
    try:
        response = requests.post('http://localhost:5000/populate-matches-stats')
        if response.status_code == 200:
            print("Dados enviados para o servidor com sucesso!")
        else:
            print(f"Erro ao enviar dados: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar-se ao servidor: {e}")
        
    try:
        response = requests.post('http://localhost:5000/populate-matches-subs')
        if response.status_code == 200:
            print("Dados enviados para o servidor com sucesso!")
        else:
            print(f"Erro ao enviar dados: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar-se ao servidor: {e}")
        
    try:
        response = requests.post('http://localhost:5000/populate-matches-goals')
        if response.status_code == 200:
            print("Dados enviados para o servidor com sucesso!")
        else:
            print(f"Erro ao enviar dados: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar-se ao servidor: {e}")
        
    try:
        response = requests.post('http://localhost:5000/populate-matches-cards')
        if response.status_code == 200:
            print("Dados enviados para o servidor com sucesso!")
        else:
            print(f"Erro ao enviar dados: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar-se ao servidor: {e}")
        
    
    print("Dados scrapeados e salvos com sucesso!")

schedule.every().day.at("22:00").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
