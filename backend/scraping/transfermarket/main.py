import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urls import home_page

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument("--ignore-certificate-errors")
chrome_options.add_argument("--allow-insecure-localhost")

driver = webdriver.Chrome(options=chrome_options)
driver.get(home_page)

try:
    WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.ID, "sp_message_iframe_953358")))

    button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.message-component .message-column button')))
    button.click()
            
except Exception as e:
    print(f"Ocorreu um erro: {e}")
finally:
    time.sleep(5)
    driver.quit()

