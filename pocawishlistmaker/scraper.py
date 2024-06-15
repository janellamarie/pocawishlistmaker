import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from django.dispatch import receiver
from django.db.models.signals import post_save

def ScrapeMercariUS(url):
  options = Options()
  options.add_argument("--headless")

  browser = webdriver.Chrome(options=options)
  print("Navigating to", url)
  browser.get(url)
  page = browser.page_source

  print("Parsing information...")
  soup = BeautifulSoup(page, "lxml")
  name = soup.find('h1', attrs={'data-testid': 'ItemName'}).text
  price = soup.find('p', attrs={'data-testid': 'ItemPrice'}).text.rsplit('$')[1]
  if soup.find('div', attrs={'data-testid': 'ItemDetailsRibbon'}) != None:
    status = soup.find('div', attrs={'data-testid': 'ItemDetailsRibbon'}).text
    if status.find("SOLD") != -1:
      status = 'unavailable'
  else:
    status = 'available'
  img_link = soup.select('img[class*="Image__ThumbnailImage-"]')[0].get('src').split('?')[0]

  print("Quitting browser...")
  browser.quit()

  return {'name': name,'price': price, 'status': status, 'image_link': img_link}

def Scrape(url, website):
  if website == "mercari us":
    return ScrapeMercariUS(url)
  else:
    raise NotImplementedError 