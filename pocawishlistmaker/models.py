from django.db import models
from django.utils import timezone

class Items(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField()
  price = models.IntegerField()
  created_at = models.DateTimeField(default=timezone.now())
  updated_at = models.DateTimeField()

  def __str__(self):
    return self.id, ": ", self.name, "(", self.price, ")"

class Tags(models.Model):
  id = models.AutoField(primary_key=True) 
  tag = models.CharField()
  created_at = models.DateTimeField(default=timezone.now())
  updated_at = models.DateTimeField()

  def __str__(self):
    return self.id, ": ", self.tag

class Wishlists(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField()
  description = models.CharField()
  created_at = models.DateTimeField(default=timezone.now())
  updated_at = models.DateTimeField()

  def __str__(self):
    return self.id, ": ", self.name
