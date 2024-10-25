import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urls import matches_page, tables_page
import requests

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument("--ignore-certificate-errors")
chrome_options.add_argument("--allow-insecure-localhost")
# driver = webdriver.Chrome(options=chrome_options)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}


def start(url):
    try:
        driver.get(url)
        WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.ID, "sp_message_iframe_953358")))

        button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.message-component .message-column button')))
        button.click()
                
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    finally:
        time.sleep(5)
        # driver.quit()

def tables_data():
    try:
        ano = 1995
        start(f"{tables_page}{ano}")
        
        for _ in range(10):
            # time.sleep(5)
            ano = ano + 1
            print(ano)
            html = f"{tables_page}{ano}"
            driver.get(html)
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            elementos = soup.select('#yw1 > table > tbody > tr > td.hauptlink.no-border-links > a')
            elementos2 = soup.select('#yw1 > table > tbody > tr > td.no-border-links.hauptlink > a')

            print(elementos[20].get_text())
            print(elementos2[20].get_text())
            # for elmento in elementos:
            #     print(elmento.get_text())
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    finally:
        time.sleep(5)
        driver.quit()

def matches_data():
    try:
        ano = 2020
        # start(f"{matches_page}{ano}")
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
            day = soup.select(f'#tm-main > div > div.row > div > div > div > table > tbody > tr > td:nth-child(1) > a')            
            
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
                # break
            
            info_list.append(year_list)
        
        # print(info_list)
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    finally:
        time.sleep(5)
        return info_list
       
def match_data(matches_list):
    
    base_url = 'https://www.transfermarkt.com/'
    players_urls = []
    
    scd_page_url = "/aufstellung"
    # trd_page_url = "/vorbericht"
    
    try:
        
        for list in matches_list:
            for dict in list:
                
                fst_page = dict['url']
                # scd_page = fst_page.replace("/index", scd_page_url)
                # trd_page = fst_page.replace("/index", trd_page_url)
                
                response = requests.get(fst_page, headers=headers)
                print(fst_page)
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
        
                try:
                    manager = soup.select('#\\30')
                    
                    manager_name = manager[0].get_text()
                    manager_url = manager[0].get_attribute_list("href")[0]
                    
                    manager_data(manager_url)
                    
                    break
                except Exception as e:
                    print(f"Ocorreu um erro (manager): {e}")   

                # try:
                #     stadium = soup.select(f'#tm-main > div > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > a')
                    
                #     stadium_name = stadium[0].get_text()
                #     stadium_url = stadium[0].get_attribute_list("href")[0]
                    
                #     stadium_data(stadium_url)
                #     break
                # except Exception as e:
                #     print(f"Ocorreu um erro (stadium): {e}")   
                
                
                # try:
                #     stadium_attendence = soup.select('#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > span > strong')
                #     # print(stadium_attendence[0].get_text())
                # except Exception as e:
                #     print(f"Ocorreu um erro (stadium attendence): {e}")
                    
                    
                # try:
                #     referees = soup.select(f'#tm-main > div:nth-child(1) > div > div > div.box-content > div.sb-spieldaten > p.sb-zusatzinfos > a')
                #     referee_name = referees[0].get_text()
                #     referee_url = referees[0].get_attribute_list("href")[0]
                    
                #     refeere_data(referee_url)
                #     break
                # except Exception as e:
                #     print(f"Ocorreu um erro (referees): {e}")
                    

                # try:
                #     goalscorer = soup.select('#sb-tore > ul > li > div > div.sb-aktion-aktion > a:nth-child(1)')
                #     goal_name = goalscorer[0].get_text()
                #     goal_url = goalscorer[0].get_attribute_list("href")[0]
                    
                #     goal_team = soup.select('#sb-tore > ul > li > div > div.sb-aktion-wappen > a > img')
                #     goal_team_name = goal_team[0].get_attribute_list('title')[0]
                    
                #     goal_info = soup.select('#sb-tore ul li:nth-of-type(1) div div:nth-of-type(4)')
                #     goal_info_name = goal_info[0].get_text().split(',')
                    
                #     goal_scorer = goal_info_name[0].strip()
                #     shot_type = goal_info_name[1].strip()
                #     assist_info = goal_info_name[2].split("Assist: ")[1].strip()
                #     assist_type = goal_info_name[3].strip()
                    
                #     break
                # except Exception as e:
                #     print(f"Ocorreu um erro (goals): {e}")
                
                
                # try:
                #     substitution = soup.select('#sb-wechsel > ul > li > div > div.sb-aktion-aktion > span.sb-aktion-wechsel-ein > a')
                #     substitution_name = substitution[0].get_text()
                #     substitution_url = substitution[0].get_attribute_list("href")[0]
                    
                #     substituted = soup.select('#sb-wechsel > ul > li > div > div.sb-aktion-aktion > span.sb-aktion-wechsel-aus > a')
                #     substituted_name = substituted[0].get_text()
                #     substituted_url = substituted[0].get_attribute_list("href")[0]
                    
                #     substitution_team = soup.select('#sb-wechsel > ul > li > div > div.sb-aktion-wappen > a > img')
                #     substitution_team_name = substitution_team[0].get_attribute_list("title")[0]
                    
                #     print(substitution_name)
                #     print(substituted_name)
                #     print(substitution_team_name)
                    
                #     break
                # except Exception as e:
                #     print(f"Ocorreu um erro (substitutions): {e}")
                
                
                # try:
                    
                #     cards = soup.select('#sb-karten > ul > li:nth-child(1) > div > div.sb-aktion-aktion')
                #     cards = cards[0].get_text().split(',')
                    
                #     player = cards[0].split('\n')[0].strip()  
                #     card_typr = cards[0].split('\n')[1].strip().split('.')[1].strip()
                #     reason = cards[1].strip() if len(cards) > 1 else None 
                    
                #     break
                
                # except Exception as e:
                #     print(f"Ocorreu um erro (cards): {e}")
                    
              
                # response = requests.get(scd_page, headers=headers)
                # print(scd_page)
                # data = response.text
                # soup = BeautifulSoup(data, 'html.parser')
                    
   
                # try:
                #     player = soup.select('.wichtig')
                                    
                #     player_name = player[23].get_text()
                #     # print(player_name)
                                    
                #     player_url = player[23].get_attribute_list('href')[0]
                #     # print(player_url)
                    
                #     player_page = (base_url + player_url).replace('m//', '/')
                #     player_data(player_page)
                    
                #     break
                
                # except Exception as e:
                #     print(f"Ocorreu um erro (players): {e}")
            
    except Exception as e:
        print(f"Ocorreu um erro: {e}")


def manager_data(url):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    
    print(base_url + url)
    
    try:
        title = soup.select('.data-header__club-info span')
                    
        type = title[1].get_text().strip()
        league = title[2].get_text().strip()
        appointed = title[4].get_text().strip()
        until = title[6].get_text().strip()
        
        title = soup.select('.data-header__items span')
        
        age = title[1].get_text().strip()
        birth = title[2].get_text().strip()
        country = title[3].get_text().strip()
        coaching_license = title[4].get_text().strip()
        avg_term = title[4].get_text().strip()
        
    except Exception as e:
        print(f"Ocorreu um erro (manager): {e}")
 
# start()
matches_list = matches_data()
match_data(matches_list)

