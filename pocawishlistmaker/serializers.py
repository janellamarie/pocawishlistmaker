# helps convert model instances from database to JSON for the frontend

from rest_framework import serializers
from .models import Items, Tags, Wishlists

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tags
    fields = ('id', 'tag', 'created_at', 'updated_at')