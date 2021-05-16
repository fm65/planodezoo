from requests import get
from scrapy import Selector

url = "https://allergies.afpral.fr/allergie/en-savoir-plus-sur-les-allergies/alimentaires/89-liste-des-14-allergenes-alimentaires-majeurs"
response = get(url)
source = None
if response.status_code == 200:
    source = response.text

if source:
    selector = Selector(text=source)
    allergies = selector.css("div table tbody tr td")
    for allergy in allergies:
        name = allergy.css("strong::text").extract_first()
        if name != None:
            print(name)

