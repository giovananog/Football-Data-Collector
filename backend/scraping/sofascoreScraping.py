from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
import time

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument("--ignore-certificate-errors")
chrome_options.add_argument("--allow-insecure-localhost")
driver = webdriver.Chrome(options=chrome_options)

def teste():
    try:
        url = "https://www.sofascore.com/football/match/flamengo-fluminense/lOsGuc#id:12117267"
        driver.get(url)
        
        time.sleep(10)
        button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/div[2]/div[2]/div[1]/div[2]/div[2]/div/div[1]/div[2]')))
        button.click()
        
        time.sleep(10)
        button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/div[2]/div[2]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/div/table/thead/tr/th[2]/div/div[2]/img')))
        button.click()
    
        time.sleep(10)
        player = driver.find_elements(By.CSS_SELECTOR, '.TableRow')
        
        time.sleep(10)
        button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '#__next > main > div.fresnel-container.fresnel-greaterThanOrEqual-mdMin.fresnel-\:r1\: > div.Box.cyOxcH.sc-91097bb0-0.dEWEtR > div.Box.Flex.ggRYVx.cQgcrM.sc-91097bb0-1.fnWzsl > div.Box.clAhaB.sc-91097bb0-2.kZvjNj > div:nth-child(2) > div > div.TabPanel.bpHovE > div.TabPanel.bpHovE > div > div > table > thead > tr > th.TableHeadCell.fzuHSm > div > div.Box.jbURkg > img')))
        button.click()
    
        time.sleep(10)
        player = driver.find_elements(By.CSS_SELECTOR, '.TableRow')

        # button = driver(By.CSS_SELECTOR, '.message-component .message-column button')))
        print(player[1].text)
        
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    finally:
        driver.quit()


teste()