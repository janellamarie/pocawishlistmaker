from rest_framework import serializers
from .models import Wishlists, Items, Tags

class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Items
    fields = '__all__'

class CreateItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Items
    fields = ('link', 'website')

class WishlistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Wishlists
    fields = '__all__'

class CreateWishlistSerializer(serializers.ModelSerializer):
  # description is an optional field
  description = serializers.CharField(allow_blank=True, allow_null=True)

  class Meta:
    model = Wishlists
    fields = ['name', 'description']