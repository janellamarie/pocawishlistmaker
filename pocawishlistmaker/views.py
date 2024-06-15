from django.shortcuts import render
from rest_framework import viewsets

from pocawishlistmaker.scraper import Scrape
from .serializers import *
from .models import Items

# Create your views here.

class ItemView(viewsets.ModelViewSet):
  queryset = Items.objects.all()
  
  def get_serializer_class(self):
    if self.action == 'create':
      return CreateItemSerializer
    else:
      return ItemSerializer

  def perform_create(self, serializer):
    link = self.request.data['link']
    website = self.request.data['website']
    print("Starting scraper...")
    result = Scrape(link, website)
    try:
      result = serializer.save(link=link, website=website, name=result['name'], price=float(result['price']), image_link=result['image_link'])
      print("perform_create result:", result)
    except Exception as e:
      print("Encountered exception...", e)
      raise Exception