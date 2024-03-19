from django.contrib import admin
from django.urls import path
from students.views import StudentList, StudentCreate


urlpatterns = [
    path('', StudentCreate.as_view()),
    path('list/', StudentList.as_view()),
]
