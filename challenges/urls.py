from django.urls import path
from . import views

urlpatterns = [
  path("", views.index),
  path("<int:month>", views.month_by_num),
  path("<str:month>", views.month, name="month-challenge")
]