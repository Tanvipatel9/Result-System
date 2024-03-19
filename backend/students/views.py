from django.shortcuts import render
from django.http import JsonResponse
from students.models import Student
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from students.serializer import StudentSerializer
from rest_framework.views import APIView
# Create your views here.


class StudentList(APIView):
    def get(self,request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return  Response(serializer.data)
    

class StudentCreate(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
