from django.contrib import admin
from django.urls import path
from courses.views import CourseList, CourseCreate


urlpatterns = [
    path('', CourseCreate.as_view()),
    path('list/', CourseList.as_view()),
]
