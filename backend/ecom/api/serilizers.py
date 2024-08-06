from django.contrib.auth.models import  User
from rest_framework import serializers
from .models import Category,Cartitem,Cart,Product
import re
class Categoryserializers(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class Productserializer(serializers.ModelSerializer):

    class Meta:
        model=Product
        fields = ['id', 'name', 'description', 'price', 'image','category']
class CartItemsserilaizer(serializers.ModelSerializer):
    Product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    product_details = Productserializer(source='Product', read_only=True)

    class Meta:
        model=Cartitem
        fields=['Product','quantity','id','product_details']

class Cartserilsizer(serializers.ModelSerializer):

    class Meta:
        model=Cart
        fields=['user']

class Userserializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=['username','password','email']

    def validate_username(self,value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("username is alredy exists")
    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is alredy exist")
    def validate_password(self,value):
        if len(value)<8:
            raise serializers.ValidationError("password must be at least 8 charters")
        elif not re.search('[a-z]',value):
            raise serializers.ValidationError("atleast one lower charter should be in ")
        elif not re.search("[A-Z]",value):
            raise serializers.ValidationError("atleast one upper charter should be in ")
        elif not re.search('[0-9]',value):
            raise serializers.ValidationError("atleast one number should be in ")
        elif not re.search('[_@$]',value):
            raise serializers.ValidationError("atleast one @$_ charter should be in ")
       
    def create(self, validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
        )
        return user