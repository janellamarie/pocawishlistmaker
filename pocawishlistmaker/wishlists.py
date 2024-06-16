from django.http import HttpResponse
from pocawishlistmaker.models import Wishlists

def index(request):
  return HttpResponse(Wishlists.objects.all())