from rest_framework import serializers
from .models import Wishlists, Items, Tags
from django.utils import timezone

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tags
    fields = '__all__'

class CreateTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tags
    fields = ['name']

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
  tags = TagSerializer(many=True, read_only=False)
  description = serializers.CharField(allow_blank=True, allow_null=True)

  class Meta:
    model = Wishlists
    fields = '__all__'
    
class UpdateWishlistSerializer(serializers.ModelSerializer):
  updated_at = serializers.DateTimeField(required=False)
  
  class Meta:
    model = Wishlists
    fields = ['items', 'updated_at']

  # TODO: find a better way to make a request from the front-end to the back-end for deleting items from
  # a wishlist
  def update(self, instance, validated_data):
    print("[UpdateWishlistSerializer.update] validated_data", validated_data)
    try:
      if validated_data.get('updated_at') is None:
        print("[UpdateWishlistSerializer.update] - add item")
        instance.items.add(validated_data.get('items')[0])
        instance.updated_at = timezone.now()
        instance.save()
        return instance
      else:
        print("[UpdateWishlistSerializer.update] - delete")
        instance.items.remove(validated_data.get('items')[0])
        instance.updated_at = timezone.now()
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

