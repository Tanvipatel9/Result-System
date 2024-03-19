from rest_framework import serializers
from students.models import Student



class StudentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField()
    family_name = serializers.CharField()
    dob = serializers.DateField()


    def create(self, data):
        return Student.objects.create(**data)
    

