from django.shortcuts import render
from django.http import JsonResponse
from courses.models import Course
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from courses.serializer import CourseSerializer
from rest_framework.views import APIView
# Create your views here.



class CourseList(APIView):
    def get(self,request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return  Response(serializer.data)
    

class CourseCreate(APIView):
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
