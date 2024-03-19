from django.db import models

# Create your models here.

class Student(models.Model):
    first_name = models.CharField(max_length=50)
    family_name = models.CharField(max_length=50)
    dob = models.DateField()


    def __str__(self):
        return f'{self.first_name} {self.family_name}'
    


    