from django.urls import path

from . import views

urlpatterns = [
    path('projects/', views.projects),
    path('profiles/', views.profiles),
    path('documents/', views.documents)
]