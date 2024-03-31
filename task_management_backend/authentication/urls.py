from django.urls import path
from .views import register, LoginView, CustomLogout
urlpatterns = [
    path('register/', register, name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', CustomLogout.as_view(), name='logout'),
]

