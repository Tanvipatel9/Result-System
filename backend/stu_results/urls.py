from django.contrib import admin
from django.urls import path
from stu_results.views import StuResultList, StuResultCreate


urlpatterns = [
    path('', StuResultCreate.as_view()),
    path('list/', StuResultList.as_view()),
]
