from django.urls import path

from . import views

urlpatterns = [
    path('projects/', views.projects_all),
    path('projects/<user>', views.projects_user),
    path('project/<pk>/', views.project_individual),

    path('profiles/', views.profiles_all),
    path('profile/<pk>/', views.profile_individual),

    path('documents/', views.documents_all),
    path('document/<pk>/', views.document_individual)
]