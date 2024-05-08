from django.http import HttpResponse
from pocawishlistmaker.models import Items

def index(request):
  return HttpResponse(Items.objects.all())