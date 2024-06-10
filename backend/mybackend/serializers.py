from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Business,Transaction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["first_name","last_name","username","email","password"]


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model=Business
        fields=["name"]

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Transaction
        fields=['id','date','types','contact_name','amount','remarks','payment_category']
