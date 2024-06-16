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
  items = ItemSerializer(many=True, read_only=False)
  description = serializers.CharField(allow_blank=True, allow_null=True)

  class Meta:
    model = Wishlists
    fields = '__all__'
    
class UpdateWishlistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Wishlists
    fields = ['items']

  def update(self, instance, validated_data):
    print("[UpdateWishlistSerializer.update]", validated_data.get('items')[0])
    try:
      instance.items.add(validated_data.get('items')[0])
      instance.save()
      return instance
    except Exception as e:
      raise e

class CreateWishlistSerializer(serializers.ModelSerializer):
  # description is an optional field
  description = serializers.CharField(allow_blank=True, allow_null=True)

  class Meta:
    model = Wishlists
    fields = ['name', 'description']