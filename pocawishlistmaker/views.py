from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ItemSerializer
from .models import Items

# Create your views here.

class ItemView(viewsets.ModelViewSet):
  serializer_class = ItemSerializer
  queryset = Items.objects.all()
