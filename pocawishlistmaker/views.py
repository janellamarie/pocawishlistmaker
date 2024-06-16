from django.shortcuts import render
from rest_framework import viewsets

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from django.shortcuts import get_object_or_404

from pocawishlistmaker.scraper import Scrape
from .serializers import *
from .models import Items, Wishlists

class ItemView(viewsets.ModelViewSet):
  queryset = Items.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
  filterset_fields = ['website']
  search_fields = ['name', 'website']
  ordering_fields = ['name', 'id']
  
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

class WishlistView(viewsets.ModelViewSet):
  queryset = Wishlists.objects.all()

  filter_backends = [filters.SearchFilter]
  search_fields = ['name']
  
  def get_serializer_class(self):
    if self.action == 'create' or self.action == 'post':
      return CreateWishlistSerializer
    elif self.action == 'list':
      return WishlistSerializer