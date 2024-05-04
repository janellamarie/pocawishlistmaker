from django.db import models

class Items(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField()
  price = models.IntegerField()
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()

class Tags(models.Model):
  id = models.AutoField(primary_key=True) 
  tag = models.CharField()
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()

class Wishlists(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField()
  description = models.CharField()
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
