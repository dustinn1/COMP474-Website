from django.urls import path

from . import views

urlpatterns = [
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('session/', views.SessionView.as_view(), name='api-session'),
    path('currentuser/', views.CurrentUser.as_view(), name='api-currentuser'),
]