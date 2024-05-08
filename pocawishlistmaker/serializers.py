from rest_framework import serializers
from .models import Wishlists, Items, Tags

class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Items
    fields = ('id', 'name', 'price', 'created_at', 'updated_at', 'link')