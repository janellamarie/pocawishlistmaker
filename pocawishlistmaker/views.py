from rest_framework import viewsets
from .serializers import TagSerializer
from .models import Items, Tags, Wishlists

class Tags(viewsets.ModelViewSet):
  serializer_class = TagSerializer
  queryset  = Tags.objects.all()