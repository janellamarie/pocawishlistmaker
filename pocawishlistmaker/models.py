from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import status
from rest_framework.response import Response

class Items(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField()
  price = models.FloatField(default=0.00)
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(default=timezone.now)
  link = models.CharField()
  website = models.CharField()
  image_link = models.CharField()

  def __str__(self):
    return '%s: %s (%s)'%(self.id, self.name, self.price)

class Tags(models.Model):
  id = models.AutoField(primary_key=True) 
  tag = models.CharField()
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(default=timezone.now)

  def __str__(self):
    return self.id, ": ", self.tag

class Wishlists(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField()
  description = models.CharField()
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(default=timezone.now)
  items = models.ManyToManyField(Items)

  def __str__(self):
    return '%s. %s %s'%(self.id, self.name, self.description)
