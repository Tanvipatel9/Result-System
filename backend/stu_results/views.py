from django.shortcuts import render
from django.http import JsonResponse
from stu_results.models import StuResult
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from stu_results.serializer import StuResultSerializer
from rest_framework.views import APIView

# Create your views here.


class StuResultList(APIView):
    def get(self,request):
        stu_results = StuResult.objects.all()
        serializer = StuResultSerializer(stu_results, many=True)
        return  Response(serializer.data)
    

class StuResultCreate(APIView):
    def post(self, request):
        serializer = StuResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
