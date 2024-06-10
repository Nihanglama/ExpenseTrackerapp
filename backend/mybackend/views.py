from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view,parser_classes,authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser,MultiPartParser,FormParser
from rest_framework import status
from .serializers import UserSerializer,BusinessSerializer,TransactionSerializer
from .serializers import UserSerializer,BusinessSerializer,TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Business,Transaction
from .models import Business,Transaction
from django.views.decorators.csrf import csrf_exempt



@api_view(["POST"])
@csrf_exempt
@parser_classes([MultiPartParser,FormParser,JSONParser])
def register(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user=User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token=Token.objects.create(user=user)
        return Response({"token":token.key,'user':serializer.data},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@parser_classes([MultiPartParser,FormParser,JSONParser])
@csrf_exempt
def login(request):
    if request.method=="POST":
        user=get_object_or_404(User,username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response({"error":"User not found"},status=status.HTTP_404_NOT_FOUND)
        token,create=Token.objects.get_or_create(user=user)
        serializer=UserSerializer(user)
        return Response({'token':token.key,"user":serializer.data},status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.method=="POST":
        request.auth.delete()
        return Response("User logged out",status=status.HTTP_200_OK)
    return Response("error logging out",status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser,FormParser,JSONParser])

def add_business(request):
    serializer=BusinessSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"created":"Created"},status=status.HTTP_201_CREATED)
    return Response(serializer.error_messages,status=status.HTTP_400_BAD_REQUEST)
 


@api_view(["POST"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([JSONParser,MultiPartParser,FormParser])

def transact(request):
    business=Business.objects.get(user=request.user,name=request.data['name'])
    serializer=TransactionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(name=business)
        serializer.save()
        return Response({"added":"Added"},status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser,FormParser])

def list_transaction(request,name):
    business=Business.objects.get(user=request.user,name=name)
    transactions=Transaction.objects.filter(name=business)
    print(transactions)
    serializer=TransactionSerializer(transactions,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

    
@api_view(["GET"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser,FormParser])

def list_business(request):
    business=Business.objects.filter(user=request.user)
    print(business)
    serializer=BusinessSerializer(business,many=True)
 
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["Delete"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_business(request,name):
    business=get_object_or_404(Business,user=request.user,name=name)
    business.delete()
    return Response({"success":"deleted"},status=status.HTTP_200_OK)

@api_view(["Delete"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_transaction(request,id):
    transaction=get_object_or_404(Transaction,id=id,name__user=request.user)
    transaction.delete()
    return Response({"success":"deleted"},status=status.HTTP_200_OK)


@api_view(["PUT"])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser,FormParser,JSONParser])


def edit_transaction(request,id):
    transaction=get_object_or_404(Transaction,id=id,name__user=request.user)
    serializer=TransactionSerializer(transaction,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success":"success"}, status=status.HTTP_200_OK)
    print(serializer.errors)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

