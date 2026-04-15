from django.urls import path

from .views import index

app_name = 'vectorlab_web'

urlpatterns = [
    path('', index, name='index'),
]
