from django.db import models

# Create your models here.

class StuResult(models.Model):
    course_name = models.CharField(max_length=50)
    student_name = models.CharField(max_length=50)
    score = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.course_name} {self.student_name} {self.score}'
    


    