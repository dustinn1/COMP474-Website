from django.urls import path

from . import views

urlpatterns = [
    path('users/', views.users_all),
    path('user/<pk>', views.user_individual),

    path('projects/', views.projects_all),
    path('projects/<user>', views.projects_user),
    path('project/<pk>/', views.project_individual),

    path('documents/', views.documents_all),
    path('document/<pk>/', views.document_individual)
]