# Generated by Django 3.2.21 on 2024-08-06 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_quatity_cartitem_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='description',
            field=models.TextField(default='this category is good', max_length=3000),
        ),
        migrations.AddField(
            model_name='category',
            name='images',
            field=models.ImageField(default='default_image.jpg', upload_to='product/'),
        ),
    ]
