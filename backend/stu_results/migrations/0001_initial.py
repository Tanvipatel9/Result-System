# Generated by Django 5.0.3 on 2024-03-17 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StuResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_name', models.CharField(max_length=50)),
                ('student_name', models.CharField(max_length=50)),
                ('score', models.CharField(max_length=50)),
            ],
        ),
    ]
