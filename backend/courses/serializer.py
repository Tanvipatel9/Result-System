from rest_framework import serializers
from courses.models import Course



class CourseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    


    def create(self, data):
        return Course.objects.create(**data)
    

