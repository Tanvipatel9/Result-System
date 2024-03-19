from rest_framework import serializers
from stu_results.models import StuResult



class StuResultSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    course_name = serializers.CharField()
    student_name = serializers.CharField()
    score = serializers.CharField(max_length=50)

    def create(self, data):
        return StuResult.objects.create(**data)
    

