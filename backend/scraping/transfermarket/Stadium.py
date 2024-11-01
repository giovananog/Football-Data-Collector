import time
from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def stadium_data(url, list):
    base_url = 'https://www.transfermarkt.com'
    response = requests.get(base_url + url, headers=headers)
    data = response.text
    soup = BeautifulSoup(data, 'html.parser')
    
    stadium_id = url.split('/')[-3] 
    print(stadium_id)  
    
    if (stadium_id not in list):
        try:
            img = soup.select('.datenfakten-wappen img')
            team_img = soup.select('.data-header__profile-container img')
            
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
                "address": [],
                "Image": None,
                "Team Image": None,
            }
            
            try:
                stadium_info["Image"] = img[0].get_attribute_list('src')[0]
            except:
                pass
            
            try:
                stadium_info["Team Image"] = team_img[0].get_attribute_list('src')[0]
            except:
                pass
            

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
            
        except Exception as e:
            print(f"Error (stadium): {e}")
   
        return stadium_id